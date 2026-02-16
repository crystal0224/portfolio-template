import { useState, useMemo } from "react";
import { PortfolioHeader } from "./components/PortfolioHeader";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { StatsSection } from "./components/StatsSection";
import { FilterBar } from "./components/FilterBar";
import { PortfolioCard } from "./components/PortfolioCard";
import { portfolioData } from "./data/portfolioData";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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
  }, [activeCategory, searchQuery]);

  // Calculate stats
  const stats = useMemo(() => {
    return {
      projects: portfolioData.filter(item => item.category === "projects").length,
      lectures: portfolioData.filter(item => item.category === "lectures").length,
      publications: portfolioData.filter(item => item.category === "publications").length,
      articles: portfolioData.filter(item => item.category === "articles").length,
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <PortfolioHeader />

      <HeroSection />

      <AboutSection />

      <StatsSection stats={stats} />
      
      <FilterBar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Portfolio Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <PortfolioCard key={item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              {searchQuery ? `"${searchQuery}"에 대한 검색 결과가 없습니다.` : "해당 카테고리에 항목이 없습니다."}
            </p>
          </div>
        )}
      </main>

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
