// src/data/mockPlugins.ts
export const pluginData = [
    {
      name: "SAST",
      passed: 12,
      failed: 3,
      description: "Analyse statique du code source pour détecter les vulnérabilités.",
      logs: ["src/app.js: SQL Injection", "src/utils/crypto.ts: Hardcoded secret"],
    },
    {
      name: "DAST",
      passed: 8,
      failed: 5,
      description: "Analyse dynamique des applications exécutées.",
      logs: ["XSS detected on /login", "Unsecured redirect on /redirect"],
    },
    {
      name: "SCA",
      passed: 15,
      failed: 2,
      description: "Analyse des composants open-source et des dépendances.",
      logs: ["express@4.17.1: known vulnerability", "lodash <4.17.21: CVE-2020-8203"],
    },
  ];
  