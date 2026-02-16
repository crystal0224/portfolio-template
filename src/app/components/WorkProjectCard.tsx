import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ExternalLink } from "lucide-react";
import type { WorkProject } from "../data/detailedCareerData";

interface WorkProjectCardProps {
  project: WorkProject;
  index: number;
}

const categoryColorMap: Record<string, string> = {
  "진단": "bg-blue-100 text-blue-700",
  "리더십": "bg-purple-100 text-purple-700",
  "채용/퇴직": "bg-green-100 text-green-700",
  "SERI CEO": "bg-orange-100 text-orange-700",
  "CEO/HR브리프": "bg-amber-100 text-amber-700",
  "분석방법론": "bg-cyan-100 text-cyan-700",
  "강의": "bg-pink-100 text-pink-700",
  "교육이수": "bg-yellow-100 text-yellow-700",
  "제도": "bg-indigo-100 text-indigo-700",
  "기타": "bg-gray-100 text-gray-700",
};

export function WorkProjectCard({ project, index }: WorkProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const colorClass =
    categoryColorMap[project.category] || "bg-gray-100 text-gray-700";

  const monthStr = project.month.toString().padStart(2, "0");

  return (
    <div
      className="cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Category Badge + Date */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2 py-0.5 rounded-md text-xs font-medium ${colorClass}`}
            >
              {project.category}
            </span>
            <span className="text-xs text-gray-400">
              {project.year}.{monthStr}
            </span>
          </div>

          {/* Title */}
          <h4 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
            {project.title}
          </h4>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className="px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded">
              {project.duration}
            </span>
            <span className="px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded">
              {project.type}
            </span>
            <span className="px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded">
              {project.format}
            </span>
          </div>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-gray-400 shrink-0 mt-1 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Expanded Detail */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-3 mt-3 border-t border-gray-100">
              {project.description && (
                <p className="text-sm text-gray-600 mb-2">
                  {project.description}
                </p>
              )}
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Details
                </a>
              )}
              {!project.description && !project.url && (
                <p className="text-sm text-gray-400 italic">
                  상세 정보 없음
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
