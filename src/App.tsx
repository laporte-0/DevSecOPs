import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Pipelines from "./pages/Pipelines";
import Insights from "./pages/Insights";
import Settings from "./pages/Settings";
import Chatbot from "./pages/Chatbot";
import SignIn from "./components/Auth/SignIn";
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoutes";
import { AuthProvider } from "./Contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Auth pages (no layout) */}
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes wrapped with layout */}
          <Route
            path="/"
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
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
