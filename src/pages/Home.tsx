import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import { useEffect, useState } from "react";

const features = [
  {
    title: "CI/CD Automatisé",
    desc: "Exécutez vos tests et déploiements continus avec un pipeline intelligent.",
  },
  {
    title: "Analyse de Sécurité",
    desc: "Détectez les vulnérabilités SAST/SCA/DAST sans effort.",
  },
  {
    title: "Connexion GitHub",
    desc: "Authentifiez et récupérez les données clés de vos dépôts automatiquement.",
  },
  {
    title: "Suivi en Temps Réel",
    desc: "Visualisez l’état de vos pipelines et alertes en direct depuis le tableau de bord.",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex min-h-screen font-sans text-white overflow-hidden">
      {/* Background blurred circles */}
      <div className="absolute -top-20 -left-32 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl z-0 animate-pulse" />
      <div className="absolute -bottom-32 -right-40 w-[30rem] h-[30rem] bg-purple-700 opacity-20 rounded-full blur-3xl z-0 animate-pulse" />

      {/* LEFT SECTION */}
      <div className="relative w-full lg:w-1/2 p-6 flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Dotted grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id="dots"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        {/* Logo (unchanged) */}
        <div className="z-10 absolute top-8 left-8">
          <div className="backdrop-blur-xl rounded-full shadow-1xl p-3">
            <img
              src="/assets/DevPortalLogo.png"
              alt="DevPortal Logo"
              className="h-32 w-auto animate-pulse drop-shadow-xl hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-xl mt-24">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5 transition-opacity duration-500">
            Déployez vite. <br /> Sécurisez mieux.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 transition-all duration-500">
            DevPortal unifie vos outils CI/CD, détecte les failles de sécurité,
            et vous connecte à GitHub — en un seul endroit fluide et puissant.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-md hover:bg-gray-200 hover:scale-105 transition transform shadow-md"
          >
            <Github className="h-5 w-5 animate-bounce" />
            Connexion GitHub
          </Link>

          {/* Carousel feature */}
          <div className="mt-10 bg-gray-800 bg-opacity-40 p-5 rounded-lg transition-all duration-500 ease-in-out shadow-lg">
            <h3 className="text-lg font-semibold mb-2">
              {features[current].title}
            </h3>
            <p className="text-sm text-gray-300">{features[current].desc}</p>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gray-900">
        <img
          src="/assets/ci-preview.png"
          alt="Illustration DevSecOps"
          className="max-w-[90%] rounded-lg shadow-md transition duration-300 hover:scale-[1.02]"
        />
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full text-center text-sm text-gray-500 py-4 z-10 border-t border-gray-800">
        © {new Date().getFullYear()} DevPortal — Plateforme DevSecOps
      </footer>
    </div>
  );
}
