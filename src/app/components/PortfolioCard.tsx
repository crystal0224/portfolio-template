import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ExternalLink, Github, Globe, Lock, Edit2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ProtectedLinkModal } from "./ProtectedLinkModal";
import { EditProjectModal } from "./EditProjectModal";
import { useAdmin } from "../contexts/AdminContext";

export interface PortfolioItem {
  id: string;
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
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
        <ImageWithFallback
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {item.platform && (
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${platformColor}`}>
              {item.platform}
            </div>
          )}
          {isAdmin && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-blue-500 hover:text-white transition-colors shadow-lg"
              title="편집"
            >
              <Edit2 className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {item.title}
            </h3>
            <p className="text-xs text-gray-500">{item.date}</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
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
        <div className="flex gap-2 pt-3 border-t border-gray-100">
          {item.links.live && (
            item.protected && !isAuthenticated && !isAdmin ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1 px-3 py-2 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700 transition-colors flex-1 justify-center"
              >
                <Lock className="w-4 h-4" />
                <span>비밀번호 필요</span>
              </button>
            ) : (
              <a
                href={item.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex-1 justify-center"
              >
                <Globe className="w-4 h-4" />
                <span>보기</span>
              </a>
            )
          )}
          {item.links.github && (
            <a
              href={item.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-900 transition-colors flex-1 justify-center"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          )}
          {item.links.external && (
            <a
              href={item.links.external}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors flex-1 justify-center"
            >
              <ExternalLink className="w-4 h-4" />
              <span>링크</span>
            </a>
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
