import { Router } from "express";
import {
  getAuthorById,
  getAuthorByGithubId,
  createOrUpdateAuthor,
} from "../controllers/author.controller";

const router = Router();

router.get("/github/:githubId", getAuthorByGithubId);
router.get("/:id", getAuthorById);
router.post("/", createOrUpdateAuthor);

export default router;

