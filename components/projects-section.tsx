"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Github, Link, ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  githubUrl: string | null;
  demoUrl: string | null;
  status: string;
  sortOrder: number;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Our Projects</h2>
          <p className="text-gray-400 max-w-2xl"> showcasing our latest software solutions and implementations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="border-none h-full overflow-shadow-sm"
            >
              <CardHeader className="p-0">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-md"
                  />
                ) : (
                  <div
                    className="w-full h-48 bg-gradient-to-b from-blue-600 to-purple-600 rounded-t-md flex items-center justify-center text-white text-sm"
                  >
                    <span className="opacity-80">No image</span>
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm flex-1 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex gap-2 pt-4">
                  {project.githubUrl && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="px-3 py-1.5 text-sm hover:bg-gray-800 transition-colors"
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-1 h-4 w-4" />
                      Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {projects.length === 0 && (
          <p className="mt-8 text-center text-gray-500">
            No projects found. Add projects via the admin dashboard.
          </p>
        )}
      </div>
    </section>
  );
}