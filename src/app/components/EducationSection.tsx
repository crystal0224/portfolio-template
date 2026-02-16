import { motion } from "motion/react";
import { GraduationCap, Calendar, Award } from "lucide-react";
import { education } from "../data/detailedCareerData";

export function EducationSection() {
  return (
    <section id="education" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Education</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
        </motion.div>

        {/* Education Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {education.map((edu, index) => {
            const isFeatured = index === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`relative rounded-xl p-6 transition-shadow hover:shadow-lg ${
                  isFeatured
                    ? "bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200"
                    : "bg-white border border-gray-200"
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3 left-6">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium rounded-full">
                      Highest Degree
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div
                    className={`inline-flex p-3 rounded-full shrink-0 ${
                      isFeatured
                        ? "bg-gradient-to-br from-blue-100 to-purple-100"
                        : "bg-gray-100"
                    }`}
                  >
                    <GraduationCap
                      className={`w-6 h-6 ${
                        isFeatured ? "text-blue-600" : "text-gray-600"
                      }`}
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {edu.school}
                    </h3>
                    <p className="text-sm font-medium text-gray-700 mb-0.5">
                      {edu.degree}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">{edu.field}</p>

                    <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {edu.startYear} - {edu.endYear}
                      </span>
                    </div>

                    {/* GPA */}
                    {edu.gpa && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-md">
                          GPA {edu.gpa}
                        </span>
                      </div>
                    )}

                    {/* Honors */}
                    {edu.honors && (
                      <div className="flex items-start gap-1.5 mb-2">
                        <Award className="w-3.5 h-3.5 text-yellow-600 shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-600">
                          {edu.honors}
                        </span>
                      </div>
                    )}

                    {edu.notes && (
                      <p className="text-xs text-gray-500 bg-white/60 rounded-lg px-3 py-2">
                        {edu.notes}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
