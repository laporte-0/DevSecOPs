import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Pipelines from "./pages/Pipelines";
import Insights from "./pages/Insights";
import Settings from "./pages/Settings";
import Chatbot from "./pages/Chatbot";
import SignIn from "./components/Auth/SignIn";
// import PrivateRoute from "./routes/PrivateRoutes"; // 👈 non utilisé pour l'instant
import { AuthProvider } from "./Contexts/AuthContext";
import Organizations from "./pages/Organisations";
import OrganizationDetails from "./pages/OrganisationsDetails";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PluginDetailsPage from "./pages/PluginDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* 🌐 Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />

          {/* 🔓 Accès direct aux pages du dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pipelines" element={<Pipelines />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route
            path="/organizations/:orgId"
            element={<OrganizationDetails />}
          />
          <Route path="/profile" element={<Profile />} />

          {/* 🔍 Vue détaillée plugin */}
          <Route path="/plugin/:pluginName" element={<PluginDetailsPage />} />

          {/* 🧭 Page 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
