import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { projects as seedProjects } from "../data/projects";
import type { Project } from "../lib/api";

const PROJECTS_STORAGE_KEY = "portfolio-projects-v1";

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

function createProjectId() {
  if ("randomUUID" in window.crypto) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(() => readStoredProjects());

  useEffect(() => {
    window.localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

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
