import React from "react";

interface Props {
  plugin: {
    name: string;
    passed: number;
    failed: number;
    description: string;
  };
  onClose: () => void;
}

const PluginDetailsModal: React.FC<Props> = ({ plugin, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          🔍 Détails du plugin : {plugin.name}
        </h2>

        <p className="mb-3 text-gray-700 dark:text-gray-300">
          {plugin.description}
        </p>

        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>✔️ Tests passés : {plugin.passed}</li>
          <li>❌ Tests échoués : {plugin.failed}</li>
        </ul>

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default PluginDetailsModal;
