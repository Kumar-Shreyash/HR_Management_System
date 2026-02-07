from fastapi import APIRouter, Depends, status
from configs.dbConfig import get_db
from schemas.attendance_schema import AttendanceCreate, AttendanceResponse
from controllers import attendance_controller

router = APIRouter()

@router.post("/attendance", response_model=AttendanceResponse, status_code=status.HTTP_201_CREATED)
async def record_attendance(attendance: AttendanceCreate, db=Depends(get_db)):
    return await attendance_controller.record_attendance(db, attendance.dict())

@router.get("/attendance", response_model=list[AttendanceResponse])
async def fetch_all_attendance(db=Depends(get_db)):
    return await attendance_controller.fetch_all_attendance(db)

@router.get("/attendance/{employee_id}", response_model=list[AttendanceResponse])
async def fetch_employee_attendance(employee_id: str, db=Depends(get_db)):
    return await attendance_controller.fetch_employee_attendance(db, employee_id)

@router.get("/attendance/summary/{employee_id}")
async def fetch_attendance_stats(employee_id: str, db=Depends(get_db)):
    return await attendance_controller.fetch_attendance_summary(db, employee_id)
