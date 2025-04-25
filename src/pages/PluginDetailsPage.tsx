import { useParams, useNavigate } from "react-router-dom";
import PluginChart from "../components/plugins/PluginChart"; // 👈

import {
  CheckCircle,
  XCircle,
  BarChart3,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";

const pluginMock = {
  sast: {
    name: "SAST",
    description: "Analyse statique du code source.",
    details: [
      { title: "Tests analysés", value: 18 },
      { title: "Réussis", value: 15 },
      { title: "Échoués", value: 3 },
      { title: "Taux de réussite", value: "83%" },
    ],
    status: "warning",
    recommendations: [
      "Corriger les injections possibles dans /auth.controller.js",
      "Améliorer les validations dans /utils/validator.ts",
    ],
  },
  dast: {
    name: "DAST",
    description: "Analyse dynamique en environnement d'exécution.",
    details: [
      { title: "Tests lancés", value: 20 },
      { title: "Réussis", value: 18 },
      { title: "Échoués", value: 2 },
      { title: "Taux de réussite", value: "90%" },
    ],
    status: "secure",
    recommendations: [],
  },
  sca: {
    name: "SCA",
    description: "Analyse des dépendances open-source.",
    details: [
      { title: "Packages scannés", value: 42 },
      { title: "Failles détectées", value: 5 },
      { title: "Corrections possibles", value: 4 },
    ],
    status: "critical",
    recommendations: [
      "Mettre à jour express@4.17.1 → 4.18.2",
      "Remplacer lodash obsolète",
    ],
  },
};

const statusColors: Record<string, string> = {
  secure: "text-green-600",
  warning: "text-yellow-500",
  critical: "text-red-600",
};

const statusIcons: Record<string, JSX.Element> = {
  secure: <CheckCircle className="h-6 w-6 text-green-600" />,
  warning: <AlertTriangle className="h-6 w-6 text-yellow-500" />,
  critical: <XCircle className="h-6 w-6 text-red-600" />,
};

export default function PluginDetailsPage() {
  const { pluginName } = useParams();
  const navigate = useNavigate();
  const plugin = pluginMock[pluginName as keyof typeof pluginMock];

  if (!plugin) {
    return (
      <div className="p-6 text-center text-red-500 font-semibold">
        Plugin introuvable 🚫
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 text-gray-800 dark:text-gray-100">
      {/* Retour */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm mb-2"
      >
        <ArrowLeft className="w-4 h-4" /> Retour au dashboard
      </button>

      {/* Header plugin */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{plugin.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {plugin.description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {statusIcons[plugin.status]}
          <span className={`font-semibold ${statusColors[plugin.status]}`}>
            {plugin.status === "secure"
              ? "Sécurisé"
              : plugin.status === "warning"
              ? "Avertissements"
              : "Critique"}
          </span>
        </div>
      </div>

      {/* Détails */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 shadow">
        {plugin.details.map((item, i) => (
          <div
            key={i}
            className="flex justify-between border-b pb-2 last:border-none text-sm"
          >
            <span className="text-gray-500 dark:text-gray-400">
              {item.title}
            </span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Recommandations */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 shadow">
        <h3 className="text-lg font-bold mb-2">🛠️ Recommandations</h3>
        {plugin.recommendations.length > 0 ? (
          <ul className="list-disc pl-5 text-sm space-y-1 text-gray-300">
            {plugin.recommendations.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-green-500">Aucune action requise ✅</p>
        )}
      </div>
      <PluginChart pluginName={plugin.name} />
    </div>
  );
}
