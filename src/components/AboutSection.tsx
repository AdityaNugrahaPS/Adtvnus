import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCode, FaRobot, FaBrain, FaDatabase } from "react-icons/fa";

const skills = [
  { name: "Artificial Intelligence", icon: FaBrain },
  { name: "Machine Learning", icon: FaRobot },
  { name: "Deep Learning", icon: FaCode },
  { name: "Data Science", icon: FaDatabase },
];

function AboutSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % skills.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="about"
      className="py-24 bg-white dark:bg-black relative overflow-hidden scroll-mt-20 transition-colors duration-300"
    >
      {/* Ambient Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Animated Skills */}
          <div className="relative flex flex-col items-center justify-center h-[500px] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={skills[index].name}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                {/* Large Icon */}
                <div className="p-12 mb-8 rounded-full bg-gray-50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-100 dark:border-gray-800 shadow-2xl">
                    {(() => {
                        const Icon = skills[index].icon;
                        return <Icon className="text-9xl md:text-[12rem] text-gray-800 dark:text-gray-200" />;
                    })()}
                </div>

                {/* Text Label */}
                <h3 className="text-3xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-200 dark:to-gray-400 pb-2">
                  {skills[index].name}
                </h3>
              </motion.div>
            </AnimatePresence>
            
             {/* Decorative Background for Animation */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 blur-[100px] rounded-full" />
          </div>

          {/* Right: Content */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >


              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight mb-6">
                Turning abstract concepts into{" "}
                <span className="text-gray-400 dark:text-gray-600">
                  structured, testable systems.
                </span>
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-light mb-4">
                I approach technical problems with a problem-first mindset.
                Instead of starting from tools or trends, I focus on understanding
                the data, constraints, and real-world context behind each case.
              </p>

              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                My workflow emphasizes experimentation and reasoning — breaking
                models, analyzing failures, and refining solutions until they are
                both mathematically sound and practically useful.
              </p>
            </motion.div>

            {/* GPA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">GPA</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">3.71 <span className="text-gray-400 text-lg">/ 4.00</span></span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
