from configs.dbConfig import connect_to_db, close_db_connection, get_db 
from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from routes import employee_routes, attendance_routes, dashboard_routes

@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup
    await connect_to_db()
    yield
    # shutdown
    await close_db_connection()

app = FastAPI(lifespan=lifespan)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# routers
app.include_router(employee_routes.router, prefix="/api", tags=["Employees"])
app.include_router(attendance_routes.router, prefix="/api", tags=["Attendance"])
app.include_router(dashboard_routes.router, prefix="/api", tags=["Dashboard"])

@app.get("/")
async def home():
    return {"message": "HR Management System is Running..."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8081)