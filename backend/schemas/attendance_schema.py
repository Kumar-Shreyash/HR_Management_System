from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum

class AttendanceStatus(str, Enum):
    PRESENT = "Present"
    ABSENT = "Absent"

class AttendanceCreate(BaseModel):
    employee_id: str = Field(..., min_length=1, description="Employee ID")
    date: datetime = Field(..., description="Attendance date")
    status: AttendanceStatus = Field(..., description="Attendance status")

class AttendanceResponse(BaseModel):
    id: str = Field(..., alias="_id")
    employee_id: str
    date: datetime
    status: str
    created_at: datetime
    
    class Config:
        populate_by_name = True
