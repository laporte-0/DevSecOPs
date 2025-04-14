import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Pipelines from "./pages/Pipelines";
import Insights from "./pages/Insights";
import Settings from "./pages/Settings";
import Chatbot from "./pages/Chatbot";
import SignIn from "./components/Auth/SignIn";
import PrivateRoute from "./routes/PrivateRoutes";
import { AuthProvider } from "./Contexts/AuthContext";
import Organizations from "./pages/Organisations";
import OrganizationDetails from "./pages/OrganisationsDetails";
import Profile from "./pages/Profile";
import Home from "./pages/Home"; // 🆕 Import de la page d’accueil
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* 🏠 Page d’accueil publique */}
          <Route path="/" element={<Home />} />

          {/* 🔐 Authentification */}
          <Route path="/login" element={<SignIn />} />

          {/* 🔒 Routes protégées (layout) */}
          <Route
            path="/app"
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="pipelines" element={<Pipelines />} />
            <Route path="insights" element={<Insights />} />
            <Route path="settings" element={<Settings />} />
            <Route path="chatbot" element={<Chatbot />} />
            <Route path="organizations" element={<Organizations />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="organizations/:orgId"
              element={<OrganizationDetails />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
