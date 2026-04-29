import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Project, ProjectPayload } from "../lib/api";
import { createProject, deleteProjectById, fetchProjects, updateProjectById } from "../lib/api";

type ProjectDraft = Omit<Project, "id">;

interface ProjectsContextValue {
  projects: Project[];
  addProject: (project: ProjectDraft) => Promise<void>;
  updateProject: (id: string, project: ProjectDraft) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        if (isMounted) {
          setProjects(Array.isArray(data) ? data : []);
        }
      } catch {
        if (isMounted) {
          setProjects([]);
        }
      }
    };

    void loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const addProject = useCallback(async (project: ProjectDraft) => {
    const created = await createProject(project as ProjectPayload);
    setProjects((currentProjects) => [...currentProjects, created]);
  }, []);

  const updateProject = useCallback(async (id: string, project: ProjectDraft) => {
    const updated = await updateProjectById(id, project as ProjectPayload);
    setProjects((currentProjects) =>
      currentProjects.map((currentProject) => (currentProject.id === id ? updated : currentProject))
    );
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    await deleteProjectById(id);
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
