import { NavigationBar, careerNavLinks } from "../components/NavigationBar";
import { ExperienceSection } from "../components/ExperienceSection";
import { EducationSection } from "../components/EducationSection";
import { CertificationsSection } from "../components/CertificationsSection";
import { PublicationsSection } from "../components/PublicationsSection";
import { AwardsSection } from "../components/AwardsSection";
import { AcademicProjectsSection } from "../components/AcademicProjectsSection";
import { TeachingSection } from "../components/TeachingSection";
import { PartTimeJobSection } from "../components/PartTimeJobSection";
import { GroupActivitySection } from "../components/GroupActivitySection";
import { MentoringSection } from "../components/MentoringSection";
import { ArrowLeft } from "lucide-react";
import { sections } from "../../config";

export function CareerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar navLinks={careerNavLinks} />

      <section className="py-4 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>메인으로 돌아가기</span>
          </a>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {sections.experience && <ExperienceSection />}
        {sections.education && <EducationSection />}
        {sections.certifications && <CertificationsSection />}
        {sections.publications && <PublicationsSection />}
        {sections.awards && <AwardsSection />}
        {sections.academicProjects && <AcademicProjectsSection />}
        {sections.teaching && <TeachingSection />}
        {sections.partTimeJob && <PartTimeJobSection />}
        {sections.groupActivity && <GroupActivitySection />}
        {sections.mentoring && <MentoringSection />}
      </div>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
