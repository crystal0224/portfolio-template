import { motion } from "motion/react";
import { Search } from "lucide-react";
import type { ProjectCategory } from "../data/detailedCareerData";

interface ProjectFilterBarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  activeYear: number | null;
  onYearChange: (year: number | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  years: number[];
}

const categoryColors: Record<string, string> = {
  "전체": "bg-blue-600 text-white",
  "진단": "bg-blue-100 text-blue-700",
  "리더십": "bg-purple-100 text-purple-700",
  "채용/퇴직": "bg-green-100 text-green-700",
  "SERI CEO": "bg-orange-100 text-orange-700",
  "CEO/HR브리프": "bg-orange-100 text-orange-700",
  "분석방법론": "bg-cyan-100 text-cyan-700",
  "강의": "bg-pink-100 text-pink-700",
  "교육이수": "bg-yellow-100 text-yellow-700",
  "제도": "bg-indigo-100 text-indigo-700",
  "기타": "bg-gray-100 text-gray-700",
};

const categories = [
  "전체",
  "진단",
  "리더십",
  "채용/퇴직",
  "SERI CEO",
  "CEO/HR브리프",
  "분석방법론",
  "강의",
  "교육이수",
  "제도",
  "기타",
];

export function ProjectFilterBar({
  activeCategory,
  onCategoryChange,
  activeYear,
  onYearChange,
  searchQuery,
  onSearchChange,
  years,
}: ProjectFilterBarProps) {
  return (
    <div className="space-y-4">
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat, index) => {
          const isActive = activeCategory === cat;
          return (
            <motion.button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          );
        })}
      </div>

      {/* Year Filter + Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => onYearChange(null)}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all ${
              activeYear === null
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            전체 연도
          </button>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => onYearChange(year)}
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all ${
                activeYear === year
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-56">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="프로젝트 검색..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}
