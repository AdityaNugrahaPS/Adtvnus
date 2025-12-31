import { motion } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import resumePath from "../assets/file/Adit_Resume.pdf";
import { useState, useEffect, useRef } from "react";
import { FaDownload } from "react-icons/fa";

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

function ResumeSection() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState(800);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  // Handle container resize
  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth - 48); // adjustment for padding
      }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set up intersection observer for page tracking
  useEffect(() => {
    if (!numPages) return;

    const options = {
      root: containerRef.current,
      rootMargin: "0px",
      threshold: 0.5 // Trigger when 50% of page is visible
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const pageNum = parseInt(entry.target.getAttribute('data-page-number') || '1');
          setPageNumber(pageNum);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, options);

    const pages = document.querySelectorAll('.pdf-page');
    pages.forEach(page => observerRef.current?.observe(page));

    return () => {
        observerRef.current?.disconnect();
    };
  }, [numPages, containerWidth]); // Re-run when pages are rendered

  return (
    <section id="resume" className="pt-24 min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 pb-24">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase mb-2">My Background</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">Professional Resume</h3>
        </motion.div>

        {/* Top Controls: Download only */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-end mb-6"
        >
          <motion.a
            href={resumePath}
            download="Aditya_Resume.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium shadow-sm hover:shadow-md transition-all flex items-center gap-2 text-sm"
          >
            <FaDownload />
            Download PDF
          </motion.a>
        </motion.div>

        {/* Status Bar */}
        <div className="flex justify-center mb-4">
             <span className="px-4 py-2 bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm">
                Page {pageNumber} of {numPages || '--'}
             </span>
        </div>

        {/* PDF Container */}
        <motion.div
            id="pdf-container"
            ref={containerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full bg-gray-200 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-auto h-[75vh] flex justify-center p-4 no-scrollbar"
        >
            <Document
                file={resumePath}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                    </div>
                }
                error={
                    <div className="flex flex-col items-center justify-center h-full text-center text-red-500">
                        <p>Failed to load PDF.</p>
                        <a href={resumePath} download className="underline mt-2">Download File</a>
                    </div>
                }
                className="flex flex-col gap-8"
            >
                {numPages && Array.from(new Array(numPages), (_, index) => (
                    <div 
                        key={`page_${index + 1}`} 
                        className="pdf-page" 
                        data-page-number={index + 1}
                    >
                        <Page 
                            pageNumber={index + 1} 
                            width={containerWidth > 800 ? 800 : containerWidth}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            className="shadow-lg"
                        />
                    </div>
                ))}
            </Document>
        </motion.div>

      </div>
    </section>
  );
}



export default ResumeSection;

