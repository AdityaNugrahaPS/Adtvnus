import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaBrain, FaRobot, FaCode, FaDatabase, FaGraduationCap } from "react-icons/fa";

const roles: string[] = [
  "Informatics Engineering Student",
  "Data Science & AI Enthusiast",
  "Robotics & IoT Enthusiast",
  "Machine Learning Student Researcher"
];

const skills = [
  { name: "Artificial Intelligence", icon: FaBrain },
  { name: "Machine Learning", icon: FaRobot },
  { name: "Deep Learning", icon: FaCode },
  { name: "Data Science", icon: FaDatabase },
];

function HeroSection() {
  const [roleIndex, setRoleIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 px-6 pt-20 transition-colors duration-300">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left space-y-6"
        >
          <h2 className="text-gray-500 dark:text-gray-400 font-medium text-lg tracking-wide uppercase">Hello, I'm</h2>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black dark:text-white leading-tight">
            Aditya Nugraha <br /> Pratama Saiya
          </h1>
          
          {/* Rotating Roles */}
          <div className="h-10 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-medium absolute"
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* University & GPA Badge */}
          <div className="flex flex-wrap items-center gap-3">
             <div className="px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium flex items-center gap-2 border border-blue-100 dark:border-blue-800">
                <FaGraduationCap className="text-lg" />
                <span>Universitas Riau</span>
                <span className="w-1 h-1 rounded-full bg-blue-300 dark:bg-blue-600" />
                <span>GPA 3.71</span>
             </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-lg">
            An Informatics Engineering student exploring AI, robotics, and machine learning to turn complex ideas into real-world digital solutions.
          </p>

          {/* Skills Chips */}
          <div className="flex flex-wrap gap-3 py-2">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 cursor-default hover:bg-white dark:hover:bg-black transition-colors"
              >
                <skill.icon className="text-blue-500 dark:text-blue-400" />
                {skill.name}
              </div>
            ))}
          </div>

          <div className="flex space-x-6 pt-4">
             {[
               { Icon: FaGithub, href: "https://github.com/AdityaNugrahaPS" },
               { Icon: FaLinkedin, href: "https://www.linkedin.com/in/adityanugrahapratamasaiya/" },
               { Icon: FaInstagram, href: "https://www.instagram.com/adtvnus?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" }
             ].map(({ Icon, href }, idx) => (
               <motion.a 
                 key={idx}
                 href={href}
                 target="_blank"
                 rel="noopener noreferrer"
                 whileHover={{ scale: 1.1 }}
                 className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors text-2xl"
               >
                 <Icon />
               </motion.a>
             ))}
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="relative flex justify-center"
        >
          <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-gray-100 dark:border-gray-800">
            <img 
              src="/profile.jpeg" 
              alt="Aditya Nugraha Pratama Saiya" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default HeroSection;
