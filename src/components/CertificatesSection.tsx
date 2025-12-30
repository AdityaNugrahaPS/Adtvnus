import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAward, FaCalendarAlt, FaUniversity, FaTimes } from "react-icons/fa";
import { Document, Page, pdfjs } from "react-pdf";
import smapsicImg from "../assets/certification/smapsic.jpg";
import ksmImg from "../assets/certification/KSM.jpg";
import omUnriImg from "../assets/certification/OM_UNRI.jpg";
import knfImg from "../assets/certification/KNF.jpg";
import flashSoftImg from "../assets/certification/FlashSoft.jpg";
import geminiPdf from "../assets/certification/gemini.pdf";
import dicodingPythonPdf from "../assets/certification/dicoding_memulai_pemrograman_dengan_python.pdf";
import dicodingBasicAIPdf from "../assets/certification/belajar_dasar_AI.pdf";

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  link: string;
  category: string;
  image?: string;
  pdf?: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Learning Foundations of AI",
    issuer: "Dicoding Indonesia",
    date: "Oct 2025",
    description: "Acquired fundamental knowledge of Artificial Intelligence, including its history, basic concepts, and real-world applications across various industries. Credential ID: 07Z6J7W82XQR. Valid until Oct 2028.",
    link: "https://www.dicoding.com/certificates/07Z6J7W82XQR",
    category: "AI",
    pdf: dicodingBasicAIPdf
  },
  {
    id: 2,
    title: "Starting Programming with Python",
    issuer: "Dicoding Indonesia",
    date: "Aug 2025",
    description: "Learned Python fundamentals, from basic syntax to popular libraries that form the foundation for data science, machine learning, and back-end development. Credential ID: 6RPNG8R89Z2M. Valid until Aug 2028.",
    link: "https://www.dicoding.com/certificates/6RPNG8R89Z2M",
    category: "Python",
    pdf: dicodingPythonPdf
  },
  {
    id: 3,
    title: "Gemini Certified University Student",
    issuer: "Google for Education",
    date: "Oct 2025",
    description: "Certified university student proficiency in Google Gemini. Credential ID: 163322461. Valid until Oct 2028.",
    link: "https://edu.google.accredible.com/8d7c68ec-9c1f-4ebf-90a0-c69b474531cf#acc.CQWsiSmv",
    category: "AI",
    pdf: geminiPdf
  },
  {
    id: 4,
    title: "Python Programming Certification – Flashsoft Indonesia",
    issuer: "Flashsoft Indonesia",
    date: "Nov 2023",
    description: "Bootcamp Flashsoft Indonesia Batch 5 | PYTHON. Comprehensive training in Python programming fundamentals and advanced concepts.",
    link: "#",
    category: "Python",
    image: flashSoftImg
  },
  {
    id: 5,
    title: "Participant – SMANSA Padang Science Competition XVII + Jr XIII",
    issuer: "Ganesha Operation",
    date: "2022",
    description: "Pre-Olympiad of Sumatra. Credential ID: 422/0860/SMA.01/2022.",
    link: "#",
    category: "Mathematics",
    image: smapsicImg
  },
  {
    id: 6,
    title: "1st Runner-up – Integrated Mathematics – Madrasah Science Competition 2021",
    issuer: "Kementerian Agama Republik Indonesia",
    date: "Aug 2021",
    description: "District/City Level competition for Integrated Mathematics.",
    link: "#",
    category: "Mathematics",
    image: ksmImg
  },
  {
    id: 7,
    title: "2nd Runner-up Individual Math Competition (IMC) – National Level Mathematics Olympiad 22",
    issuer: "Universitas Riau",
    date: "Mar 2022",
    description: "National Level Mathematics Olympiad (OM 22). Credential ID: 10/SRTF/Panpel_OM_22/HP7/FV/KE/III/2022.",
    link: "#",
    category: "Mathematics",
    image: omUnriImg
  },
  {
    id: 8,
    title: "Automation Device Project – Karya Nyata Festival Vol. 6",
    issuer: "Rumah BUMN Riau",
    date: "Apr 2024",
    description: "Developed an automation-based device showcased at Karya Nyata Festival Vol. 6 Pekanbaru, as part of the research division in collaboration with Rumah BUMN.",
    link: "#",
    category: "IoT",
    image: knfImg
  }
];

function CertificateImage({ cert, isModal = false }: { cert: Certificate, isModal?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(isModal ? 500 : 300);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    // Small delay to ensure the modal animation hasn't affected measurements
    const timer = setTimeout(updateWidth, 100);
    
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
      clearTimeout(timer);
    };
  }, [isModal]);

  if (cert.pdf) {
    return (
      <div ref={containerRef} className={`flex items-center justify-center bg-gray-100 dark:bg-black overflow-hidden w-full ${isModal ? 'p-4' : ''}`}>
        <Document 
          file={cert.pdf}
          loading={<div className="animate-pulse bg-gray-200 dark:bg-gray-800 w-full h-[300px] md:h-[500px]" />}
        >
          <Page 
            pageNumber={1} 
            width={containerWidth > 40 ? containerWidth - (isModal ? 32 : 0) : 300}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="shadow-xl"
          />
        </Document>
      </div>
    );
  }
  
  if (cert.image) {
    return (
      <img 
        src={cert.image} 
        alt={cert.title}
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isModal ? 'rounded-lg shadow-lg' : ''}`}
      />
    );
  }

  return (
    <div className="w-full h-full min-h-[200px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400">
      <FaAward className={isModal ? "text-8xl" : "text-5xl"} />
    </div>
  );
}

function CertificatesSection() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="py-24 bg-white dark:bg-black relative overflow-hidden scroll-mt-20 transition-colors duration-300">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent dark:from-blue-900/10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase mb-2">Notable Achievements</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">Certificates</h3>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedCert(cert)}
              className="group bg-white dark:bg-gray-900 rounded-lg md:rounded-[20px] overflow-hidden border border-gray-100 dark:border-gray-800/50 hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2 flex flex-col h-full cursor-pointer"
            >
              {/* Image Container with Fixed Aspect Ratio */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
                <CertificateImage cert={cert} />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/90 dark:bg-black/80 px-4 py-2 rounded-full text-xs font-bold text-gray-900 dark:text-white backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      View Certificate
                    </span>
                </div>
              </div>

              <div className="p-2 md:p-6 flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-2 md:mb-4">
                  <span className="text-[8px] md:text-[10px] font-bold text-blue-600 dark:text-blue-400 px-1.5 md:px-2.5 py-0.5 md:py-1 bg-blue-50/50 dark:bg-blue-900/10 rounded-full uppercase tracking-wider">
                    {cert.category}
                  </span>
                  <div className="text-gray-400 dark:text-gray-600">
                    <FaAward className="text-sm md:text-lg" />
                  </div>
                </div>

                <div className="flex-grow space-y-1.5 md:space-y-3">
                  <h4 className="text-[10px] md:text-lg font-bold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 min-h-[1.5rem] md:min-h-[3.5rem]">
                    {cert.title}
                  </h4>
                  
                  <div className="space-y-1 md:space-y-2">
                    <div className="flex items-center text-[8px] md:text-sm text-gray-600 dark:text-gray-400 gap-1.5 md:gap-2.5">
                      <FaUniversity className="text-blue-500/60 dark:text-blue-400/60 scale-75 md:scale-100" />
                      <span className="truncate">{cert.issuer}</span>
                    </div>
                    <div className="flex items-center text-[8px] md:text-xs text-gray-500 dark:text-gray-500 gap-1.5 md:gap-2.5">
                      <FaCalendarAlt className="opacity-60 scale-75 md:scale-100" />
                      <span>{cert.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors z-20 backdrop-blur-sm"
              >
                <FaTimes />
              </button>
              
              <div className="flex flex-col md:flex-row">
                <div className="md:w-3/5">
                  <CertificateImage cert={selectedCert} isModal={true} />
                </div>
                <div className="md:w-2/5 p-8 flex flex-col justify-center">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">{selectedCert.category}</span>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">{selectedCert.title}</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 gap-2">
                       <FaUniversity /> <span>{selectedCert.issuer}</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-500 gap-2">
                       <FaCalendarAlt /> <span>{selectedCert.date}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                     {selectedCert.description}
                  </p>
                  {selectedCert.link !== "#" && (
                    <a 
                      href={selectedCert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold text-center hover:opacity-90 transition-opacity shadow-lg"
                    >
                      Verify Credential
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

export default CertificatesSection;
