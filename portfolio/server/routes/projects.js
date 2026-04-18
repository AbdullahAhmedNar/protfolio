import { Router } from "express";
import { projects } from "../data/projects.js";

const router = Router();

// GET /api/projects
router.get("/", (req, res) => {
  const { category, featured } = req.query;
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
router.get("/:id", (req, res) => {
  const project = projects.find((p) => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ success: false, message: "Project not found" });
  }
  res.json({ success: true, data: project });
});

export default router;
