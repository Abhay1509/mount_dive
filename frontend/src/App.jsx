import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
<<<<<<< Updated upstream
import BookTrekPage from "./pages/LoggedInUser/BookTrekPage";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
=======
import TrekCards from "./pages/TrekCards";
import About from "./pages/About";
import OurStory from "./pages/OurStory";
import BookNow from "./pages/BookNow";
import ScrollToTop from "./pages/ScrollToTop";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <ScrollToTop /> {/* ✅ Keep this */}
>>>>>>> Stashed changes
      <Routes>
        <Route
          path="*"
          element={<h1 className="text-center mt-10">404 - Page Not Found</h1>}
        />
        <Route path="/" element={<Navigate to="/landing" replace />} />
<<<<<<< Updated upstream
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/auth/:mode" element={<AuthPage />} />

        {/* Protected Book Trek page */}
        <Route
          path="/book-trek"
          element={
            <PrivateRoute>
              <BookTrekPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
=======
        <Route path="/about" element={<About />} />
        <Route path="/ourstory" element={<OurStory />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/trekcards" element={<TrekCards />} />
        <Route path="/booknow" element={<BookNow />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/:mode" element={<AuthPage />} />
      </Routes>
    </>
>>>>>>> Stashed changes
  );
}

export default App;
