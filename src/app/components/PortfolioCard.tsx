import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, Globe, Lock, Edit2, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ProtectedLinkModal } from "./ProtectedLinkModal";
import { EditProjectModal } from "./EditProjectModal";
import { useAdmin } from "../contexts/AdminContext";

export type ProjectDomain =
  | "hr-analytics"      // HR Analytics & Diagnostics
  | "assessment"        // Assessment & Coaching
  | "ai-tools"          // AI Tools & Automation
  | "workshop"          // Workshop & Collaboration
  | "education";        // Education & Knowledge Sharing

export interface PortfolioItem {
  id: string;
  code?: string; // 프로젝트 코드 번호 (예: P001, P002)
  title: string;
  description: string;
  category: "projects" | "lectures" | "publications" | "articles";
  platform?: string;
  domain?: ProjectDomain;
  image: string;
  tags: string[];
  links: {
    live?: string;
    github?: string;
    external?: string;
  };
  date: string;
  protected?: boolean; // 유료 API 키 사용 프로젝트 보호
  problemStatement?: string; // 왜 만들었나?
  technicalDetails?: string[]; // 기술적 구현 포인트
  impact?: string; // 성과/영향
  futureImprovements?: string[]; // 향후 계획
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
  const [isExpanded, setIsExpanded] = useState(false);
  const { isAdmin } = useAdmin();

  const hasDetails = item.problemStatement || (item.technicalDetails && item.technicalDetails.length > 0) || item.impact || (item.futureImprovements && item.futureImprovements.length > 0);

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
          <div className="flex-1 min-w-0">
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
          <div className="flex items-center gap-1 ml-2 shrink-0">
            {item.links.live && (
              item.protected && !isAuthenticated && !isAdmin ? (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                  title="비밀번호 필요"
                >
                  <Lock className="w-4 h-4" />
                </button>
              ) : (
                <a
                  href={item.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  title="보기"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )
            )}
            {item.links.github && (
              item.protected && !isAuthenticated && !isAdmin ? (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                  title="비밀번호 필요"
                >
                  <Lock className="w-4 h-4" />
                </button>
              ) : (
                <a
                  href={item.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )
            )}
            {item.links.external && (
              item.protected && !isAuthenticated && !isAdmin ? (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                  title="비밀번호 필요"
                >
                  <Lock className="w-4 h-4" />
                </button>
              ) : (
                <a
                  href={item.links.external}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
                  title="외부 링크"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )
            )}
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

        {/* Expand/Collapse Button */}
        {hasDetails && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-1 py-1.5 text-xs text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            <span>{isExpanded ? "접기" : "자세히 보기"}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          </button>
        )}

        {/* Expanded Detail Section */}
        <AnimatePresence>
          {isExpanded && hasDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-3 mt-2 border-t border-gray-100 space-y-3">
                {item.problemStatement && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                      <span>💡</span> 왜 만들었나?
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.problemStatement}</p>
                  </div>
                )}

                {item.technicalDetails && item.technicalDetails.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                      <span>🔧</span> 기술적 구현
                    </h4>
                    <ul className="space-y-0.5">
                      {item.technicalDetails.map((detail, i) => (
                        <li key={i} className="text-xs text-gray-600 leading-relaxed flex items-start gap-1.5">
                          <span className="text-gray-400 mt-0.5 shrink-0">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.impact && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                      <span>📊</span> 성과
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.impact}</p>
                  </div>
                )}

                {item.futureImprovements && item.futureImprovements.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                      <span>🚀</span> 향후 계획
                    </h4>
                    <ul className="space-y-0.5">
                      {item.futureImprovements.map((improvement, i) => (
                        <li key={i} className="text-xs text-gray-600 leading-relaxed flex items-start gap-1.5">
                          <span className="text-gray-400 mt-0.5 shrink-0">•</span>
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
