from fastapi import HTTPException
from datetime import datetime

async def record_attendance(db, attendance_data: dict):
    # Check if employee already exists in the database
    employee = await db.employees.find_one({"employee_id": attendance_data["employee_id"]})
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Add timestamp
    attendance_data["created_at"] = datetime.utcnow()
    
    # Save the attendance record
    result = await db.attendance.insert_one(attendance_data)
    created_attendance = await db.attendance.find_one({"_id": result.inserted_id})
    
    # Convert ObjectId to string
    created_attendance["_id"] = str(created_attendance["_id"])
    return created_attendance

async def fetch_all_attendance(db):
    attendance_records = await db.attendance.find().sort("date", -1).to_list(None)
    # Convert ObjectId to string
    for record in attendance_records:
        record["_id"] = str(record["_id"])
    return attendance_records

async def fetch_employee_attendance(db, employee_id: str):
    # Check if employee already exists in database or not
    employee = await db.employees.find_one({"employee_id": employee_id})
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Get attendance records of the employee
    attendance_records = await db.attendance.find({"employee_id": employee_id}).sort("date", -1).to_list(None)
    # Convert ObjectId to string
    for record in attendance_records:
        record["_id"] = str(record["_id"])

    if not attendance_records:
            raise HTTPException(status_code=404, detail=f"No attendance records found for employee {employee_id}")
        
    return attendance_records

async def fetch_attendance_summary(db, employee_id: str):
    # Check if employee already exists in database
    employee = await db.employees.find_one({"employee_id": employee_id})
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Total present days
    total_present = await db.attendance.count_documents({"employee_id": employee_id, "status": "Present"})
    total_absent = await db.attendance.count_documents({"employee_id": employee_id, "status": "Absent"})
    total_days = total_present + total_absent
    
    return {
        "employee_id": employee_id,
        "total_days": total_days,
        "total_present": total_present,
        "total_absent": total_absent
    }
