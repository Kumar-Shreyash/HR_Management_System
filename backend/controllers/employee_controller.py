from fastapi import HTTPException
from datetime import datetime
from bson import ObjectId

async def add_employee(db, employee_data: dict):
    
    # Create a new employee in the database.
    # Check if the employee ID is already taken
    existing_employee = await db.employees.find_one({"employee_id": employee_data["employee_id"]})
    if existing_employee:
        raise HTTPException(status_code=400, detail="Employee ID already exists")
    
    # Check if the email is already registered
    existing_email = await db.employees.find_one({"email": employee_data["email"]})
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    # Add creation timestamp
    employee_data["created_at"] = datetime.utcnow()
    
    # Insert the new employee into the database
    result = await db.employees.insert_one(employee_data)
    created_employee = await db.employees.find_one({"_id": result.inserted_id})
    
    # Convert MongoDB ObjectId to string
    created_employee["_id"] = str(created_employee["_id"])
    return created_employee


async def fetch_all_employees(db):
    
    # Retrieve all employees from the database.
    employees = await db.employees.find().to_list(None)
    for emp in employees:
        emp["_id"] = str(emp["_id"])
    return employees


async def fetch_employee_by_id(db, employee_id: str):
    
    # Retrieve a single employee by their employee ID.
    employee = await db.employees.find_one({"employee_id": employee_id})
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    employee["_id"] = str(employee["_id"])
    return employee


async def modify_employee(db, employee_id: str, update_data: dict):
   
    # Update an existing employee's information.
    # Verify the employee exists
    employee = await db.employees.find_one({"employee_id": employee_id})
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # If updating email, make sure the new email isn't already taken
    if "email" in update_data and update_data["email"] != employee["email"]:
        existing_email = await db.employees.find_one({"email": update_data["email"]})
        if existing_email:
            raise HTTPException(status_code=400, detail="Email already exists")
    
    # Apply updates
    await db.employees.update_one(
        {"employee_id": employee_id},
        {"$set": update_data}
    )
    
    # Fetch the updated record
    updated_employee = await db.employees.find_one({"employee_id": employee_id})
    updated_employee["_id"] = str(updated_employee["_id"])
    return updated_employee


async def remove_employee(db, employee_id: str):
  
    # Delete  employee from the database by their employee ID.
    # Verify the employee exists
    employee = await db.employees.find_one({"employee_id": employee_id})
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Delete the employee record
    await db.employees.delete_one({"employee_id": employee_id})
    
    return {"message": f"Employee {employee_id} deleted successfully"}
