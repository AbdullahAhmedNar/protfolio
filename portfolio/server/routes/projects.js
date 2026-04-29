import { Router } from "express";
import { randomUUID } from "crypto";
import { readProjectsStore, writeProjectsStore } from "../data/projectsStore.js";

const router = Router();

function normalizeProjectPayload(payload = {}) {
  const title = String(payload.title ?? "").trim();
  const description = String(payload.description ?? "").trim();
  const techStack = Array.isArray(payload.techStack)
    ? payload.techStack.map((tech) => String(tech).trim()).filter(Boolean)
    : [];
  const sourceUrl = String(payload.sourceUrl ?? "").trim();
  const imageUrl = String(payload.imageUrl ?? "").trim();
  const category = String(payload.category ?? "").trim();
  const badge = payload.badge ? String(payload.badge).trim() : undefined;
  const liveUrlValue = payload.liveUrl == null ? "" : String(payload.liveUrl).trim();
  const liveUrl = liveUrlValue ? liveUrlValue : null;

  if (!title || !description || !sourceUrl || !imageUrl || !category || techStack.length === 0) {
    return null;
  }

  return {
    title,
    description,
    techStack,
    sourceUrl,
    imageUrl,
    category,
    liveUrl,
    ...(badge ? { badge } : {}),
  };
}

// GET /api/projects
router.get("/", async (req, res) => {
  const { category, featured } = req.query;
  const projects = await readProjectsStore();
  let result = [...projects];

  if (category && category !== "All") {
    result = result.filter((p) => p.category === category);
  }
  if (featured === "true") {
    result = result.filter((p) => p.featured === true);
  }

  res.json({ success: true, data: result });
});

// GET /api/projects/:id
router.get("/:id", async (req, res) => {
  const projects = await readProjectsStore();
  const project = projects.find((p) => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ success: false, message: "Project not found" });
  }
  res.json({ success: true, data: project });
});

// POST /api/projects
router.post("/", async (req, res) => {
  const normalizedProject = normalizeProjectPayload(req.body);
  if (!normalizedProject) {
    return res.status(400).json({ success: false, message: "Invalid project payload" });
  }

  const projects = await readProjectsStore();
  const project = {
    id: randomUUID(),
    ...normalizedProject,
  };

  projects.push(project);
  await writeProjectsStore(projects);

  return res.status(201).json({ success: true, data: project });
});

// PUT /api/projects/:id
router.put("/:id", async (req, res) => {
  const normalizedProject = normalizeProjectPayload(req.body);
  if (!normalizedProject) {
    return res.status(400).json({ success: false, message: "Invalid project payload" });
  }

  const projects = await readProjectsStore();
  const projectIndex = projects.findIndex((project) => project.id === req.params.id);

  if (projectIndex === -1) {
    return res.status(404).json({ success: false, message: "Project not found" });
  }

  const updatedProject = {
    ...projects[projectIndex],
    ...normalizedProject,
  };

  projects[projectIndex] = updatedProject;
  await writeProjectsStore(projects);

  return res.json({ success: true, data: updatedProject });
});

// DELETE /api/projects/:id
router.delete("/:id", async (req, res) => {
  const projects = await readProjectsStore();
  const nextProjects = projects.filter((project) => project.id !== req.params.id);

  if (nextProjects.length === projects.length) {
    return res.status(404).json({ success: false, message: "Project not found" });
  }

  await writeProjectsStore(nextProjects);
  return res.json({ success: true });
});

export default router;
