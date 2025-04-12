import React from "react";
import { useNavigate } from "react-router-dom";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../Config/firebaseConfigs";

const SignIn = () => {
  const navigate = useNavigate();

  const handleGitHubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err: any) {
      console.error("Échec de l'authentification GitHub :", err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Connexion via GitHub
        </h2>
        <button
          onClick={handleGitHubLogin}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-md transition"
        >
          Se connecter avec GitHub
        </button>
        <p className="text-center text-sm text-gray-500 mt-4">
          L’accès est réservé aux utilisateurs GitHub autorisés.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
