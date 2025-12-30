
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaTimes, FaRobot, FaChevronLeft, FaChevronRight, FaExpand, FaDatabase } from "react-icons/fa";

// Import images for Sentiment Analysis project
import dpr1 from "../assets/projects/analisis-sentimen-dpr/1.png";
import dpr2 from "../assets/projects/analisis-sentimen-dpr/2.png";
import dpr3 from "../assets/projects/analisis-sentimen-dpr/3.png";
import dpr4 from "../assets/projects/analisis-sentimen-dpr/4.png";
import dpr5 from "../assets/projects/analisis-sentimen-dpr/5.png";

// Import assets for KNF project
import knfMain from "../assets/projects/KNF/KNF.jpg";
import knfBersama from "../assets/projects/KNF/foto-bersama.jpg";
import knfPdf from "../assets/projects/KNF/katalog-knf.pdf";


interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  techStack: string[];
  images: string[];
  links: {
    live: string;
    github: string;
  };
  pdf?: string;
  icon: React.ElementType;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Sentiment Analysis of Indonesian Parliament (DPR) Issues",
    category: "Data Science",
    description: "Sentiment analysis of public discussions related to the Indonesian Parliament (DPR) on Twitter.",
    fullDescription: "This project focuses on sentiment analysis of public discussions related to the Indonesian Parliament (DPR) on Twitter. The dataset was collected through web crawling using relevant keywords to capture real-time public opinions. The workflow includes data collection, text preprocessing (cleaning and stemming), sentiment classification, and data visualization. The results are presented using charts and tables to provide insights into public perception of trending political issues on social media.",
    techStack: ["Python", "NLTK", "Scikit-learn", "Pandas", "Matplotlib"],
    images: [dpr1, dpr2, dpr3, dpr4, dpr5],
    links: { 
      live: "#", 
      github: "https://github.com/AdityaNugrahaPS/analisis-sentimen-bubarkan-dpr.git" 
    },
    icon: FaDatabase,
  },
  {
    id: 2,
    title: "Automation Device Development",
    category: "Research & Development",
    description: "Developed an automation-based device showcased at Karya Nyata Festival Vol. 6 Pekanbaru.",
    fullDescription: "Developed an automation-based device showcased at Karya Nyata Festival Vol. 6 Pekanbaru, as part of the research division in collaboration with Rumah BUMN. This project involved designing and prototyping a functional automation solution, which was presented to a public audience and stakeholders. The catalog below provides detailed information about the research and technical specifications of the development process.",
    techStack: ["IoT", "Automation", "Research", "Hardware Integration"],
    images: [knfMain, knfBersama],
    links: { 
      live: "#", 
      github: "#" 
    },
    pdf: knfPdf,
    icon: FaRobot,
  },
];

function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Gallery Component
  const ProjectGallery = ({ project }: { project: Project }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const nextImage = useCallback(() => {
      setCurrentIndex((prev) => (prev + 1) % project.images.length);
      setIsLoaded(false);
    }, [project.images.length]);

    const prevImage = useCallback(() => {
      setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
      setIsLoaded(false);
    }, [project.images.length]);

    // Keyboard navigation for gallery
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "Escape") setIsFullscreen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [nextImage, prevImage]);

    return (
      <div className="space-y-4">
        {/* Main Image Stage */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 group">
          <AnimatePresence mode="wait">
             <motion.img
              key={currentIndex}
              src={project.images[currentIndex]}
              alt={project.title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onLoad={() => setIsLoaded(true)}
              onClick={() => setIsFullscreen(true)}
              className={`w-full h-full object-cover transition-opacity duration-300 cursor-zoom-in ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <button 
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-all transform hover:scale-110 pointer-events-auto"
            >
              <FaChevronLeft />
            </button>
            <button 
               onClick={(e) => { e.stopPropagation(); setIsFullscreen(true); }}
               className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-all transform hover:scale-110 pointer-events-auto"
            >
              <FaExpand />
            </button>
            <button 
               onClick={(e) => { e.stopPropagation(); nextImage(); }}
               className="p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-all transform hover:scale-110 pointer-events-auto"
            >
              <FaChevronRight />
            </button>
          </div>
          
           {/* Loading Skeleton */}
           {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse">
                <FaExternalLinkAlt className="text-gray-400 text-3xl opacity-20" />
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {project.images.length > 1 && (
           <div className="grid grid-cols-3 gap-2 pb-2 transition-all duration-300">
             {project.images.map((img, idx) => (
               <button
                 key={idx}
                 onClick={() => setCurrentIndex(idx)}
                 className={`relative aspect-[4/3] rounded-lg overflow-hidden transition-all duration-200 ${
                   currentIndex === idx ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900 scale-105' : 'opacity-60 hover:opacity-100'
                 }`}
               >
                 <img src={img} alt="" className="w-full h-full object-cover" />
               </button>
             ))}
           </div>
        )}

        {/* Fullscreen Overlay */}
        <AnimatePresence>
            {isFullscreen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4"
                    onClick={() => setIsFullscreen(false)}
                >
                    <button
                        onClick={() => setIsFullscreen(false)}
                        className="absolute top-6 right-6 p-4 text-white hover:text-gray-300 transition-colors z-50"
                    >
                        <FaTimes className="text-2xl" />
                    </button>

                     <button 
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-6 top-1/2 -translate-y-1/2 p-4 text-white hover:text-gray-300 transition-colors z-50 hidden md:block"
                    >
                        <FaChevronLeft className="text-3xl" />
                    </button>

                    <motion.img
                        key={currentIndex + "-full"}
                        src={project.images[currentIndex]}
                        alt="Fullscreen preview"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="max-w-full max-h-screen object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />

                    <button 
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-6 top-1/2 -translate-y-1/2 p-4 text-white hover:text-gray-300 transition-colors z-50 hidden md:block"
                    >
                        <FaChevronRight className="text-3xl" />
                    </button>
                 </motion.div>
            )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-black relative overflow-hidden scroll-mt-20 transition-colors duration-300">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 dark:bg-blue-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100 dark:bg-purple-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase mb-2">Selected Work</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">Recent Projects</h3>
        </motion.div>

        <div className="grid grid-cols-3 gap-3 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedProject(project)}
              className="group bg-white dark:bg-gray-900 rounded-lg md:rounded-2xl p-2 md:p-6 shadow-sm hover:shadow-2xl border border-gray-100 dark:border-gray-800 cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col h-full"
            >
               {/* Card Thumbnail */}
               <div className="relative h-24 md:h-48 mb-3 md:mb-6 overflow-hidden rounded-lg md:rounded-xl bg-gray-100 dark:bg-gray-800">
                  <motion.img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                  />
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm p-2 rounded-full shadow-sm">
                      <project.icon className="text-blue-600 dark:text-blue-400 text-lg" />
                  </div>
               </div>
              
              <div className="flex flex-col flex-grow">
                <div className="mb-4">
                  <span className="text-[8px] font-bold text-blue-600 dark:text-blue-400 mb-1 block uppercase tracking-wider">{project.category}</span>
                  <h4 className="text-[10px] md:text-xl font-bold text-gray-900 dark:text-white mb-0.5 md:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {project.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-tight text-[8px] md:text-sm line-clamp-2 md:line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2.5 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded-md font-medium border border-gray-200 dark:border-gray-700">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                      <span className="px-2.5 py-1 text-gray-400 text-xs">+ {project.techStack.length - 3}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-y-auto relative transition-colors duration-300 flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors z-20 backdrop-blur-sm"
              >
                <FaTimes />
              </button>

              {/* Left Column: Gallery */}
              <div className="w-full md:w-3/5 p-6 md:p-8 bg-gray-50 dark:bg-black/20">
                 <ProjectGallery project={selectedProject} />
              </div>

              {/* Right Column: Content */}
              <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col h-full">
                <div className="mb-2">
                   <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                            <selectedProject.icon className="text-xl" />
                        </div>
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">{selectedProject.category}</span>
                   </div>
                   <h3 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">{selectedProject.title}</h3>
                </div>

                <div className="py-6 flex-grow">
                     <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base text-justify">
                        {selectedProject.fullDescription}
                     </p>

                     <div className="mt-8">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                             {selectedProject.techStack.map((tech) => (
                                <span key={tech} className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm">
                                    {tech}
                                </span>
                             ))}
                        </div>
                     </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-3">
                  {selectedProject.links.github !== "#" && (
                    <a 
                      href={selectedProject.links.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-black dark:bg-white text-white dark:text-black py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
                    >
                      <FaGithub className="text-xl" /> View Source Code
                    </a>
                  )}
                  {selectedProject.pdf && (
                    <a 
                      href={selectedProject.pdf} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-blue-600 text-white py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
                    >
                      <FaExternalLinkAlt className="text-lg" /> View PDF Document
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProjectsSection;
