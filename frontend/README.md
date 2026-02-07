# HRMS Lite - Frontend

This is the frontend application for the **HRMS Lite** system. It features a modern, responsive user interface built with **React** and **Vite**, designed to streamline employee management and attendance tracking.

## 🛠️ Technology Stack

-   **Framework**: React 19
-   **Build Tool**: Vite
-   **Styling**: Custom CSS (Responsive & Themed)
-   **HTTP Client**: Native Fetch API
-   **Router**: React Router DOM v7

## 📂 Project Structure

```bash
frontend/
├── src/
│   ├── api/             # API service modules
│   ├── assets/          # Static assets (images, icons)
│   ├── components/      # Reusable UI components (Navbar, etc.)
│   ├── pages/           # Page views (Dashboard, Employees, Attendance)
│   ├── App.jsx          # Root component with routing
│   ├── main.jsx         # Application entry point
│   ├── App.css          # Component-specific styles
│   └── index.css        # Global variables and base styles
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies and scripts
```

## 📋 Prerequisites

-   **Node.js**: v18.0.0 or higher (Recommended)
-   **npm**: v9.0.0 or higher

## 🚀 Local Setup

1.  **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Setup:**

    Ensure the backend API is running. The application is configured to communicate with the backend via the `API_BASE` URL defined in `src/api/hrApi.js` (defaulting to the deployed Render backend).

4.  **Run Development Server:**

    ```bash
    npm run dev
    ```

    Access the application at `http://localhost:5173`.

## 📜 Scripts

-   `npm run dev`: Starts the development server.
-   `npm start`: Alias for `dev`, starts the server.
-   `npm run build`: Compiles the application for production.
-   `npm run preview`: Previes the locally built production version.

## ✨ Key Features

-   **Dashboard**: Visual overview of HR metrics, department distribution, and recent activity.
-   **Employee Management**: Complete CRUD operations for employee profiles.
-   **Attendance Tracking**: Daily attendance marking and historical record viewing.
-   **Responsive Design**: Fully optimized layout for desktops, tablets, and mobile phones.
-   **Modern UI**: Professional "HRMS Lite" branding with a clean, light-themed interface.
