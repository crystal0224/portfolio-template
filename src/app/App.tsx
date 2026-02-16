import { useState, useMemo, useEffect } from "react";
import { NavigationBar } from "./components/NavigationBar";
import { HeroSection } from "./components/HeroSection";
import { FilterBar } from "./components/FilterBar";
import { PortfolioCard, PortfolioItem } from "./components/PortfolioCard";
import { portfolioData as originalData } from "./data/portfolioData";
import { AdminProvider } from "./contexts/AdminContext";
import { CareerPage } from "./pages/CareerPage";
import { AdminLoginModal } from "./components/AdminLoginModal";
import { ArrowRight } from "lucide-react";

function AppContent() {
  const [currentPage, setCurrentPage] = useState<"home" | "career">("home");
  const [activePlatform, setActivePlatform] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>(originalData);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Handle hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the #
      if (hash === "career") {
        setCurrentPage("career");
      } else {
        setCurrentPage("home");
      }
    };

    // Initial check
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Load edited projects from LocalStorage
  useEffect(() => {
    const savedEdits = localStorage.getItem("portfolio_edits");
    const deletedIds = localStorage.getItem("portfolio_deleted");
    const deletedSet = deletedIds ? new Set(JSON.parse(deletedIds)) : new Set();

    if (savedEdits) {
      try {
        const edits = JSON.parse(savedEdits);
        const updatedData = originalData
          .filter(item => !deletedSet.has(item.id)) // Filter out deleted items
          .map(item => {
            const editedItem = edits[item.id];
            return editedItem ? { ...item, ...editedItem } : item;
          });
        setPortfolioData(updatedData);
      } catch (error) {
        console.error("Failed to load portfolio edits:", error);
      }
    } else if (deletedIds) {
      // Only deleted items, no edits
      const updatedData = originalData.filter(item => !deletedSet.has(item.id));
      setPortfolioData(updatedData);
    }
  }, []);

  // Save project edits
  const handleProjectUpdate = (updatedProject: PortfolioItem) => {
    // Update state
    setPortfolioData(prev =>
      prev.map(item => item.id === updatedProject.id ? updatedProject : item)
    );

    // Save to LocalStorage
    const savedEdits = localStorage.getItem("portfolio_edits");
    const edits = savedEdits ? JSON.parse(savedEdits) : {};
    edits[updatedProject.id] = {
      title: updatedProject.title,
      description: updatedProject.description,
      tags: updatedProject.tags,
      protected: updatedProject.protected,
    };
    localStorage.setItem("portfolio_edits", JSON.stringify(edits));
  };

  // Delete project
  const handleProjectDelete = (projectId: string) => {
    // Update state - remove from display
    setPortfolioData(prev => prev.filter(item => item.id !== projectId));

    // Save to LocalStorage
    const deletedIds = localStorage.getItem("portfolio_deleted");
    const deletedSet = deletedIds ? new Set(JSON.parse(deletedIds)) : new Set();
    deletedSet.add(projectId);
    localStorage.setItem("portfolio_deleted", JSON.stringify(Array.from(deletedSet)));
  };

  // Filter items based on platform and search
  const filteredItems = useMemo(() => {
    return portfolioData.filter((item) => {
      const matchesPlatform = activePlatform === "all" || item.platform === activePlatform;
      const matchesSearch = searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesPlatform && matchesSearch;
    });
  }, [activePlatform, searchQuery, portfolioData]);

  // Render career page if hash is #career
  if (currentPage === "career") {
    return <CareerPage />;
  }

  // Render home page
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar showNavLinks={false} />
      <HeroSection onTitleDoubleClick={() => setIsAdminModalOpen(true)} />

      {/* Tech Projects Section */}
      <section id="tech-projects" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tech & Side Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
            <p className="text-lg text-gray-600">
              개인 프로젝트 및 기술 포트폴리오
            </p>
          </div>

          <FilterBar
            activePlatform={activePlatform}
            onPlatformChange={setActivePlatform}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <div className="mt-8">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item, index) => (
                  <PortfolioCard
                    key={item.id}
                    item={item}
                    index={index}
                    onEdit={handleProjectUpdate}
                    onDelete={handleProjectDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">
                  {searchQuery ? `"${searchQuery}"에 대한 검색 결과가 없습니다.` : "해당 카테고리에 항목이 없습니다."}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* View Full Career CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            전체 경력 정보 보기
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            교육, 자격증, 출판물, 학술 프로젝트, 강의 경험 등 더 많은 정보를 확인하세요
          </p>
          <a
            href="#career"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>상세 경력 보기</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 text-sm">
            © 2026 Portfolio. 모든 작업물은 해당 저작권자의 소유입니다.
          </p>
          <p className="text-center text-gray-500 text-xs mt-2">
            Last Updated: {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </footer>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
}
