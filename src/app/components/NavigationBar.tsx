import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, Linkedin, Mail } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "./ui/sheet";
import { profile } from "../../config";

const defaultNavLinks = [
  { id: "overview", label: "Overview" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "publications", label: "Publications" },
  { id: "awards", label: "Awards" },
  { id: "skills", label: "Skills" },
];

export const careerNavLinks = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "publications", label: "Publications" },
  { id: "awards", label: "Awards" },
  { id: "academic", label: "Academic" },
  { id: "teaching", label: "Teaching" },
  { id: "parttime", label: "Part-time" },
  { id: "groups", label: "Groups" },
  { id: "mentoring", label: "Mentoring" },
];

interface NavigationBarProps {
  showNavLinks?: boolean;
  navLinks?: { id: string; label: string }[];
}

export function NavigationBar({ showNavLinks = true, navLinks: customNavLinks }: NavigationBarProps = {}) {
  const [activeSection, setActiveSection] = useState("");

  const navLinks = customNavLinks || defaultNavLinks;

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navLinks.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [navLinks]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1
              className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer select-none"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              {profile.name}
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          {showNavLinks && (
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative px-3 py-2 text-sm transition-colors ${
                    activeSection === link.id
                      ? "text-blue-600 font-semibold"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                      layoutId="activeNav"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>
          )}

          {/* Social Links + Mobile Menu */}
          {showNavLinks && (
            <div className="flex items-center gap-3">
              <motion.div
                className="hidden sm:flex items-center gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </motion.div>

              {/* Mobile Hamburger */}
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="p-2 text-gray-600 hover:text-gray-900">
                      <Menu className="w-5 h-5" />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-72">
                    <SheetTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {profile.name}
                    </SheetTitle>
                    <nav className="flex flex-col gap-1 mt-6">
                      {navLinks.map((link) => (
                        <SheetClose key={link.id} asChild>
                          <button
                            onClick={() => scrollToSection(link.id)}
                            className={`text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                              activeSection === link.id
                                ? "bg-blue-50 text-blue-600 font-semibold"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                          >
                            {link.label}
                          </button>
                        </SheetClose>
                      ))}
                    </nav>
                    <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4 px-4">
                      {profile.linkedin && (
                        <a
                          href={profile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-900 transition-colors"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {profile.email && (
                        <a
                          href={`mailto:${profile.email}`}
                          className="text-gray-500 hover:text-gray-900 transition-colors"
                        >
                          <Mail className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
