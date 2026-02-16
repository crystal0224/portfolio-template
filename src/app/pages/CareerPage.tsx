import { motion } from "motion/react";
import { NavigationBar } from "../components/NavigationBar";
import { OverviewSection } from "../components/OverviewSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { WorkProjectsSection } from "../components/WorkProjectsSection";
import { EducationSection } from "../components/EducationSection";
import { CertificationsSection } from "../components/CertificationsSection";
import { PublicationsSection } from "../components/PublicationsSection";
import { SkillsSection } from "../components/SkillsSection";
import { AwardsSection } from "../components/AwardsSection";
import { AcademicProjectsSection } from "../components/AcademicProjectsSection";
import { TeachingSection } from "../components/TeachingSection";
import { PartTimeJobSection } from "../components/PartTimeJobSection";
import { GroupActivitySection } from "../components/GroupActivitySection";
import { MentoringSection } from "../components/MentoringSection";
import { ResearchExchangeSection } from "../components/ResearchExchangeSection";
import { ArrowLeft } from "lucide-react";

export function CareerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />

      {/* Page Header */}
      <section className="pt-24 pb-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>메인으로 돌아가기</span>
          </a>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              상세 경력
            </h1>
            <p className="text-xl text-gray-600">
              전체 커리어 여정과 성과를 확인하세요
            </p>
          </motion.div>
        </div>
      </section>

      {/* Career Sections */}
      <div className="container mx-auto px-4 py-12">
        <OverviewSection />
        <ExperienceSection />
        <WorkProjectsSection />
        <EducationSection />
        <CertificationsSection />
        <PublicationsSection />
        <SkillsSection />
        <AwardsSection />
        <AcademicProjectsSection />
        <TeachingSection />
        <PartTimeJobSection />
        <GroupActivitySection />
        <MentoringSection />
        <ResearchExchangeSection />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            © 2026 Portfolio. 모든 작업물은 해당 저작권자의 소유입니다.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Last Updated: {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </footer>
    </div>
  );
}
