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

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* ✅ Default Redirect */}
        <Route path="/" element={<Navigate to="/landing" replace />} />

        {/* ✅ Public Routes */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/auth/:mode" element={<AuthPage />} />
        <Route path="/about" element={<About />} />

        {/* ✅ Protected User Routes */}
        <Route
          path="/booknow"
          element={
            <PrivateRoute>
              <BookNow />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PrivateRoute>
              <Register />
            </PrivateRoute>
          }
        />
        <Route
          path="/book-trek"
          element={
            <PrivateRoute>
              <BookTrekPage />
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
