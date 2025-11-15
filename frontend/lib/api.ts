const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface Startup {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  image: string;
  pitch?: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    username?: string;
    image?: string;
    bio?: string;
  };
}

export interface Author {
  id: string;
  githubId: number;
  name: string;
  username: string;
  email?: string;
  image?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Startup endpoints
  async getStartups(search?: string, category?: string): Promise<Startup[]> {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (category) params.append("category", category);
    
    const query = params.toString();
    return this.fetch<Startup[]>(`/startups${query ? `?${query}` : ""}`);
  }

  async getStartupById(id: string): Promise<Startup> {
    return this.fetch<Startup>(`/startups/${id}`);
  }

  async getStartupBySlug(slug: string): Promise<Startup> {
    return this.fetch<Startup>(`/startups/slug/${slug}`);
  }

  async createStartup(data: {
    title: string;
    description: string;
    category: string;
    image: string;
    pitch?: string;
    authorId: string;
  }): Promise<Startup> {
    return this.fetch<Startup>("/startups", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async incrementViews(id: string): Promise<{ views: number }> {
    return this.fetch<{ views: number }>(`/startups/${id}/views`, {
      method: "PATCH",
    });
  }

  async getStartupsByAuthor(authorId: string): Promise<Startup[]> {
    return this.fetch<Startup[]>(`/startups/author/${authorId}`);
  }

  // Author endpoints
  async getAuthorById(id: string): Promise<Author> {
    return this.fetch<Author>(`/authors/${id}`);
  }

  async getAuthorByGithubId(githubId: number): Promise<Author> {
    return this.fetch<Author>(`/authors/github/${githubId}`);
  }

  async createOrUpdateAuthor(data: {
    githubId: number;
    name: string;
    username: string;
    email?: string;
    image?: string;
    bio?: string;
  }): Promise<Author> {
    return this.fetch<Author>("/authors", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

