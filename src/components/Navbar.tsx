
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useLocation, useNavigate } from "react-router-dom";

const navLinks: { name: string; id: string; type: "section" | "route"; path?: string }[] = [
  { name: "Home", id: "home", type: "section" },
  { name: "Projects", id: "projects", type: "section" },
  { name: "Certificates", id: "certificates", type: "section" },
  { name: "Resume", id: "resume", type: "section" },
];

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const location = useLocation();
  const navigate = useNavigate();

  // Handle Navbar Scroll Background Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);




  // Scroll Spy Logic using IntersectionObserver
  useEffect(() => {
    if (location.pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        // rootMargin determines when a section is considered "active"
        // A more balanced margin (e.g., -30% from top and bottom) 
        // ensures the section is detected when it's in the middle of the screen.
        rootMargin: "-30% 0px -30% 0px" 
      }
    );

    navLinks.forEach((link) => {
      if (link.type === "section") {
        const el = document.getElementById(link.id);
        if (el) observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNavigation = async (link: typeof navLinks[0]) => {
    setMobileMenuOpen(false);

    if (link.type === "route") {
      navigate(link.path!);
      return;
    }

    if (link.type === "section") {
      if (location.pathname !== "/") {
        await navigate("/");
        // Wait for navigation to complete then scroll
        setTimeout(() => {
             scrollToSection(link.id);
        }, 100);
      } else {
        scrollToSection(link.id);
      }
    }
  };

  const scrollToSection = (id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection(id);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      const navbarHeight = 80;
      const elementRect = el.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const elementHeight = elementRect.height;
      const viewportHeight = window.innerHeight;

      let targetPosition;

      // If the element fits within the viewport (minus navbar), center it
      if (elementHeight < (viewportHeight - navbarHeight)) {
        targetPosition = absoluteElementTop - ((viewportHeight - elementHeight) / 2);
      } else {
        // Otherwise, align to top with navbar offset
        targetPosition = absoluteElementTop - navbarHeight;
      }

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
      
      setActiveSection(id);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled || location.pathname !== "/"
            ? "bg-white/80 dark:bg-black/40 backdrop-blur-lg dark:backdrop-blur-xl border-gray-200/50 dark:border-gray-800 shadow-[0_2px_10px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] py-4"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white cursor-pointer"
            onClick={() => handleNavigation(navLinks[0])}
          >
            Aditya<span className="text-gray-400">.</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavigation(link)}
                className={`relative text-sm font-medium transition-colors duration-300 hover:text-black dark:hover:text-white ${
                  activeSection === link.id ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-300"
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-black dark:bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}

            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                aria-label="Toggle Theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'dark' ? <FaMoon className="text-lg" /> : <FaSun className="text-lg" />}
                  </motion.div>
                </AnimatePresence>
              </button>


            </div>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-4">
             <button
                onClick={toggleTheme}
                className="p-2 text-gray-900 dark:text-white focus:outline-none"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                     {theme === 'dark' ? <FaMoon className="text-lg" /> : <FaSun className="text-lg" />}
                  </motion.div>
                </AnimatePresence>
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-gray-900 dark:text-white focus:outline-none"
            >
              <FaBars className="text-xl" />
            </button>
          </div>
        </div>
        
        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-blue-500 dark:bg-blue-400 origin-left"
          style={{ scaleX }}
        />
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white/95 dark:bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center transition-colors duration-300"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-4 text-gray-900 dark:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <FaTimes className="text-2xl" />
            </button>

            <motion.div 
              className="flex flex-col items-center space-y-8"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
            >
              {navLinks.map((link) => (
                <motion.button
                  key={link.name}
                  onClick={() => handleNavigation(link)}
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: 20, opacity: 0 }
                  }}
                  className={`text-3xl font-bold tracking-tight transition-colors ${
                    activeSection === link.id ? "text-black dark:text-white" : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}
              

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
