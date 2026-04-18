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

export const fetchProjects = async (category?: string): Promise<Project[]> => {
  if (!category || category === "All") {
    return [...localProjects];
  }

  return localProjects.filter((project) => project.category === category);
};

export const fetchProjectById = async (id: string): Promise<Project> => {
  const project = localProjects.find((item) => item.id === id);
  if (!project) {
    throw new Error("Project not found");
  }

  return project;
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
