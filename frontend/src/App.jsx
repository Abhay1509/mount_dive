import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import TrekCards from "./pages/TrekCards";
import About from "./pages/About";
import OurStory from "./pages/OurStory";
import BookNow from "./pages/BookNow";
import ScrollToTop from "./pages/ScrollToTop";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext";

function App() {
  return (
    <>
      <ScrollToTop /> {/* ✅ Keep this */}
      <Routes>
        <Route
          path="*"
          element={<h1 className="text-center mt-10">404 - Page Not Found</h1>}
        />
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/ourstory" element={<OurStory />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/trekcards" element={<TrekCards />} />
        <Route path="/booknow" element={<BookNow />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/:mode" element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;
