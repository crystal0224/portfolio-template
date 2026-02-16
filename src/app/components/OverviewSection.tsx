import { motion } from "motion/react";

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
      </div>
    </section>
  );
}
