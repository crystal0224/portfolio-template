import { motion } from "motion/react";
import { Award, Book, FileText, Presentation } from "lucide-react";

interface StatsSectionProps {
  stats: {
    projects: number;
    lectures: number;
    publications: number;
    articles: number;
  };
}

export function StatsSection({ stats }: StatsSectionProps) {
  const items = [
    {
      icon: Award,
      label: "프로젝트",
      value: stats.projects,
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Presentation,
      label: "강의",
      value: stats.lectures,
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Book,
      label: "저서",
      value: stats.publications,
      color: "bg-green-100 text-green-600",
    },
    {
      icon: FileText,
      label: "기고문",
      value: stats.articles,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <section className="bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${item.color} mb-3`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{item.value}</div>
              <div className="text-sm text-gray-600">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
