import { motion } from "motion/react";
import { Search } from "lucide-react";

interface FilterBarProps {
  activePlatform: string;
  onPlatformChange: (platform: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const platforms = [
  { id: "all", label: "전체", icon: "📚" },
  { id: "HuggingFace", label: "HuggingFace", icon: "🤗" },
  { id: "Netlify", label: "Netlify", icon: "🌐" },
  { id: "Vercel", label: "Vercel", icon: "▲" },
  { id: "GitHub", label: "GitHub", icon: "💻" },
];

export function FilterBar({ activePlatform, onPlatformChange, searchQuery, onSearchChange }: FilterBarProps) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-[89px] z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Platforms */}
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
            {platforms.map((platform, index) => (
              <motion.button
                key={platform.id}
                onClick={() => onPlatformChange(platform.id)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                  activePlatform === platform.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-1">{platform.icon}</span>
                {platform.label}
              </motion.button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="검색..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
