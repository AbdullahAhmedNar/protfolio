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

function normalizeProject(raw: unknown): Project | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const candidate = raw as Record<string, unknown>;
  const id = String(candidate.id ?? "").trim();
  const title = String(candidate.title ?? "").trim();
  const description = String(candidate.description ?? "").trim();
  const sourceUrl = String(candidate.sourceUrl ?? "").trim();
  const imageUrl = String(candidate.imageUrl ?? "").trim();
  const category = String(candidate.category ?? "").trim();
  const liveUrlRaw = candidate.liveUrl;
  const liveUrl =
    liveUrlRaw == null || String(liveUrlRaw).trim() === "" ? null : String(liveUrlRaw).trim();
  const techStack = Array.isArray(candidate.techStack)
    ? candidate.techStack.map((tech) => String(tech).trim()).filter(Boolean)
    : [];

  if (!id || !title || !description || !sourceUrl || !imageUrl || !category || techStack.length === 0) {
    return null;
  }

  const badge = candidate.badge ? String(candidate.badge).trim() : undefined;

  return {
    id,
    title,
    description,
    techStack,
    liveUrl,
    sourceUrl,
    imageUrl,
    category,
    ...(badge ? { badge } : {}),
  };
}

function normalizeProjectsResponse(payload: unknown): Project[] {
  const asRecord = payload && typeof payload === "object" ? (payload as Record<string, unknown>) : null;
  const possibleArray =
    Array.isArray(payload)
      ? payload
      : Array.isArray(asRecord?.data)
      ? asRecord.data
      : Array.isArray(asRecord?.projects)
      ? asRecord.projects
      : [];

  return possibleArray
    .map((item) => normalizeProject(item))
    .filter((project): project is Project => Boolean(project));
}

export const fetchProjects = async (category?: string): Promise<Project[]> => {
  const params = category && category !== "All" ? { category } : {};

  try {
    const { data } = await api.get("/projects", { params });
    return normalizeProjectsResponse(data?.data ?? data);
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
    const normalized = normalizeProject(data?.data ?? data);
    if (!normalized) {
      throw new Error("Project payload is invalid");
    }
    return normalized;
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
  const normalized = normalizeProject(data?.data ?? data);
  if (!normalized) {
    throw new Error("Invalid project response from server");
  }
  return normalized;
};

export const updateProjectById = async (id: string, payload: ProjectPayload): Promise<Project> => {
  const { data } = await api.put(`/projects/${id}`, payload);
  const normalized = normalizeProject(data?.data ?? data);
  if (!normalized) {
    throw new Error("Invalid project response from server");
  }
  return normalized;
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
