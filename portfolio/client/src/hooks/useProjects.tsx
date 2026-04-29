import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { projects as seedProjects } from "../data/projects";
import type { Project } from "../lib/api";

const PROJECTS_STORAGE_KEY = "portfolio-projects-v1";
const PROJECTS_DB_NAME = "portfolio-projects-db-v1";
const PROJECTS_STORE_NAME = "projects";
const PROJECTS_RECORD_ID = "all-projects";

type ProjectDraft = Omit<Project, "id">;

interface ProjectsContextValue {
  projects: Project[];
  addProject: (project: ProjectDraft) => void;
  updateProject: (id: string, project: ProjectDraft) => void;
  deleteProject: (id: string) => void;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

function readStoredProjects() {
  const storedValue = window.localStorage.getItem(PROJECTS_STORAGE_KEY);
  if (!storedValue) {
    return seedProjects;
  }

  try {
    const parsed = JSON.parse(storedValue);
    if (Array.isArray(parsed)) {
      return parsed as Project[];
    }
  } catch {
    return seedProjects;
  }

  return seedProjects;
}

function openProjectsDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(PROJECTS_DB_NAME, 1);

    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(PROJECTS_STORE_NAME)) {
        database.createObjectStore(PROJECTS_STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function readProjectsFromIndexedDb() {
  if (!window.indexedDB) {
    return null;
  }

  try {
    const database = await openProjectsDb();
    const projects = await new Promise<Project[] | null>((resolve, reject) => {
      const transaction = database.transaction(PROJECTS_STORE_NAME, "readonly");
      const store = transaction.objectStore(PROJECTS_STORE_NAME);
      const request = store.get(PROJECTS_RECORD_ID);

      request.onsuccess = () => {
        const record = request.result as { id: string; projects: Project[] } | undefined;
        resolve(Array.isArray(record?.projects) ? record.projects : null);
      };
      request.onerror = () => reject(request.error);
    });
    database.close();
    return projects;
  } catch {
    return null;
  }
}

async function writeProjectsToIndexedDb(projects: Project[]) {
  if (!window.indexedDB) {
    return;
  }

  try {
    const database = await openProjectsDb();
    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(PROJECTS_STORE_NAME, "readwrite");
      const store = transaction.objectStore(PROJECTS_STORE_NAME);
      store.put({ id: PROJECTS_RECORD_ID, projects });
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
    database.close();
  } catch {
    // Keep UI working even if indexedDB is unavailable.
  }
}

function createProjectId() {
  if ("randomUUID" in window.crypto) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(() => readStoredProjects());
  const [isStorageReady, setIsStorageReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const hydrateFromStorage = async () => {
      const indexedDbProjects = await readProjectsFromIndexedDb();
      if (mounted && indexedDbProjects?.length) {
        setProjects(indexedDbProjects);
      }
      if (mounted) {
        setIsStorageReady(true);
      }
    };

    void hydrateFromStorage();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isStorageReady) {
      return;
    }

    try {
      window.localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
    } catch {
      // Large uploaded images can exceed localStorage quota on some devices.
    }

    void writeProjectsToIndexedDb(projects);
  }, [projects, isStorageReady]);

  const addProject = useCallback((project: ProjectDraft) => {
    setProjects((currentProjects) => [...currentProjects, { id: createProjectId(), ...project }]);
  }, []);

  const updateProject = useCallback((id: string, project: ProjectDraft) => {
    setProjects((currentProjects) =>
      currentProjects.map((currentProject) => (currentProject.id === id ? { ...currentProject, ...project } : currentProject))
    );
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects((currentProjects) => currentProjects.filter((project) => project.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      projects,
      addProject,
      updateProject,
      deleteProject,
    }),
    [projects, addProject, updateProject, deleteProject]
  );

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
}

export function useProjects() {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw new Error("useProjects must be used inside a ProjectsProvider");
  }

  return context;
}

export type { ProjectDraft };
