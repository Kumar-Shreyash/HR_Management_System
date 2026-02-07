# HRMS Lite – Backend API

HRMS Lite Backend is a lightweight Human Resource Management System API developed using FastAPI and MongoDB.
It exposes a fast, and fully asynchronous REST API for managing employees, attendance, and dashboard-level insights.

## ✨ Overview

This service handles core HR operations such as:
- Employee lifecycle management
- Attendance tracking
- Attendance summaries
- Organization-level dashboard metrics

The application is designed with clean separation of concerns and async-first performance in mind.

## 🛠️ Technology Stack

- **API Framework**: FastAPI
- **Database**: MongoDB
- **Mongo Driver**: Motor (Asynchronous)
- **Data Validation**: Pydantic
- **ASGI Server**: Uvicorn
- **Environment Management**: python-dotenv

## 📂 Directory Layout

```
backend/
├── controllers/      # Core business logic
├── routers/          # API route definitions
├── schemas/          # Pydantic request/response models
├── main.py           # FastAPI application entry point
├── database.py       # MongoDB connection setup
├── config.py         # Environment & settings loader
└── requirements.txt  # Dependency list
```

## ✅ Prerequisites

Ensure the following are installed on your system:

- **Python**: 3.8 or above
- **MongoDB**:
  - Local MongoDB instance, or
  - MongoDB Atlas cluster

## ⚙️ Getting Started (Local Development)

1. **Navigate to the backend folder**
   ```bash
   cd backend
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**
   - Windows:
     ```powershell
     venv\Scripts\activate
     ```
   - macOS / Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure environment variables**
   Create a `.env` file inside the backend directory:
   ```env
   MONGO_DB_URL=mongodb://localhost:27017
   DATABASE_NAME=hrms_lite
   ```
   > ℹ️ If using MongoDB Atlas, replace the connection string with your cluster URL.

6. **Start the application**
   Run using Python:
   ```bash
   python main.py
   ```
   The server will be available at: [http://http://0.0.0.0:8081]

   Or start directly with Uvicorn:
   ```bash
   uvicorn main:app --reload
   ```

   The server will be available at: [http://127.0.0.1:8000]

## 📖 API Documentation

FastAPI automatically generates interactive documentation:

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## 🔗 Core API Routes

### 👥 Employee Management
- `GET /api/employees`
- `POST /api/employees`
- `PUT /api/employees/{employee_id}`
- `DELETE /api/employees/{employee_id}`

### 🗓️ Attendance
- `POST /api/attendance`
- `GET /api/attendance`
- `GET /api/attendance/{employee_id}`

### 📊 Dashboard
- `GET /api/dashboard` - Provides organization-level metrics and summaries.

## 🧩 Design Principles

- Fully asynchronous I/O
- Clear controller–router separation
- Centralized database connection
- Schema-driven validation
- Environment-based configuration
- Easy to extend and maintain
