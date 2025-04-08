src/
├── auth/ # Fichiers liés à l'authentification (providers, guards)
│ └── AuthProvider.tsx
│
├── components/ # Composants réutilisables
│ ├── Auth/ # Composants de formulaire d'authentification
│ │ ├── SignIn.tsx
│ │ ├── SignUp.tsx
│ │ └── UserMenu.tsx
│ └── Layout/ # Composants de layout général (Header, Sidebar, etc.)
│ ├── Header.tsx
│ ├── MainLayout.tsx
│ ├── Sidebar.tsx
│ ├── ActivitySection.tsx
│ ├── ChatbotPanel.tsx
│ ├── OverviewSection.tsx
│ ├── ScanHistorySection.tsx
│ ├── SecurityScore.tsx
│ └── VulnerabilitySection.tsx
│
├── config/ # Fichiers de configuration externes
│ └── firebase.ts # Configuration Firebase
│
├── contexts/ # Contextes React globaux
│ └── AuthContext.tsx
│
├── hooks/ # Custom hooks
│ └── useAuth.ts
│
├── pages/ # Pages de l'application
│ ├── Chatbot.tsx
│ ├── Dashboard.tsx
│ ├── Home.tsx # Optionnel : page d'accueil publique ou redondante avec Dashboard
│ ├── Insights.tsx
│ ├── Login.tsx
│ ├── Register.tsx
│ ├── Pipelines.tsx
│ └── Settings.tsx
│
├── routes/ # Gestion des routes protégées
│ └── PrivateRoutes.tsx
│
├── services/ # Services externes (API, Firebase, etc.)
│ └── firebase.ts
│
├── types/ # Types TypeScript globaux (optionnel)
│ └── index.ts
│
├── App.tsx # Point d'entrée de l'application
├── main.tsx # Point de montage ReactDOM
└── vite-env.d.ts # Fichier de type auto-généré par Vite
