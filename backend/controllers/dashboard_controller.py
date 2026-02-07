from datetime import datetime, timedelta

async def fetch_dashboard_summary(db):
    # Count all employees in the system
    total_employees = await db.employees.count_documents({})
    
    # Fetch all employees to calculate department statistics
    all_employees = await db.employees.find().to_list(None)
    
    # Extract unique departments
    departments = list(set(emp["department"] for emp in all_employees))
    total_departments = len(departments)
    
    # Count employees of each department
    department_stats = {}
    for dept in departments:
        count = sum(1 for emp in all_employees if emp["department"] == dept)
        department_stats[dept] = count
    
    # Calculate attendance 
    today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    today_end = today_start + timedelta(days=1)
    
    present_today = await db.attendance.count_documents({
        "date": {"$gte": today_start, "$lt": today_end},
        "status": "Present"
    })
    
    absent_today = await db.attendance.count_documents({
        "date": {"$gte": today_start, "$lt": today_end},
        "status": "Absent"
    })
    
    total_marked_today = present_today + absent_today
    attendance_percentage = round((present_today / total_marked_today * 100), 2) if total_marked_today > 0 else 0
    
    # Fetch the 5 most recently added employees
    recent_employees_cursor = await db.employees.find().sort("created_at", -1).limit(5).to_list(5)
    recent_employees = [
        {
            "employee_id": emp["employee_id"],
            "full_name": emp["full_name"],
            "department": emp["department"]
        }
        for emp in recent_employees_cursor
    ]
    
    # Return the dashboard summary
    return {
        "total_employees": total_employees,
        "total_departments": total_departments,
        "today_attendance": {
            "date": today_start.strftime("%Y-%m-%d"),
            "present": present_today,
            "absent": absent_today,
            "total_marked": total_marked_today,
            "percentage": attendance_percentage
        },
        "department_wise_count": department_stats,
        "recent_employees": recent_employees
    }
