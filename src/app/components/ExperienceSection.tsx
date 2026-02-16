import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Calendar, ChevronDown } from "lucide-react";
import { positions } from "../data/detailedCareerData";

export function ExperienceSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const formatPeriod = (start: string, end: string | null) => {
    const s = start.replace("-", ".");
    const e = end ? end.replace("-", ".") : "Present";
    return `${s} - ${e}`;
  };

  return (
    <section id="experience" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            심리학과 데이터 분석 전문성을 기반으로 한 경력
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {positions.map((pos, index) => {
            const hasHighlights =
              pos.highlights && pos.highlights.length > 0;
            const isExpanded = expandedIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8 pb-12 last:pb-0"
              >
                {/* Timeline line */}
                {index < positions.length - 1 && (
                  <div className="absolute left-[7px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />
                )}

                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg" />

                {/* Content Card */}
                <div className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow border border-gray-100">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatPeriod(pos.startDate, pos.endDate)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      {pos.location}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {pos.company}
                  </h3>
                  <p className="text-sm text-gray-700 font-medium mb-1">
                    {pos.title}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {pos.description}
                  </p>

                  {/* Highlights toggle */}
                  {hasHighlights && (
                    <>
                      <button
                        onClick={() =>
                          setExpandedIndex(isExpanded ? null : index)
                        }
                        className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium mb-2"
                      >
                        <span>
                          주요 활동 ({pos.highlights!.length}건)
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden space-y-1.5"
                          >
                            {pos.highlights!.map((item, i) => (
                              <li
                                key={i}
                                className="text-sm text-gray-600 flex items-start gap-2"
                              >
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
