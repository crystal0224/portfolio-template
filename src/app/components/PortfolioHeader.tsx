import { useState } from "react";
import { Github, Linkedin, Mail, Twitter, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useAdmin } from "../contexts/AdminContext";
import { AdminLoginModal } from "./AdminLoginModal";

export function PortfolioHeader() {
  const { isAdmin } = useAdmin();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  return (
    <>
    <motion.header 
      className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <h1
                className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer select-none"
                onDoubleClick={() => setIsAdminModalOpen(true)}
                title="더블클릭하여 관리자 로그인"
              >
                Portfolio
              </h1>
              {isAdmin && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                >
                  <Shield className="w-3 h-3" />
                  <span>관리자</span>
                </motion.div>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">작업물 & 기록 아카이브</p>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
               className="text-gray-600 hover:text-gray-900 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
               className="text-gray-600 hover:text-gray-900 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
               className="text-gray-600 hover:text-gray-900 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="mailto:your@email.com"
               className="text-gray-600 hover:text-gray-900 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </motion.header>

    <AdminLoginModal
      isOpen={isAdminModalOpen}
      onClose={() => setIsAdminModalOpen(false)}
    />
    </>
  );
}
