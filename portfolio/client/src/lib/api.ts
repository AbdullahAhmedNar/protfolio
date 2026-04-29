import axios from "axios";
import { projects as localProjects } from "../data/projects";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string | null;
  sourceUrl: string;
  imageUrl: string;
  category: string;
  badge?: string;
}

export interface Achievement {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  badgeType: string;
  link: string | null;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ProjectPayload = Omit<Project, "id">;

export const fetchProjects = async (category?: string): Promise<Project[]> => {
  const params = category && category !== "All" ? { category } : {};

  try {
    const { data } = await api.get("/projects", { params });
    return data.data;
  } catch {
    if (!category || category === "All") {
      return [...localProjects];
    }

    return localProjects.filter((project) => project.category === category);
  }
};

export const fetchProjectById = async (id: string): Promise<Project> => {
  try {
    const { data } = await api.get(`/projects/${id}`);
    return data.data;
  } catch {
    const project = localProjects.find((item) => item.id === id);
    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  }
};

export const createProject = async (payload: ProjectPayload): Promise<Project> => {
  const { data } = await api.post("/projects", payload);
  return data.data;
};

export const updateProjectById = async (id: string, payload: ProjectPayload): Promise<Project> => {
  const { data } = await api.put(`/projects/${id}`, payload);
  return data.data;
};

export const deleteProjectById = async (id: string): Promise<void> => {
  await api.delete(`/projects/${id}`);
};

export const fetchAchievements = async (category?: string): Promise<Achievement[]> => {
  const params = category && category !== "All" ? { category } : {};
  const { data } = await api.get("/achievements", { params });
  return data.data;
};

export const sendContactMessage = async (payload: ContactPayload) => {
  const { data } = await api.post("/contact", payload);
  return data;
};
