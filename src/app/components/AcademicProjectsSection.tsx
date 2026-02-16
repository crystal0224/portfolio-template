import { motion } from "motion/react";
import { FlaskConical, Calendar, Building } from "lucide-react";
import { academicProjects } from "../data/detailedCareerData";

export function AcademicProjectsSection() {
  return (
    <section id="academic" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Academic Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          <p className="text-lg text-gray-600">
            {academicProjects.length}개 학술 및 연구 프로젝트
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {academicProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -3 }}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="inline-flex p-2 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 shrink-0 mt-0.5">
                  <FlaskConical className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1.5 line-clamp-2">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <Building className="w-3 h-3 shrink-0" />
                    <span className="truncate">{project.organization}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                    <Calendar className="w-3 h-3 shrink-0" />
                    <span>
                      {project.startDate} ~ {project.endDate}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
