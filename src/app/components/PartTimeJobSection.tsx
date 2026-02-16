import { motion } from "motion/react";
import { Briefcase, Calendar, Building } from "lucide-react";
import { partTimeJobs } from "../data/detailedCareerData";

export function PartTimeJobSection() {
  return (
    <section id="parttime" className="py-24 bg-white">
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
            Part-time Job Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          <p className="text-lg text-gray-600">
            {partTimeJobs.length}개 파트타임 경력
          </p>
        </motion.div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {partTimeJobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -3 }}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 shrink-0">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
                    {job.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1.5">
                    <Building className="w-4 h-4 shrink-0" />
                    <span className="truncate">{job.organization}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>
                      {job.startDate} ~ {job.endDate}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                    {job.description}
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
