import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import BookTrekPage from "./pages/LoggedInUser/BookTrekPage";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="*"
          element={<h1 className="text-center mt-10">404 - Page Not Found</h1>}
        />
        <Route path="/" element={<Navigate to="/landing" replace />} />
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
  );
}

export default App;
