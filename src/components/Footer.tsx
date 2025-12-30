function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-gray-800 py-12 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Aditya Nugraha Pratama Saiya</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Designed with minimalist precision.</p>
        </div>
        
        <div className="flex space-x-6">
           <a href="https://github.com/AdityaNugrahaPS" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white transition-colors text-sm">GitHub</a>
           <a href="https://www.linkedin.com/in/adityanugrahapratamasaiya/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white transition-colors text-sm">LinkedIn</a>
           <a href="https://www.instagram.com/adtvnus?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white transition-colors text-sm">Instagram</a>
        </div>
      </div>
      <div className="text-center text-gray-400 dark:text-gray-600 text-xs mt-10">
        &copy; {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
