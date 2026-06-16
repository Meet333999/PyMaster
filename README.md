# 🐍 PyMaster — Learn Python the Fun Way

PyMaster is a premium, gamified Python learning platform inspired by coddy.tech. It is built as a fast, client-side Single Page Application (SPA) with in-browser Python code execution (via WebAssembly) and real-time database synchronization.

## 🚀 Key Features

- **In-Browser Python Runner**: Execute Python code directly in your browser using Pyodide (WASM) without any backend server.
- **Monaco Code Editor**: Fully integrated Monaco Editor (VS Code's editor engine) with a custom premium dark theme.
- **Interactive Journey Map**: A beautiful snake-progression pathway containing 10 sections and over 120+ interactive lessons, MCQ quizzes, and coding challenges.
- **Gamification Mechanics**: XP accumulation, daily gems, streak tracking, and unlockable achievements.
- **Firebase Authentication**: Support for email/password registration and Google Sign-in.
- **Firestore Cloud Sync**: Automatic progress synchronization (union logic, streak maximums, code snapshots) to keep learning states identical across all your devices.

## 🛠️ Tech Stack

- **Core**: HTML5, Vanilla CSS3 (modern glassmorphism design), ES6 JavaScript modules.
- **Python Compiler**: [Pyodide](https://pyodide.org/) (Python WASM).
- **Code Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/).
- **Database & Auth**: [Firebase](https://firebase.google.com/) (Authentication & Firestore).
- **Development Tooling**: [Vite](https://vitejs.dev/).

---

## 💻 Running Locally

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed.

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Meet333999/PyMaster.git
   cd PyMaster
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

---

## ⚡ Hosting on Vercel

PyMaster is structured to deploy out-of-the-box on **Vercel** as a static single-page app.

### Deployment Instructions

1. Go to the [Vercel Dashboard](https://vercel.com/) and log in.
2. Click **Add New** -> **Project**.
3. Select your **PyMaster** repository from your GitHub account.
4. Vercel will automatically detect **Vite** as the framework preset.
5. Keep the default settings:
   - **Build Command**: `npm run build` (or `vite build`)
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **Deploy**. Vercel will build the project and provide a public URL.

> [!NOTE]
> Because PyMaster uses **hash-based client routing** (`#/journey`, `#/profile`, etc.), no special URL rewrite rules or `vercel.json` redirection config files are needed. All pages will load correctly when shared or bookmarked directly.
