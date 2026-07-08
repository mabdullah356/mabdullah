"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  Utensils,
  Users,
  GraduationCap,
  Car,
  Home,
  BookOpen,
  Link2,
  Music,
  Gamepad,
  ShoppingBag,
  Package,
  Smartphone,
  Monitor,
  MessageSquare,
  Shield,
  Wallet,
  Instagram,
  Book,
  Grid,
  FolderCode,
} from "lucide-react";
import projectsData from "@/public/projects.json";
import WindowWrapper from "./WindowWrapper";

interface ProjectData {
  id: string;
  title: string;
  category: string;
  type: string;
  icon: string;
  thumbnail: string;
  images: string[];
  description: string;
  role: string;
  tech: {
    frontend: string[];
    backend: string[];
    services: string[];
  };
  tags: string[];
  techStack: string[];
  links: {
    github: string;
    live: string;
  };
  ui_features?: string[];
  online_resources?: {
    documentation?: string;
    api_docs?: string;
  };
}

const PROJECTS = projectsData as ProjectData[];
const FILTERS = ["All", "MERN", "Next.js", "React"];

const ICON_MAP: Record<string, typeof Utensils> = {
  Utensils,
  Users,
  GraduationCap,
  Car,
  Home,
  BookOpen,
  Link: Link2,
  Music,
  Gamepad,
  ShoppingBag,
  Package,
  Smartphone,
  Shield,
  Wallet,
  Instagram,
  Book,
  Grid,
  Monitor,
  MessageSquare,
  Github,
  FolderCode,
};

const CATEGORY_ORDER: Record<string, number> = {
  MERN: 0,
  "Next.js": 1,
  React: 2,
  Other: 3,
};

function getProjectCategory(project: ProjectData) {
  const stackText = [project.techStack.join(" "), ...project.tech.frontend, ...project.tech.backend, ...project.tech.services].join(" ").toLowerCase();

  if (stackText.includes("next")) return "Next.js";
  if (stackText.includes("mern")) return "MERN";
  if (stackText.includes("react")) return "React";
  return "Other";
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);

  const filteredProjects = useMemo(() => {
    const filtered = PROJECTS.filter((project) => {
      if (filter === "All") return true;
      return getProjectCategory(project) === filter;
    });

    return filtered.sort((a, b) => {
      const aCategory = getProjectCategory(a);
      const bCategory = getProjectCategory(b);
      const diff = (CATEGORY_ORDER[aCategory] ?? 99) - (CATEGORY_ORDER[bCategory] ?? 99);

      if (diff !== 0) return diff;
      return a.title.localeCompare(b.title);
    });
  }, [filter]);

  return (
    <div className="relative w-full h-full p-6 overflow-y-auto bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto pb-20">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {FILTERS.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                filter === item
                  ? "bg-blue-600 text-white border-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                  : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-[240px]">
          {filteredProjects.map((project, index) => {
            const Icon = ICON_MAP[project.icon] ?? FolderCode;
            const cardSpan = index % 5 === 0 ? "md:col-span-2 md:row-span-2" : index % 3 === 1 ? "md:col-span-2" : "";

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#151520] cursor-pointer shadow-[0_16px_40px_rgba(0,0,0,0.28)] ${cardSpan}`}
                onClick={() => setActiveProject(project)}
              >
                <Image src={project.thumbnail} alt={project.title} fill unoptimized className="absolute inset-0 h-full w-full object-cover opacity-35 group-hover:opacity-50 transition-all duration-500" />
                <div className="absolute inset-0 bg-linear-to-br from-[#0b1020]/90 via-[#0f1322]/60 to-[#05070c]/90" />
                <div className="relative z-10 flex h-full flex-col justify-between p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-blue-400 backdrop-blur-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-300">
                      {getProjectCategory(project)}
                    </span>
                  </div>

                  <div>
                    <p className="mb-2 text-sm text-white/45">{project.category}</p>
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/60 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 2).map((tech) => (
                        <span key={tech} className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                      View
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <WindowWrapper
            id="projects"
            title={activeProject.title}
            icon={<FolderCode className="h-4 w-4" />}
            onClose={() => setActiveProject(null)}
            onMinimize={() => {}}
            onFocus={() => {}}
            onFullscreen={() => {}}
            zIndex={999}
            isFullscreen={false}
          >
            <div className="flex h-full flex-col bg-[#0a0a0f]">
              <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 lg:px-10">
                <div className="mx-auto flex max-w-5xl flex-col gap-8">
                  <div className="rounded-[2rem] border border-white/10 bg-white/3 p-6 sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                      <div className="max-w-2xl">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">{activeProject.category}</p>
                        <h2 className="text-3xl font-semibold text-white sm:text-4xl">{activeProject.title}</h2>
                        <p className="mt-4 text-base leading-relaxed text-white/65">{activeProject.description}</p>
                      </div>
                      <div className="rounded-2xl border border-blue-400/20 bg-blue-500/10 px-4 py-3 text-sm text-blue-300">
                        <p className="font-semibold">Role</p>
                        <p className="mt-1 text-white/80">{activeProject.role}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                    <div className="space-y-6">
                      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/3">
                        <Image src={activeProject.images[0] ?? activeProject.thumbnail} alt={activeProject.title} width={1200} height={720} unoptimized className="h-72 w-full object-cover" />
                      </div>

                      <div className="rounded-[2rem] border border-white/10 bg-white/3 p-6">
                        <div className="mb-5 flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-blue-500" />
                          <h3 className="text-xl font-semibold text-white">Project Overview</h3>
                        </div>
                        <p className="text-base leading-relaxed text-white/65">{activeProject.description}</p>
                        {activeProject.ui_features && activeProject.ui_features.length > 0 && (
                          <ul className="mt-6 space-y-3">
                            {activeProject.ui_features.map((feature) => (
                              <li key={feature} className="flex items-start gap-3 text-sm text-white/70">
                                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="rounded-[2rem] border border-white/10 bg-white/3 p-6">
                        <h3 className="mb-5 text-lg font-semibold uppercase tracking-[0.25em] text-white/70">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                          {[
                            ...activeProject.tech.frontend,
                            ...activeProject.tech.backend,
                            ...activeProject.tech.services,
                          ].map((tool) => (
                            <span key={tool} className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-[2rem] border border-white/10 bg-white/3 p-6">
                        <h3 className="mb-5 text-lg font-semibold uppercase tracking-[0.25em] text-white/70">Project Links</h3>
                        <div className="space-y-3">
                          <a href={activeProject.links.github} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10">
                            <span className="flex items-center gap-2"><Github className="h-4 w-4" /> GitHub</span>
                            <ExternalLink className="h-4 w-4 text-white/40" />
                          </a>
                          {activeProject.links.live ? (
                            <a href={activeProject.links.live} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl border border-white/10 bg-blue-600/20 px-4 py-3 text-sm text-blue-300 transition hover:bg-blue-600/30">
                              <span className="flex items-center gap-2"><ExternalLink className="h-4 w-4" /> Live Demo</span>
                              <ExternalLink className="h-4 w-4 text-blue-300" />
                            </a>
                          ) : null}
                        </div>
                      </div>

                      <div className="rounded-[2rem] border border-white/10 bg-white/3 p-6">
                        <h3 className="mb-5 text-lg font-semibold uppercase tracking-[0.25em] text-white/70">Quick Highlights</h3>
                        <div className="space-y-3 text-sm text-white/70">
                          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                            <span>Type</span>
                            <span className="text-white/85">{activeProject.type}</span>
                          </div>
                          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                            <span>Role</span>
                            <span className="text-white/85">{activeProject.role}</span>
                          </div>
                          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                            <span>Stack</span>
                            <span className="text-white/85">{activeProject.techStack.join(", ")}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </WindowWrapper>
        )}
      </AnimatePresence>
    </div>
  );
}
