import { Router } from "express";
import {
  getStartups,
  getStartupById,
  getStartupBySlug,
  createStartup,
  incrementViews,
  getStartupsByAuthor,
} from "../controllers/startup.controller";

const router = Router();

router.get("/", getStartups);
router.get("/author/:authorId", getStartupsByAuthor);
router.get("/:id", getStartupById);
router.get("/slug/:slug", getStartupBySlug);
router.post("/", createStartup);
router.patch("/:id/views", incrementViews);

export default router;

