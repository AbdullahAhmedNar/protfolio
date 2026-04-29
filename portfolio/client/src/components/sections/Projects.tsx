import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight, Pencil, Plus, Trash2, X } from "lucide-react";
import type { Project } from "../../lib/api";
import { useTheme } from "../../hooks/useTheme";
import { useAdmin } from "../../hooks/useAdmin";
import { useProjects, type ProjectDraft } from "../../hooks/useProjects";

type ProjectFormState = {
  title: string;
  description: string;
  techStack: string;
  liveUrl: string;
  sourceUrl: string;
  imageUrl: string;
  category: string;
};

const EMPTY_FORM: ProjectFormState = {
  title: "",
  description: "",
  techStack: "",
  liveUrl: "",
  sourceUrl: "",
  imageUrl: "",
  category: "",
};
const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;

function normalizeExternalUrl(url: string) {
  const trimmedUrl = url.trim();
  if (!trimmedUrl) {
    return "";
  }

  if (
    /^(https?:\/\/|mailto:|tel:|\/\/)/i.test(trimmedUrl) ||
    /^[a-z][a-z0-9+.-]*:/i.test(trimmedUrl)
  ) {
    return trimmedUrl;
  }

  return `https://${trimmedUrl}`;
}

function isRepositoryUrl(url: string) {
  return /github\.com|gitlab\.com|bitbucket\.org|\.git(?:$|[?#/])/i.test(url);
}

function resolveProjectLinks(project: Project) {
  const normalizedLiveUrl = project.liveUrl?.trim() ? normalizeExternalUrl(project.liveUrl) : null;
  const normalizedSourceUrl = normalizeExternalUrl(project.sourceUrl);

  // If data was entered in reverse, auto-correct button targets.
  if (normalizedLiveUrl && isRepositoryUrl(normalizedLiveUrl) && !isRepositoryUrl(normalizedSourceUrl)) {
    return {
      liveUrl: normalizedSourceUrl,
      sourceUrl: normalizedLiveUrl,
    };
  }

  return {
    liveUrl: normalizedLiveUrl,
    sourceUrl: normalizedSourceUrl,
  };
}

function toFormState(project?: Project): ProjectFormState {
  if (!project) {
    return EMPTY_FORM;
  }

  return {
    title: project.title,
    description: project.description,
    techStack: project.techStack.join(", "),
    liveUrl: project.liveUrl ?? "",
    sourceUrl: project.sourceUrl,
    imageUrl: project.imageUrl,
    category: project.category,
  };
}

function toProjectDraft(formState: ProjectFormState): ProjectDraft {
  return {
    title: formState.title.trim(),
    description: formState.description.trim(),
    techStack: formState.techStack
      .split(",")
      .map((tech) => tech.trim())
      .filter(Boolean),
    liveUrl: formState.liveUrl.trim() ? normalizeExternalUrl(formState.liveUrl) : null,
    sourceUrl: normalizeExternalUrl(formState.sourceUrl),
    imageUrl: formState.imageUrl.trim(),
    category: formState.category.trim(),
  };
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to load image"));
    reader.readAsDataURL(file);
  });
}

function ProjectEditorModal({
  isOpen,
  isDark,
  initialProject,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  isDark: boolean;
  initialProject: Project | null;
  onClose: () => void;
  onSave: (draft: ProjectDraft) => void;
}) {
  const [formState, setFormState] = useState<ProjectFormState>(toFormState());
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    setFormState(toFormState(initialProject ?? undefined));
    setImageError(null);
  }, [initialProject, isOpen]);

  if (!isOpen) {
    return null;
  }

  const onFieldChange =
    (field: keyof ProjectFormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState((current) => ({ ...current, [field]: event.target.value }));
    };

  const onImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const pickedFile = event.target.files?.[0];
    if (!pickedFile) {
      return;
    }

    if (!pickedFile.type.startsWith("image/")) {
      setImageError("Please select a valid image file.");
      return;
    }

    if (pickedFile.size > MAX_IMAGE_SIZE_BYTES) {
      setImageError("Image is too large. Please choose an image up to 2 MB.");
      return;
    }

    try {
      const imageAsDataUrl = await readFileAsDataUrl(pickedFile);
      setFormState((current) => ({ ...current, imageUrl: imageAsDataUrl }));
      setImageError(null);
    } catch {
      setImageError("Could not read this image. Try another file.");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.imageUrl.trim()) {
      setImageError("Please upload an image from your device.");
      return;
    }

    onSave(toProjectDraft(formState));
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <div
        className={`flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl border p-4 shadow-2xl sm:p-6 ${
          isDark ? "border-white/10 bg-bg-surface text-text-main" : "border-gray-200 bg-white text-gray-900"
        }`}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="section-label mb-1">{initialProject ? "Edit Project" : "New Project"}</p>
            <h3 className="text-xl font-semibold">{initialProject ? "Update project details" : "Add a new project"}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`rounded-lg p-2 transition-colors ${
              isDark ? "text-text-muted hover:bg-white/10 hover:text-text-main" : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            }`}
            aria-label="Close project editor"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form className="flex min-h-0 flex-1 flex-col" onSubmit={handleSubmit}>
          <div className="space-y-4 overflow-y-auto pr-1">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="font-medium">Title</span>
                <input
                  value={formState.title}
                  onChange={onFieldChange("title")}
                  required
                  className={`w-full rounded-xl border px-3 py-2.5 outline-none transition-colors ${
                    isDark
                      ? "border-white/10 bg-bg-main text-text-main focus:border-mint/60"
                      : "border-gray-200 bg-white text-gray-900 focus:border-mint/60"
                  }`}
                />
              </label>

              <label className="space-y-1 text-sm">
                <span className="font-medium">Category</span>
                <input
                  value={formState.category}
                  onChange={onFieldChange("category")}
                  required
                  className={`w-full rounded-xl border px-3 py-2.5 outline-none transition-colors ${
                    isDark
                      ? "border-white/10 bg-bg-main text-text-main focus:border-mint/60"
                      : "border-gray-200 bg-white text-gray-900 focus:border-mint/60"
                  }`}
                />
              </label>
            </div>

            <label className="space-y-1 text-sm">
              <span className="font-medium">Description</span>
              <textarea
                value={formState.description}
                onChange={onFieldChange("description")}
                required
                rows={4}
                className={`w-full rounded-xl border px-3 py-2.5 outline-none transition-colors ${
                  isDark
                    ? "border-white/10 bg-bg-main text-text-main focus:border-mint/60"
                    : "border-gray-200 bg-white text-gray-900 focus:border-mint/60"
                }`}
              />
            </label>

            <label className="space-y-1 text-sm">
              <span className="font-medium">Technologies (comma separated)</span>
              <input
                value={formState.techStack}
                onChange={onFieldChange("techStack")}
                placeholder="React, TypeScript, Node.js"
                required
                className={`w-full rounded-xl border px-3 py-2.5 outline-none transition-colors ${
                  isDark
                    ? "border-white/10 bg-bg-main text-text-main focus:border-mint/60"
                    : "border-gray-200 bg-white text-gray-900 focus:border-mint/60"
                }`}
              />
            </label>

            <label className="space-y-2 text-sm">
              <span className="font-medium">Project Image (upload from your device)</span>
              <input
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className={`w-full rounded-xl border px-3 py-2.5 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-mint/15 file:px-3 file:py-1.5 file:font-medium file:text-mint ${
                  isDark
                    ? "border-white/10 bg-bg-main text-text-main focus:border-mint/60"
                    : "border-gray-200 bg-white text-gray-900 focus:border-mint/60"
                }`}
              />
              {formState.imageUrl && (
                <img src={formState.imageUrl} alt="Project preview" className="h-24 w-full rounded-xl object-cover sm:w-48" />
              )}
              {imageError && <p className="text-xs text-red-400">{imageError}</p>}
            </label>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="font-medium">Source URL (Repo)</span>
                <input
                  value={formState.sourceUrl}
                  onChange={onFieldChange("sourceUrl")}
                  required
                  className={`w-full rounded-xl border px-3 py-2.5 outline-none transition-colors ${
                    isDark
                      ? "border-white/10 bg-bg-main text-text-main focus:border-mint/60"
                      : "border-gray-200 bg-white text-gray-900 focus:border-mint/60"
                  }`}
                />
              </label>

              <label className="space-y-1 text-sm">
                <span className="font-medium">Live URL (optional)</span>
                <input
                  value={formState.liveUrl}
                  onChange={onFieldChange("liveUrl")}
                  className={`w-full rounded-xl border px-3 py-2.5 outline-none transition-colors ${
                    isDark
                      ? "border-white/10 bg-bg-main text-text-main focus:border-mint/60"
                      : "border-gray-200 bg-white text-gray-900 focus:border-mint/60"
                  }`}
                />
              </label>
            </div>
          </div>

          <div className={`mt-4 flex items-center justify-end gap-3 border-t pt-3 ${isDark ? "border-white/10" : "border-gray-200"}`}>
            <button type="button" onClick={onClose} className="btn-outline text-sm px-4 py-2">
              Cancel
            </button>
            <button type="submit" className="btn-primary text-sm px-4 py-2">
              {initialProject ? "Save Changes" : "Add Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  isDark,
  isAdmin,
  onEdit,
  onDelete,
}: {
  project: Project;
  isDark: boolean;
  isAdmin: boolean;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}) {
  const { liveUrl: resolvedLiveUrl, sourceUrl } = resolveProjectLinks(project);
  const previewUrl = resolvedLiveUrl ?? sourceUrl;
  const [showAllTech, setShowAllTech] = useState(false);
  const visibleTech = showAllTech ? project.techStack : project.techStack.slice(0, 4);

  return (
    <article
      className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        isDark
          ? "bg-bg-surface border-white/5 hover:border-mint/20 hover:shadow-mint/5"
          : "bg-white border-gray-200 hover:border-mint/30 hover:shadow-mint/10 shadow-sm"
      }`}
    >
      {/* Image */}
      <a
        href={previewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block h-48 overflow-hidden cursor-pointer"
        aria-label={`Preview ${project.title}`}
      >
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main/85 via-bg-main/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-gray-900 shadow-lg">
            View Project
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </div>
      </a>

      {/* Content */}
      <div className="p-5 space-y-4">
        <h3 className={`font-bold text-lg leading-tight ${isDark ? "text-text-main" : "text-gray-900"}`}>
          {project.title}
        </h3>
        <p className={`text-sm leading-relaxed line-clamp-3 ${isDark ? "text-text-muted" : "text-gray-600"}`}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {visibleTech.map((tech) => (
            <span key={tech} className="tag">{tech}</span>
          ))}
          {project.techStack.length > 4 && !showAllTech && (
            <button
              type="button"
              onClick={() => setShowAllTech(true)}
              className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                isDark
                  ? "border-white/10 text-text-muted hover:border-mint/30 hover:text-mint"
                  : "border-gray-200 text-gray-500 hover:border-mint/30 hover:text-mint"
              }`}
            >
              Show all tech
            </button>
          )}
          {project.techStack.length > 4 && showAllTech && (
            <button
              type="button"
              onClick={() => setShowAllTech(false)}
              className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                isDark
                  ? "border-white/10 text-text-muted hover:border-mint/30 hover:text-mint"
                  : "border-gray-200 text-gray-500 hover:border-mint/30 hover:text-mint"
              }`}
            >
              Show less
            </button>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <div className="flex items-center gap-3">
            {resolvedLiveUrl && (
              <a
                href={resolvedLiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs px-4 py-2"
                aria-label={`Live demo of ${project.title}`}
              >
                Live Demo
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-200 ${
                isDark ? "text-text-muted hover:text-mint" : "text-gray-500 hover:text-mint"
              }`}
              aria-label={`Source code of ${project.title}`}
            >
              <Github className="w-3.5 h-3.5" />
              Source Code
            </a>
          </div>

          {isAdmin && (
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => onEdit(project)}
                className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium ${
                  isDark
                    ? "border-white/10 text-text-muted hover:border-mint/30 hover:text-mint"
                    : "border-gray-200 text-gray-600 hover:border-mint/30 hover:text-mint"
                }`}
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(project)}
                className="inline-flex items-center gap-1 rounded-lg border border-red-300/40 px-2.5 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const { isAdmin } = useAdmin();
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [projectBeingEdited, setProjectBeingEdited] = useState<Project | null>(null);
  const [projectPendingDelete, setProjectPendingDelete] = useState<Project | null>(null);
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLElement | null>(null);

  const projectsPerPage = 6;
  const orderedProjects = [...projects].reverse();
  const totalPages = Math.ceil(orderedProjects.length / projectsPerPage);
  const paginatedProjects = orderedProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(totalPages, 1));
    }
  }, [currentPage, totalPages]);

  const openAddProjectModal = () => {
    setProjectBeingEdited(null);
    setIsEditorOpen(true);
  };

  const openEditProjectModal = (project: Project) => {
    setProjectBeingEdited(project);
    setIsEditorOpen(true);
  };

  const closeEditorModal = () => {
    setProjectBeingEdited(null);
    setIsEditorOpen(false);
  };

  const handleSaveProject = (draft: ProjectDraft) => {
    if (projectBeingEdited) {
      updateProject(projectBeingEdited.id, draft);
      closeEditorModal();
      return;
    }

    addProject(draft);
    closeEditorModal();
  };

  const handleDeleteProject = (project: Project) => {
    setProjectPendingDelete(project);
  };

  const cancelDeleteProject = () => {
    setProjectPendingDelete(null);
  };

  const confirmDeleteProject = () => {
    if (!projectPendingDelete) {
      return;
    }

    deleteProject(projectPendingDelete.id);
    setProjectPendingDelete(null);
  };

  const goToPage = (page: number) => {
    const nextPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(nextPage);
    window.requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`relative ${isDark ? "section-soft-gradient--dark" : "section-soft-gradient--light"}`}
    >
      <div className="section-wrapper">
        <div className="text-center mb-12">
          <p className="section-label">Projects</p>
          <h2 className={`section-title ${isDark ? "" : "text-text-light-main"}`}>
            Selected Work <span className="gradient-text">I'm Proud Of</span>
          </h2>
          <div className="glow-line mx-auto" />
          <p className={`section-subtitle mt-6 max-w-xl mx-auto ${isDark ? "" : "text-text-light-muted"}`}>
            A collection of projects showcasing what I have built across different technologies and use cases.
          </p>
        </div>

        {isAdmin && (
          <div className="mb-8 flex items-center justify-end">
            <button type="button" onClick={openAddProjectModal} className="btn-primary px-4 py-2.5 text-sm">
              <Plus className="h-4 w-4" />
              Add Project
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isDark={isDark}
              isAdmin={isAdmin}
              onEdit={openEditProjectModal}
              onDelete={handleDeleteProject}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <div
              className={`flex max-w-full items-center gap-2 overflow-x-auto rounded-2xl border px-3 py-3 ${
                isDark ? "border-white/10 bg-bg-surface/80" : "border-gray-200 bg-white/90 shadow-sm"
              }`}
            >
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`inline-flex h-10 min-w-10 items-center justify-center rounded-xl border transition-all duration-200 ${
                  currentPage === 1
                    ? isDark
                      ? "cursor-not-allowed border-white/5 text-text-muted/40"
                      : "cursor-not-allowed border-gray-200 text-gray-300"
                    : isDark
                    ? "border-white/10 text-text-muted hover:border-mint/30 hover:bg-white/5 hover:text-mint"
                    : "border-gray-200 text-gray-600 hover:border-mint/30 hover:bg-gray-100 hover:text-mint"
                }`}
                aria-label="Previous project page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => goToPage(page)}
                    className={`h-10 min-w-10 rounded-xl px-3 text-sm font-semibold transition-all duration-200 ${
                      currentPage === page
                        ? "bg-mint text-white shadow-lg shadow-mint/25"
                        : isDark
                        ? "text-text-muted hover:bg-white/5 hover:text-mint"
                        : "text-gray-600 hover:bg-gray-100 hover:text-mint"
                    }`}
                    aria-label={`Go to project page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`inline-flex h-10 min-w-10 items-center justify-center rounded-xl border transition-all duration-200 ${
                  currentPage === totalPages
                    ? isDark
                      ? "cursor-not-allowed border-white/5 text-text-muted/40"
                      : "cursor-not-allowed border-gray-200 text-gray-300"
                    : isDark
                    ? "border-white/10 text-text-muted hover:border-mint/30 hover:bg-white/5 hover:text-mint"
                    : "border-gray-200 text-gray-600 hover:border-mint/30 hover:bg-gray-100 hover:text-mint"
                }`}
                aria-label="Next project page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {projects.length === 0 && (
          <p className={`text-center py-16 ${isDark ? "text-text-muted" : "text-gray-500"}`}>
            No projects added yet.
          </p>
        )}
      </div>

      <ProjectEditorModal
        isOpen={isEditorOpen}
        isDark={isDark}
        initialProject={projectBeingEdited}
        onClose={closeEditorModal}
        onSave={handleSaveProject}
      />

      {projectPendingDelete && (
        <div className="fixed inset-0 z-[115] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
          <div
            className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl ${
              isDark ? "border-white/10 bg-bg-surface text-text-main" : "border-gray-200 bg-white text-gray-900"
            }`}
          >
            <p className="section-label mb-1 text-red-400">Delete Project</p>
            <h3 className="text-lg font-semibold">Confirm project deletion</h3>
            <p className={`mt-3 text-sm leading-relaxed ${isDark ? "text-text-muted" : "text-gray-600"}`}>
              Are you sure you want to delete <span className="font-semibold">{projectPendingDelete.title}</span>? This action
              cannot be undone.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button type="button" onClick={cancelDeleteProject} className="btn-outline text-sm px-4 py-2">
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteProject}
                className="inline-flex items-center gap-2 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/20"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
