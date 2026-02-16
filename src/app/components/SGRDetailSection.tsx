import { useState } from "react";
import { motion } from "motion/react";
import {
  FlaskConical,
  ClipboardCheck,
  Lightbulb,
  BookOpen,
  Mic,
  ChevronDown,
} from "lucide-react";
import { sgrActivitySummary } from "../data/detailedCareerData";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

interface ActivityGroup {
  id: string;
  title: string;
  icon: typeof FlaskConical;
  items: string[] | { category: string; count: number; example: string }[];
  gradient: string;
}

const activityGroups: ActivityGroup[] = [
  {
    id: "research",
    title: "연구 프로젝트",
    icon: FlaskConical,
    items: sgrActivitySummary.researchProjects,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "diagnostic",
    title: "진단 운영",
    icon: ClipboardCheck,
    items: sgrActivitySummary.diagnosticOperations,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "innovation",
    title: "HR 혁신",
    icon: Lightbulb,
    items: sgrActivitySummary.hrInnovation,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "publications",
    title: "간행물",
    icon: BookOpen,
    items: sgrActivitySummary.publications,
    gradient: "from-orange-500 to-amber-500",
  },
  {
    id: "lectures",
    title: "강의",
    icon: Mic,
    items: sgrActivitySummary.lectures,
    gradient: "from-pink-500 to-rose-500",
  },
];

function isStringArray(
  items: string[] | { category: string; count: number; example: string }[]
): items is string[] {
  return typeof items[0] === "string";
}

export function SGRDetailSection() {
  const [openSections, setOpenSections] = useState<Set<string>>(
    () => new Set(["research"])
  );

  const toggleSection = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section id="sgr-detail" className="py-24 bg-gray-50">
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
            SGR Activity Detail
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Samsung Global Research 재직 기간 (2018-2023) 주요 활동 상세
          </p>
        </motion.div>

        {/* Activity Groups - Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {activityGroups.map((group, groupIndex) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIndex * 0.08 }}
            >
              <Collapsible
                open={openSections.has(group.id)}
                onOpenChange={() => toggleSection(group.id)}
              >
                <CollapsibleTrigger asChild>
                  <button className="w-full flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
                    <div
                      className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${group.gradient}`}
                    >
                      <group.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-base font-semibold text-gray-900 flex-1 text-left">
                      {group.title}
                    </span>
                    <span className="text-xs text-gray-400 mr-2">
                      {group.items.length}건
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        openSections.has(group.id) ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-2 bg-white rounded-xl border border-gray-100 p-4">
                    <ul className="space-y-2.5">
                      {isStringArray(group.items)
                        ? group.items.map((item, i) => (
                            <li
                              key={i}
                              className="text-sm text-gray-600 flex items-start gap-2"
                            >
                              <span
                                className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${group.gradient} shrink-0`}
                              />
                              {item}
                            </li>
                          ))
                        : group.items.map((item, i) => (
                            <li
                              key={i}
                              className="text-sm text-gray-600 flex items-start gap-2"
                            >
                              <span
                                className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${group.gradient} shrink-0`}
                              />
                              <span>
                                <span className="font-medium text-gray-800">
                                  {item.category}
                                </span>{" "}
                                ({item.count}건) - {item.example}
                              </span>
                            </li>
                          ))}
                    </ul>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
