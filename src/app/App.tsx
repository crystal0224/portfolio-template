import { useState, useMemo, useEffect } from "react";
import { NavigationBar } from "./components/NavigationBar";
import { HeroSection } from "./components/HeroSection";
import { FilterBar } from "./components/FilterBar";
import { PortfolioCard, PortfolioItem } from "./components/PortfolioCard";
import { portfolioData as originalData } from "./data/portfolioData";
import { useFirestore, FirestoreItem } from "./hooks/useFirestore";
import { AdminProvider, useAdmin } from "./contexts/AdminContext";
import { CareerDataProvider } from "./contexts/CareerDataContext";
import { CareerPage } from "./pages/CareerPage";
import { MigratePage } from "./pages/MigratePage";
import { AdminLoginModal } from "./components/AdminLoginModal";
import { EditProjectModal } from "./components/EditProjectModal";
import { AddItemButton } from "./components/career/AddItemButton";
import { ArrowRight } from "lucide-react";

function AppContent() {
  const { isAdmin } = useAdmin();
  const [currentPage, setCurrentPage] = useState<"home" | "career" | "migrate">("home");
  const [activeDomain, setActiveDomain] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  // Firebase Firestore for portfolio items
  const {
    items: firestoreItems,
    loading,
    addItem,
    updateItem,
    deleteItem,
  } = useFirestore<PortfolioItem & FirestoreItem>('portfolio_items', { orderByField: 'order' });

  // Use Firestore data when available, fall back to static data while loading
  const portfolioData: PortfolioItem[] = loading ? originalData : firestoreItems;

  // Handle hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the #
      if (hash === "career") {
        setCurrentPage("career");
      } else if (hash === "migrate") {
        setCurrentPage("migrate");
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

  // Save project edits to Firebase
  const handleProjectUpdate = async (updatedProject: PortfolioItem) => {
    // Find the Firestore document by matching the project id
    const firestoreDoc = firestoreItems.find(item => item.id === updatedProject.id);
    if (firestoreDoc) {
      try {
        await updateItem(firestoreDoc._id, {
          title: updatedProject.title,
          description: updatedProject.description,
          domain: updatedProject.domain,
          tags: updatedProject.tags,
          protected: updatedProject.protected,
          problemStatement: updatedProject.problemStatement,
          technicalDetails: updatedProject.technicalDetails,
          impact: updatedProject.impact,
          futureImprovements: updatedProject.futureImprovements,
        });
        console.log('✅ Firebase update successful:', firestoreDoc._id);
      } catch (error) {
        console.error('❌ Firebase update failed:', error);
        alert('저장 실패: ' + (error instanceof Error ? error.message : String(error)));
      }
    } else {
      console.error('❌ Document not found for project:', updatedProject.id);
    }
  };

  // Add new project to Firebase
  const handleProjectAdd = async (newProject: PortfolioItem) => {
    try {
      const order = firestoreItems.length;
      await addItem({
        ...newProject,
        order,
      } as any);
      console.log('✅ Project added successfully');
    } catch (error) {
      console.error('❌ Failed to add project:', error);
      alert('프로젝트 추가 실패: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  // Delete project from Firebase
  const handleProjectDelete = async (projectId: string) => {
    const firestoreDoc = firestoreItems.find(item => item.id === projectId);
    if (firestoreDoc) {
      await deleteItem(firestoreDoc._id);
    }
  };

  // Filter items based on domain and search
  const filteredItems = useMemo(() => {
    return portfolioData.filter((item) => {
      const matchesDomain = activeDomain === "all" || item.domain === activeDomain;
      const matchesSearch = searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesDomain && matchesSearch;
    });
  }, [activeDomain, searchQuery, portfolioData]);

  // Render career page if hash is #career
  if (currentPage === "career") {
    return <CareerPage />;
  }

  // Render migrate page if hash is #migrate
  if (currentPage === "migrate") {
    return <MigratePage />;
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
            <p className="text-lg text-gray-600 mb-2">
              개인 프로젝트 및 기술 포트폴리오
            </p>
            <p className="text-sm text-gray-500 max-w-4xl mx-auto leading-relaxed">
              Canva, Google Sheets/Apps Script, Google AI Studio, GPTs, 로컬 Python 프로그램 등은 제외하였습니다.<br />
              API 과금 방지를 위해 일부 프로젝트는 잠금 처리하였으며, 필요 시 공유 가능합니다.
            </p>
          </div>

          <FilterBar
            activeDomain={activeDomain}
            onDomainChange={setActiveDomain}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <div className="mt-8">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
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

          {isAdmin && (
            <div className="mt-8 flex justify-center">
              <AddItemButton onClick={() => setIsAddProjectModalOpen(true)} label="새 프로젝트 추가" />
            </div>
          )}
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
          <p className="text-center text-gray-500 text-xs">
            Last Updated: {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </footer>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      {/* Add Project Modal */}
      <EditProjectModal
        isOpen={isAddProjectModalOpen}
        onClose={() => setIsAddProjectModalOpen(false)}
        onSave={handleProjectAdd}
      />
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <CareerDataProvider>
        <AppContent />
      </CareerDataProvider>
    </AdminProvider>
  );
}
