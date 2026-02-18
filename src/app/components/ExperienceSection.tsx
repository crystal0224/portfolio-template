import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { careerData } from "../../config";

export function ExperienceSection() {
  const positions = careerData.experience;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const formatPeriod = (start: string, end: string | null) => {
    const s = start.replace("-", ".");
    const e = end ? end.replace("-", ".") : "Present";
    return `${s} - ${e}`;
  };

  return (
    <section id="experience" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-3">
            {positions.map((pos, index) => {
              const hasHighlights = pos.highlights && pos.highlights.length > 0;
              const isExpanded = expandedIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className="relative pl-8 pb-4 last:pb-0"
                >
                  {index < positions.length - 1 && (
                    <div className="absolute left-[7px] top-6 bottom-0 w-0.5 bg-gray-200" />
                  )}
                  <div className="absolute left-0 top-2 w-4 h-4 rounded-full border-2 border-blue-500 bg-white" />

                  <div className="rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow p-3">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                      <span className="text-sm font-semibold text-blue-600">
                        {formatPeriod(pos.startDate, pos.endDate)}
                      </span>
                      <span className="text-gray-300">|</span>
                      <span className="text-base font-bold text-gray-900">{pos.company}</span>
                      <span className="text-gray-300">|</span>
                      <span className="text-sm text-gray-700">{pos.description}</span>
                      <span className="text-gray-300">|</span>
                      <span className="text-sm text-gray-700">{pos.title}</span>
                    </div>

                    {hasHighlights && (
                      <>
                        <button
                          onClick={() => setExpandedIndex(isExpanded ? null : index)}
                          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-600 font-medium mb-1"
                        >
                          <span>주요 활동 ({pos.highlights!.length}건)</span>
                          <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden space-y-1"
                            >
                              {pos.highlights!.map((item, i) => (
                                <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                                  <span className="mt-1 w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 shrink-0" />
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
      </div>
    </section>
  );
}
