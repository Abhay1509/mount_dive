import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <Routes>
      <Route
        path="*"
        element={<h1 className="text-center mt-10">404 - Page Not Found</h1>}
      />

      <Route path="/" element={<Navigate to="/landing" replace />} />
      <Route path="/landing" element={<LandingPage />} />

      {/* Single dynamic route for Auth */}
      <Route path="/auth/:mode" element={<AuthPage />} />
    </Routes>
  );
}

export default App;
