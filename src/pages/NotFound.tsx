import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6">
      {/* Logo DevPortal en haut */}
      <div className="absolute top-8 left-8 flex items-center gap-2">
        <img
          src="/assets/DevPortalLogo.png"
          alt="DevPortal"
          className="h-10 animate-pulse"
        />
        <span className="text-xl font-semibold text-gray-800">DevPortal</span>
      </div>

      {/* Erreur visuelle */}
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8">
        La page que vous cherchez n’existe pas.
      </p>

      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        ← Retour à l’accueil
      </Link>

      <p className="text-sm text-gray-400 mt-8">
        Si le problème persiste, contactez l’administrateur DevPortal.
      </p>
    </div>
  );
}
