import { Request, Response } from "express";
import prisma from "../services/prisma.service";

export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const author = await prisma.author.findUnique({
      where: { id },
    });

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    res.json(author);
  } catch (error) {
    console.error("Error fetching author:", error);
    res.status(500).json({ error: "Failed to fetch author" });
  }
};

export const getAuthorByGithubId = async (req: Request, res: Response) => {
  try {
    const { githubId } = req.params;

    const author = await prisma.author.findUnique({
      where: { githubId: parseInt(githubId) },
    });

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    res.json(author);
  } catch (error) {
    console.error("Error fetching author:", error);
    res.status(500).json({ error: "Failed to fetch author" });
  }
};

export const createOrUpdateAuthor = async (req: Request, res: Response) => {
  try {
    const { githubId, name, username, email, image, bio } = req.body;

    if (!githubId || !name || !username) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const author = await prisma.author.upsert({
      where: { githubId },
      update: {
        name,
        username,
        email,
        image,
        bio,
      },
      create: {
        githubId,
        name,
        username,
        email,
        image,
        bio,
      },
    });

    res.json(author);
  } catch (error) {
    console.error("Error creating/updating author:", error);
    res.status(500).json({ error: "Failed to create/update author" });
  }
};

