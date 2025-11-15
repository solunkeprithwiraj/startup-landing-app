import { Request, Response } from "express";
import prisma from "../services/prisma.service";

export const getStartups = async (req: Request, res: Response) => {
  try {
    const { search, category } = req.query;

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: "insensitive" } },
        { category: { contains: search as string, mode: "insensitive" } },
        { description: { contains: search as string, mode: "insensitive" } },
        { author: { name: { contains: search as string, mode: "insensitive" } } },
      ];
    }

    if (category) {
      where.category = { equals: category as string, mode: "insensitive" };
    }

    const startups = await prisma.startup.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            bio: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(startups);
  } catch (error) {
    console.error("Error fetching startups:", error);
    res.status(500).json({ error: "Failed to fetch startups" });
  }
};

export const getStartupById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const startup = await prisma.startup.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
            bio: true,
          },
        },
      },
    });

    if (!startup) {
      return res.status(404).json({ error: "Startup not found" });
    }

    res.json(startup);
  } catch (error) {
    console.error("Error fetching startup:", error);
    res.status(500).json({ error: "Failed to fetch startup" });
  }
};

export const getStartupBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const startup = await prisma.startup.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
            bio: true,
          },
        },
      },
    });

    if (!startup) {
      return res.status(404).json({ error: "Startup not found" });
    }

    res.json(startup);
  } catch (error) {
    console.error("Error fetching startup:", error);
    res.status(500).json({ error: "Failed to fetch startup" });
  }
};

export const createStartup = async (req: Request, res: Response) => {
  try {
    const { title, description, category, image, pitch, authorId } = req.body;

    if (!title || !description || !category || !image || !authorId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Check if slug already exists
    const existingStartup = await prisma.startup.findUnique({
      where: { slug },
    });

    if (existingStartup) {
      return res.status(400).json({ error: "A startup with this title already exists" });
    }

    // Verify author exists
    const author = await prisma.author.findUnique({
      where: { id: authorId },
    });

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    const startup = await prisma.startup.create({
      data: {
        title,
        slug,
        description,
        category,
        image,
        pitch: pitch || null,
        authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            bio: true,
          },
        },
      },
    });

    res.status(201).json(startup);
  } catch (error) {
    console.error("Error creating startup:", error);
    res.status(500).json({ error: "Failed to create startup" });
  }
};

export const incrementViews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const startup = await prisma.startup.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
      select: {
        views: true,
      },
    });

    res.json(startup);
  } catch (error) {
    console.error("Error incrementing views:", error);
    res.status(500).json({ error: "Failed to increment views" });
  }
};

export const getStartupsByAuthor = async (req: Request, res: Response) => {
  try {
    const { authorId } = req.params;

    const startups = await prisma.startup.findMany({
      where: {
        authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            bio: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(startups);
  } catch (error) {
    console.error("Error fetching author startups:", error);
    res.status(500).json({ error: "Failed to fetch author startups" });
  }
};

