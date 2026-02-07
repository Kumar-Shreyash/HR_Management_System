from fastapi import APIRouter, Depends, status
from configs.dbConfig import get_db
from schemas.employee_schema import EmployeeCreate, EmployeeUpdate, EmployeeResponse
from controllers import employee_controller

router = APIRouter()

@router.post("/employees", response_model=EmployeeResponse, status_code=status.HTTP_201_CREATED)
async def create_employee(employee: EmployeeCreate, db=Depends(get_db)):
    return await employee_controller.add_employee(db, employee.dict())

@router.get("/employees", response_model=list[EmployeeResponse])
async def get_all_employees(db=Depends(get_db)):
    return await employee_controller.fetch_all_employees(db)

@router.get("/employees/{employee_id}", response_model=EmployeeResponse)
async def get_employee_by_id(employee_id: str, db=Depends(get_db)):
    return await employee_controller.fetch_employee_by_id(db, employee_id)

@router.put("/employees/{employee_id}", response_model=EmployeeResponse)
async def update_employee(employee_id: str, employee: EmployeeUpdate, db=Depends(get_db)):
    return await employee_controller.modify_employee(db, employee_id, employee.dict(exclude_unset=True))

@router.delete("/employees/{employee_id}")
async def delete_employee(employee_id: str, db=Depends(get_db)):
    return await employee_controller.remove_employee(db, employee_id)
