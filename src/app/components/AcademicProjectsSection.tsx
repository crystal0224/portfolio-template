import { motion } from "motion/react";
import { FlaskConical, Calendar, Building } from "lucide-react";
import { careerData } from "../../config";

export function AcademicProjectsSection() {
  const items = careerData.academicProjects;
  if (items.length === 0) return null;

  return (
    <section id="academic" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {items.length}개 학술 및 연구 프로젝트
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {items.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
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
                      <span className="truncate">{project.institution}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                      <Calendar className="w-3 h-3 shrink-0" />
                      <span>{project.period}</span>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2">
                      {project.description}
                    </p>

                    {project.role && (
                      <span className="inline-block mt-2 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {project.role}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
