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
            데이터 분석과 현업 경험을 바탕으로 다양한 프로젝트를 수행해
            왔습니다. 문제를 정의하고, 데이터로 인사이트를 도출하며,
            실질적인 변화를 만드는 일을 해왔습니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
