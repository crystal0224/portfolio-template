import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ExternalLink, Github, Globe, Lock, Edit2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ProtectedLinkModal } from "./ProtectedLinkModal";
import { EditProjectModal } from "./EditProjectModal";
import { useAdmin } from "../contexts/AdminContext";

export interface PortfolioItem {
  id: string;
  code?: string; // 프로젝트 코드 번호 (예: P001, P002)
  title: string;
  description: string;
  category: "projects" | "lectures" | "publications" | "articles";
  platform?: string;
  image: string;
  tags: string[];
  links: {
    live?: string;
    github?: string;
    external?: string;
  };
  date: string;
  protected?: boolean; // 유료 API 키 사용 프로젝트 보호
}

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
  onEdit?: (updatedProject: PortfolioItem) => void;
  onDelete?: (projectId: string) => void;
}

const platformColors = {
  "HuggingFace": "bg-yellow-100 text-yellow-800",
  "Netlify": "bg-teal-100 text-teal-800",
  "Vercel": "bg-black text-white",
  "GitHub": "bg-gray-100 text-gray-800",
  "Medium": "bg-green-100 text-green-800",
  "Default": "bg-blue-100 text-blue-800"
};

export function PortfolioCard({ item, index, onEdit, onDelete }: PortfolioCardProps) {
  const platformColor = platformColors[item.platform as keyof typeof platformColors] || platformColors["Default"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { isAdmin } = useAdmin();

  // Check authentication status from session storage
  useEffect(() => {
    if (item.protected) {
      const authStatus = sessionStorage.getItem("portfolio_auth");
      const authTime = sessionStorage.getItem("portfolio_auth_time");

      if (authStatus === "true" && authTime) {
        // Session expires after 24 hours
        const elapsed = Date.now() - parseInt(authTime);
        if (elapsed < 24 * 60 * 60 * 1000) {
          setIsAuthenticated(true);
        } else {
          sessionStorage.removeItem("portfolio_auth");
          sessionStorage.removeItem("portfolio_auth_time");
        }
      }
    }
  }, [item.protected]);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <>
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {item.code && (
                <span className="px-2 py-0.5 rounded-md text-xs font-mono font-semibold bg-indigo-100 text-indigo-800">
                  {item.code}
                </span>
              )}
              <h3 className="font-semibold text-lg text-gray-900">
                {item.title}
              </h3>
              {item.platform && (
                <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${platformColor}`}>
                  {item.platform}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">{item.date}</p>
          </div>
          {isAdmin && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="편집"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
          {item.tags.length > 3 && (
            <span className="px-2 py-1 text-gray-400 text-xs">
              +{item.tags.length - 3}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-1.5 pt-3 border-t border-gray-100">
          {item.links.live && (
            item.protected && !isAuthenticated && !isAdmin ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1 px-2 py-1 bg-amber-600 text-white text-xs rounded-md hover:bg-amber-700 transition-colors"
              >
                <Lock className="w-3 h-3" />
                <span>비밀번호</span>
              </button>
            ) : (
              <a
                href={item.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors"
              >
                <Globe className="w-3 h-3" />
                <span>보기</span>
              </a>
            )
          )}
          {item.links.github && (
            item.protected && !isAuthenticated && !isAdmin ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1 px-2 py-1 bg-amber-600 text-white text-xs rounded-md hover:bg-amber-700 transition-colors"
              >
                <Lock className="w-3 h-3" />
                <span>GitHub</span>
              </button>
            ) : (
              <a
                href={item.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2 py-1 bg-gray-800 text-white text-xs rounded-md hover:bg-gray-900 transition-colors"
              >
                <Github className="w-3 h-3" />
                <span>GitHub</span>
              </a>
            )
          )}
          {item.links.external && (
            item.protected && !isAuthenticated && !isAdmin ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1 px-2 py-1 bg-amber-600 text-white text-xs rounded-md hover:bg-amber-700 transition-colors"
              >
                <Lock className="w-3 h-3" />
                <span>링크</span>
              </button>
            ) : (
              <a
                href={item.links.external}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2 py-1 border border-gray-300 text-gray-700 text-xs rounded-md hover:bg-gray-50 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                <span>링크</span>
              </a>
            )
          )}
        </div>
      </div>

      {/* Protected Link Modal */}
      {item.protected && (
        <ProtectedLinkModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleAuthSuccess}
          projectTitle={item.title}
        />
      )}

      {/* Edit Project Modal */}
      {isAdmin && onEdit && (
        <EditProjectModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          project={item}
          onSave={onEdit}
          onDelete={onDelete}
        />
      )}
    </motion.div>
    </>
  );
}
