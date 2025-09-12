import { Routes, Route, Navigate } from "react-router-dom";
import CustomizePage from "./pages/CustomizePage";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import TrekList from "./pages/TrekList";

function App() {
  return (
    <Routes>
      {/* Default redirect from "/" → "/home" */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      
      <Route path="/home" element={<Home />} />
      <Route path="/treks" element={<TrekList />} />
      {/* <Route path="/customize/:trekId" element={<CustomizePage />} /> */}
      {/* <Route path="/admin" element={<Admin />} /> */}
    </Routes>
  );
}

export default App;
