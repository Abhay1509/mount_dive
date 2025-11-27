import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import BookTrekPage from "./pages/LoggedInUser/BookTrekPage";
import AdminTreksPage from "./pages/AdminTreksPage";
import About from "./pages/LoggedInUser/About";
import BookNow from "./pages/LoggedInUser/BookNow";
import Register from "./pages/LoggedInUser/Register";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import ScrollToTop from "./pages/ScrollToTop";
import Profile from "./pages/LoggedInUser/Profile.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import PreviousTreks from "./pages/LoggedInUser/LoggedInComponents/PreviousTreks.jsx";
import UpcomingTreks from "./pages/LoggedInUser/LoggedInComponents/UpcomingTreks.jsx";

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* ✅ Default Redirect */}
        <Route path="/" element={<Navigate to="/landing" replace />} />

        {/* ✅ Public Routes */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/auth/:mode" element={<AuthPage />} />
        <Route path="/about" element={<About />} />

        {/* ✅ Protected User Routes */}

        <Route
          path="/register"
          element={
            <PrivateRoute>
              <Register />
            </PrivateRoute>
          }
        />
        <Route
          path="/gallery"
          element={
            <PrivateRoute>
              <GalleryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/previous-treks"
          element={
            <PrivateRoute>
              <PreviousTreks />
            </PrivateRoute>
          }
        />
        <Route
          path="/upcoming-treks"
          element={
            <PrivateRoute>
              <UpcomingTreks />
            </PrivateRoute>
          }
        />
        <Route
          path="/book-trek"
          element={
           
              <BookTrekPage />
           
          }
        />
        <Route
          path="/book-now/:id"
          element={
            <PrivateRoute>
              <BookNow />
            </PrivateRoute>
          }
        />
        <Route
          path="/Profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* ✅ Admin-only route */}
        <Route
          path="/admin/treks"
          element={
            <PrivateRoute adminOnly>
              <AdminTreksPage />
            </PrivateRoute>
          }
        />

        {/* ✅ Catch-All 404 (must stay last) */}
        <Route
          path="*"
          element={<h1 className="text-center mt-10">404 - Page Not Found</h1>}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
