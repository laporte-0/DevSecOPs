import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../Config/firebaseConfigs";
import { storeUserData } from "../../hooks/storeUserInfo";



const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGitHubLogin = async () => {
    try {
      setLoading(true);
      const provider = new GithubAuthProvider();
      provider.setCustomParameters({ allow_signup: "true" });

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const credential = GithubAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken || "";

      // ✅ Store tokens in session
      sessionStorage.setItem("githubAccessToken", accessToken);
      sessionStorage.setItem("githubUsername", user.providerData[0]?.uid || "");

      // Optional Firebase token (if you need it later)
      const idToken = await user.getIdToken();
      sessionStorage.setItem("firebaseIdToken", idToken);

      // ✅ Send API call to backend with tokens
      const response = await fetch("http://localhost:3000/api/users/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`
        },
        body: JSON.stringify({ accessToken })
      });

      // ✅ Save returned userData in localStorage
      if (response.ok) {
        const userData = await response.json();
        console.log(userData)
        await storeUserData();
        navigate("/app");
      } else {
        console.error("Failed to fetch user data from backend.");

      }

      navigate("/dashboard"); // ✅ Redirige vers dashboard layout protégé
    } catch (err: any) {
      console.error("Échec de l'authentification GitHub :", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Branding */}
      <div className="w-1/2 bg-gray-900 text-white flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800/30 via-transparent to-purple-900/30 z-0" />
        <div className="absolute left-5 z-10 flex items-center gap-3">
          <img
            src="/assets/DevPortalLogo.png"
            alt="DevPortal Logo"
            className="h-40 w-auto animate-pulse"
          />
        </div>

        <div className="flex-1 flex items-center justify-center z-10">
          <div className="text-center px-8">
            <h1 className="text-5xl font-bold leading-tight mb-4">
              &gt;build <br /> something <br /> great.
            </h1>
            <p className="text-gray-300 text-lg">
              Votre tableau de bord DevSecOps, sécurisé, connecté, élégant.
            </p>
          </div>
        </div>

        <footer className="flex justify-between items-center text-sm text-gray-400 p-10 z-10">
          <div className="space-x-4">
            <a href="#" className="hover:underline">
              Conditions
            </a>
            <a href="#" className="hover:underline">
              Politique
            </a>
            <a href="#" className="hover:underline">
              Cookies
            </a>
          </div>
          <span className="text-xs">
            © {new Date().getFullYear()} DevPortal
          </span>
        </footer>
      </div>

      {/* Connexion GitHub */}
      <div className="w-1/2 bg-white flex items-center justify-center p-10 relative">
        <div className="absolute bottom-0 right-0 h-24 w-24 bg-green-400 rounded-tl-3xl" />

        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow-xl p-8 z-10">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Se connecter à DevPortal
          </h2>

          <button
            onClick={handleGitHubLogin}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium text-white transition duration-300 ${
              loading
                ? "bg-gray-700 opacity-70 cursor-not-allowed"
                : "bg-gray-900 hover:bg-gray-800 hover:scale-[1.02]"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                  />
                </svg>
                Connexion en cours...
              </>
            ) : (
              <>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.2 11.39c.6.11.8-.26.8-.58v-2.28c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.53-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.47 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.2.7.8.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z"
                    clipRule="evenodd"
                  />
                </svg>
                Se connecter avec GitHub
              </>
            )}
          </button>

          <p className="text-xs text-center text-gray-500 mt-4">
            En vous connectant, vous acceptez nos{" "}
            <a href="#" className="underline">
              conditions
            </a>{" "}
            et notre{" "}
            <a href="#" className="underline">
              politique de confidentialité
            </a>
            .
          </p>

          <p className="text-center text-sm text-gray-500 mt-6">
            <a href="/" className="text-blue-600 hover:underline">
              ← Retour à l’accueil
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
