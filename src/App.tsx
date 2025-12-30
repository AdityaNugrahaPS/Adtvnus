import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ResumePage from "./pages/ResumePage";
import { ThemeProvider } from "./context/ThemeContext";


function MainLayout() {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen font-sans transition-colors duration-300 flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
         <Routes>
           {/* Public Routes */}
           <Route element={<MainLayout />}>
             <Route path="/" element={<HomePage />} />
             <Route path="/resume" element={<ResumePage />} />
           </Route>


         </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
