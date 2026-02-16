import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, FolderOpen } from "lucide-react";
import { workProjects } from "../data/detailedCareerData";
import { ProjectFilterBar } from "./ProjectFilterBar";
import { WorkProjectCard } from "./WorkProjectCard";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

export function WorkProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openYears, setOpenYears] = useState<Set<number>>(() => new Set());

  // Available years
  const years = useMemo(() => {
    const yearSet = new Set(workProjects.map((p) => p.year));
    return Array.from(yearSet).sort((a, b) => b - a);
  }, []);

  // Initialize first year as open
  useMemo(() => {
    if (years.length > 0 && openYears.size === 0) {
      setOpenYears(new Set([years[0]]));
    }
  }, [years]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    let result = workProjects;

    if (activeCategory !== "전체") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (activeYear !== null) {
      result = result.filter((p) => p.year === activeYear);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.description && p.description.toLowerCase().includes(query))
      );
    }

    return result;
  }, [activeCategory, activeYear, searchQuery]);

  // Group by year
  const groupedByYear = useMemo(() => {
    const groups = new Map<number, typeof filteredProjects>();
    for (const project of filteredProjects) {
      const existing = groups.get(project.year) || [];
      existing.push(project);
      groups.set(project.year, existing);
    }
    return Array.from(groups.entries()).sort(([a], [b]) => b - a);
  }, [filteredProjects]);

  const toggleYear = (year: number) => {
    setOpenYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) {
        next.delete(year);
      } else {
        next.add(year);
      }
      return next;
    });
  };

  return (
    <section id="projects" className="py-24 bg-white">
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
            Work Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {workProjects.length}개 업무 프로젝트 (2018-2022)
          </p>
        </motion.div>

        {/* Filter Bar */}
        <div className="mb-8">
          <ProjectFilterBar
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            activeYear={activeYear}
            onYearChange={setActiveYear}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            years={years}
          />
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-sm text-gray-500 mb-6"
        >
          <FolderOpen className="w-4 h-4" />
          <span>
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredProjects.length}
            </span>{" "}
            of {workProjects.length} projects
          </span>
        </motion.div>

        {/* Year Groups */}
        <div className="space-y-6">
          {groupedByYear.map(([year, projects]) => (
            <Collapsible
              key={year}
              open={openYears.has(year)}
              onOpenChange={() => toggleYear(year)}
            >
              <CollapsibleTrigger asChild>
                <button className="w-full flex items-center justify-between py-3 group">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-gray-900">{year}</h3>
                    <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {projects.length} projects
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      openYears.has(year) ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 pb-4">
                  {projects.map((project, idx) => (
                    <WorkProjectCard
                      key={project.id}
                      project={project}
                      index={idx}
                    />
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}

          {groupedByYear.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">
                검색 결과가 없습니다
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
