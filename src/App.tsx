import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ProfilePage from "./components/profile";
import LandingPage from "./components/landing/LandingPage";
import ProjectsPage from "./pages/ProjectsPage";
import routes from "tempo-routes";
import AuthContext from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <AuthContext>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </AuthContext>
  );
}

export default App;
