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

const domainConfig = {
  "hr-analytics": { label: "진단/분석", color: "bg-blue-100 text-blue-700" },
  "assessment": { label: "평가/코칭", color: "bg-green-100 text-green-700" },
  "ai-tools": { label: "AI 도구", color: "bg-purple-100 text-purple-700" },
  "workshop": { label: "워크샵", color: "bg-orange-100 text-orange-700" },
  "education": { label: "교육", color: "bg-teal-100 text-teal-700" }
};

export function PortfolioCard({ item, index, onEdit, onDelete }: PortfolioCardProps) {
  const domainInfo = item.domain ? domainConfig[item.domain] : null;
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
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Content */}
      <div className="p-5 flex flex-col h-full">
        {/* Badge, Date, and Buttons Line */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            {item.code && (
              <span className="px-2 py-0.5 rounded-md text-xs font-mono font-semibold bg-indigo-100 text-indigo-800">
                {item.code}
              </span>
            )}
            {domainInfo && (
              <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${domainInfo.color}`}>
                {domainInfo.label}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-gray-500">{item.date}</span>
            <div className="flex items-center gap-1">
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
        </div>

        {/* Title Line */}
        <h3 className="font-semibold text-lg text-gray-900 mb-3">
          {item.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-4">
          {item.description}
        </p>

        {/* Spacer to push button to bottom */}
        <div className="flex-grow"></div>

        {/* Expand/Collapse Button */}
        {hasDetails && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-1 py-2 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 hover:border-blue-300 rounded-md transition-all"
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
              <div className="pt-4 mt-3 border-t border-gray-200 space-y-4 font-['Pretendard',_'Apple_SD_Gothic_Neo',_sans-serif]">
                {item.problemStatement && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5 tracking-tight">
                      <span>💡</span> 왜 만들었나?
                    </h4>
                    <p className="text-xs text-gray-700 leading-normal tracking-tight">{item.problemStatement}</p>
                  </div>
                )}

                {item.technicalDetails && item.technicalDetails.length > 0 && (
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5 tracking-tight">
                      <span>🔧</span> 기술적 구현
                    </h4>
                    <ul className="space-y-1">
                      {item.technicalDetails.map((detail, i) => (
                        <li key={i} className="text-xs text-gray-700 leading-normal tracking-tight flex items-start gap-2">
                          <span className="text-purple-400 mt-0.5 shrink-0">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.impact && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5 tracking-tight">
                      <span>📊</span> 성과
                    </h4>
                    <p className="text-xs text-gray-700 leading-normal tracking-tight">{item.impact}</p>
                  </div>
                )}

                {item.futureImprovements && item.futureImprovements.length > 0 && (
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <h4 className="text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5 tracking-tight">
                      <span>🚀</span> 향후 계획
                    </h4>
                    <ul className="space-y-1">
                      {item.futureImprovements.map((improvement, i) => (
                        <li key={i} className="text-xs text-gray-700 leading-normal tracking-tight flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5 shrink-0">•</span>
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
