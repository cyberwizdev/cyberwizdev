"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trash2, Check, X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

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
  createdAt: string;
  updatedAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    image: "",
    githubUrl: "",
    demoUrl: "",
    status: "active",
  });
  const [showCreate, setShowCreate] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (error) {
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (editing) {
      await updateProject(editing.id);
    } else {
      await createProject();
    }
    setEditing(null);
    setShowCreate(false);
    fetchProjects();
  };

  const createProject = async () => {
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.project) {
        toast.success("Project created");
        fetchProjects();
        resetForm();
      } else {
        toast.error(data.error || "Failed to create project");
      }
    } catch (error) {
      toast.error("Failed to create project");
    }
  };

  const updateProject = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.project) {
        toast.success("Project updated");
        fetchProjects();
        resetForm();
      } else {
        toast.error(data.error || "Failed to update project");
      }
    } catch (error) {
      toast.error("Failed to update project");
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Project deleted");
        fetchProjects();
      } else {
        toast.error("Failed to delete project");
      }
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      longDescription: "",
      image: "",
      githubUrl: "",
      demoUrl: "",
      status: "active",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="pace-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Projects Management</h1>
        <Button
          variant="primary"
          onClick={() => setShowCreate(true)}
          className="px-6 py-3 text-lg"
        >
          Create Project
        </Button>
      </div>

      {showCreate && (
        <Dialog open={true} onOpenChange={() => setShowCreate(false)}>
          <DialogContent className="max-w-2xl p-6">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Input
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                multiline
                rows={3}
              />
              <Input
                placeholder="Long Description (optional)"
                value={formData.longDescription}
                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                multiline
                rows={3}
              />
              <Input
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
              <Input
                placeholder="GitHub URL (optional)"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              />
              <Input
                placeholder="Demo URL (optional)"
                value={formData.demoUrl}
                onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="mt-2 block w-full rounded-border border-gray-300 shadow-sm focus:border-primary focus:ring-primary w-full py-2.5 pc:bg-white pc:text-gray-900 pc:rounded-md pc:shadow-sm pc:focus:ring-primary pc:focus:ring-80 pc:outline-none"
              >
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setShowCreate(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" onClick={handleSave}>
                {editing ? "Update Project" : "Create Project"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    No projects yet
                  </TableCell>
                </TableRow>
              ) : (
                projects.map((project) => (
                  <TableRow
                    key={project.id}
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>{project.slug}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs ${
                          project.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {project.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mr-1"
                        onClick={() => {
                          setFormData({
                            title: project.title,
                            description: project.description,
                            longDescription: project.longDescription,
                            image: project.image,
                            githubUrl: project.githubUrl || "",
                            demoUrl: project.demoUrl || "",
                            status: project.status,
                          });
                          setEditing(project);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-1 text-red-600"
                        onClick={() => deleteProject(project.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}