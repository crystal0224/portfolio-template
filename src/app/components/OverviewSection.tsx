import { motion } from "motion/react";
import { Briefcase, Award, BookOpen, FolderOpen } from "lucide-react";
import { workProjects, certifications, publications, positions } from "../data/detailedCareerData";

// Calculate unique companies
const uniqueCompanies = new Set(positions.map(p => p.company)).size;

const highlights = [
  {
    icon: FolderOpen,
    value: workProjects.length.toString(),
    label: "업무 프로젝트",
    detail: "진단, 리더십, 채용 등",
    gradient: "from-blue-50 to-cyan-50",
  },
  {
    icon: Briefcase,
    value: `10년+`,
    label: "경력",
    detail: `${uniqueCompanies}개 기관 (SK, Samsung 등)`,
    gradient: "from-purple-50 to-pink-50",
  },
  {
    icon: Award,
    value: certifications.length.toString(),
    label: "자격증",
    detail: "SHRM-CP, KAC 등",
    gradient: "from-green-50 to-emerald-50",
  },
  {
    icon: BookOpen,
    value: publications.length.toString(),
    label: "출판물",
    detail: "저서, 학술 논문 등",
    gradient: "from-orange-50 to-amber-50",
  },
];

export function OverviewSection() {
  return (
    <section id="overview" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Career Overview
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            10년 이상 심리학과 데이터 분석을 결합하여 리더십 진단, People
            Analytics, HR 솔루션 개발 분야에서 전문성을 쌓아 왔습니다. SK,
            삼성 등 대기업에서 조직 효과성 향상을 위한 연구와 프로젝트를
            수행하고 있습니다.
          </p>
        </motion.div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-gradient-to-br ${item.gradient} p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow`}
            >
              <div className="inline-flex p-3 rounded-full bg-white/80 mb-4 shadow-sm">
                <item.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {item.value}
              </div>
              <div className="text-sm font-semibold text-gray-800 mb-1">
                {item.label}
              </div>
              <div className="text-xs text-gray-500">{item.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
