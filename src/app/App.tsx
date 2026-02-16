import { useState, useMemo, useEffect } from "react";
import { NavigationBar } from "./components/NavigationBar";
import { HeroSection } from "./components/HeroSection";
import { OverviewSection } from "./components/OverviewSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { WorkProjectsSection } from "./components/WorkProjectsSection";
import { StatsSection } from "./components/StatsSection";
import { FilterBar } from "./components/FilterBar";
import { PortfolioCard, PortfolioItem } from "./components/PortfolioCard";
import { EducationSection } from "./components/EducationSection";
import { CertificationsSection } from "./components/CertificationsSection";
import { PublicationsSection } from "./components/PublicationsSection";
import { SkillsSection } from "./components/SkillsSection";
import { AwardsSection } from "./components/AwardsSection";
import { AcademicProjectsSection } from "./components/AcademicProjectsSection";
import { TeachingSection } from "./components/TeachingSection";
import { SGRDetailSection } from "./components/SGRDetailSection";
import { portfolioData as originalData } from "./data/portfolioData";
import { AdminProvider } from "./contexts/AdminContext";

function AppContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>(originalData);

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

  // Filter items based on category and search
  const filteredItems = useMemo(() => {
    return portfolioData.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch = searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, portfolioData]);

  // Calculate stats
  const stats = useMemo(() => {
    return {
      projects: portfolioData.filter(item => item.category === "projects").length,
      lectures: portfolioData.filter(item => item.category === "lectures").length,
      publications: portfolioData.filter(item => item.category === "publications").length,
      articles: portfolioData.filter(item => item.category === "articles").length,
    };
  }, [portfolioData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />

      <HeroSection />

      <OverviewSection />

      <ExperienceSection />

      <WorkProjectsSection />

      <StatsSection stats={stats} />

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
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
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

      <EducationSection />

      <CertificationsSection />

      <PublicationsSection />

      <SkillsSection />

      <AwardsSection />

      <AcademicProjectsSection />

      <TeachingSection />

      <SGRDetailSection />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 text-sm">
            © 2024 Portfolio. 모든 작업물은 해당 저작권자의 소유입니다.
          </p>
        </div>
      </footer>
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
