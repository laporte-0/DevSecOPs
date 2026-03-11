# DevSecOps Platform

A web-based DevSecOps dashboard for monitoring security vulnerabilities, CI/CD pipelines, and GitHub activity — built with React, TypeScript, and Firebase.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss)

## Features

- **Dashboard** — Overview of projects, security scores, and recent activity
- **Vulnerability Tracking** — Monitor and manage security vulnerabilities
- **Pipeline Monitoring** — Track CI/CD pipeline status and history
- **GitHub Integration** — Activity calendar, language breakdown, repository list, and star charts
- **Insights** — Security analytics and scan history
- **Organizations** — Manage and view organization-level data
- **AI Chatbot** — Built-in assistant for DevSecOps guidance
- **Authentication** — Firebase-based auth with GitHub sign-in
- **Dark Mode** — Toggle between light and dark themes

## Tech Stack

| Layer       | Technology                      |
| ----------- | ------------------------------- |
| Framework   | React 18 + TypeScript           |
| Build       | Vite 5                          |
| Styling     | Tailwind CSS 3                  |
| Routing     | React Router 6                  |
| Auth / DB   | Firebase (Auth + Firestore)     |
| Charts      | Recharts                        |
| Icons       | Lucide React                    |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Firebase project with Authentication and Firestore enabled
- A GitHub personal access token (for GitHub integration features)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/devsecops-platform.git
cd devsecops-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your Firebase and GitHub credentials in .env

# Start the development server
npm run dev
```

## Project Structure

```
src/
├── auth/            # Auth provider
├── components/      # Reusable UI components
│   ├── Auth/        # Sign-in, user menu
│   └── Layout/      # Header, sidebar, main layout
├── Config/          # Firebase configuration
├── Contexts/        # React contexts (auth)
├── hooks/           # Custom hooks (auth, GitHub data)
├── pages/           # Route pages
├── routes/          # Route guards (private routes)
└── services/        # Data services & mocks
```

## Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start dev server             |
| `npm run build`   | Production build             |
| `npm run preview` | Preview production build     |
| `npm run lint`    | Run ESLint                   |

## License

[MIT](LICENSE)
