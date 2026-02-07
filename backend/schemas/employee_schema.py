from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class EmployeeCreate(BaseModel):
    employee_id: str = Field(..., min_length=1, description="Unique employee ID")
    full_name: str = Field(..., min_length=1, description="Employee full name")
    email: EmailStr = Field(..., description="Employee email address")
    department: str = Field(..., min_length=1, description="Department name")

class EmployeeUpdate(BaseModel):
    full_name: Optional[str] = Field(None, min_length=1, description="Employee full name")
    email: Optional[EmailStr] = Field(None, description="Employee email address")
    department: Optional[str] = Field(None, min_length=1, description="Department name")

class EmployeeResponse(BaseModel):
    id: str = Field(..., alias="_id")
    employee_id: str
    full_name: str
    email: str
    department: str
    created_at: datetime
    
    class Config:
        populate_by_name = True
