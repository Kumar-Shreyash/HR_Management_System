# HRMS Lite

**HRMS Lite** is a modern, full-stack Human Resource Management System designed for efficiency and ease of use. Built with a high-performance **FastAPI** backend and a dynamic **React 19** frontend, it offers a seamless experience for managing employee data and attendance.

---

## 🚀 Tech Stack

### Frontend
-   **React 19**: The latest version of the library for web and native user interfaces.
-   **Vite**: Next Generation Frontend Tooling for lightning-fast builds.
-   **React Router 7**: Robust routing for single-page applications.
-   **CSS Modules**: Modular and scoped styling for components.

### Backend
-   **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python.
-   **MongoDB**: Flexible, document-based database.
-   **Motor**: Asynchronous Python driver for MongoDB.
-   **Pydantic**: Data validation and settings management using Python type hints.

---

## 📂 Project Structure

```bash
quess/
├── frontend/           # React 19 application (Vite)
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Application route pages
│   │   ├── api/        # API integration logic
│   │   └── App.jsx     # Main application component
│   └── package.json    # Frontend dependencies
│
├── backend/            # FastAPI application
│   ├── controllers/    # Request handlers and business logic
│   ├── routes/         # API route definitions
│   ├── schemas/        # Pydantic models for data validation
│   ├── configs/        # Database and app configurations
│   ├── main.py         # Application entry point
│   └── requirements.txt # Backend dependencies
│
└── README.md           # Project documentation
```

---

## ⚡ Getting Started

Follow these steps to set up the project locally.

### Prerequisites
-   **Node.js** (v18+)
-   **Python** (v3.10+)
-   **MongoDB** (running locally or cloud instance)

### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Create and activate a virtual environment:
    ```bash
    # Windows
    python -m venv venv
    .\venv\Scripts\activate

    # macOS/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4.  Configure Environment:
    Ensure you have a `.env` file or update `configs/dbConfig.py` with your MongoDB connection string if necessary.

5.  Start the server:

     Run using Python:
   ```bash
   python main.py
   ```
   The server will be available at: [http://0.0.0.0:8081]

    ```bash
    uvicorn main:app --reload
    ```
    The API will be available at `http://127.0.0.1:8000`. API Docs are at `http://localhost:8000/docs`.

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will run at `http://localhost:5173`.

---

## ✨ Key Features
-   **Employee Management**: Create, read, update, and delete employee records.
-   **Attendance Tracking**: Log and monitor daily attendance.
-   **Real-time Data**: Fast data synchronization using MongoDB and FastAPI.
-   **Responsive Interface**: Designed to work on various screen sizes.

---

## 🤝 Contributing
1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/NewFeature`).
3.  Commit your changes (`git commit -m 'Add NewFeature'`).
4.  Push to the branch (`git push origin feature/NewFeature`).
5.  Open a Pull Request.
