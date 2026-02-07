from fastapi import APIRouter, Depends
from configs.dbConfig import get_db
from controllers import dashboard_controller

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard_summary(db=Depends(get_db)):
    return await dashboard_controller.fetch_dashboard_summary(db)
