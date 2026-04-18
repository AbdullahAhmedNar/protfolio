import { Router } from "express";
import { achievements } from "../data/achievements.js";

const router = Router();

// GET /api/achievements
router.get("/", (req, res) => {
  const { category } = req.query;
  let result = [...achievements];

  if (category && category !== "All") {
    result = result.filter((a) => a.category === category);
  }

  res.json({ success: true, data: result });
});

export default router;
