import { useState, useEffect } from 'react';
import { hrApi } from '../api/hrApi';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await hrApi.dashboard();
        setData(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return (
    <div className="loading-page">
      <span className="loading-state">Loading dashboard...</span>
    </div>
  );
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!data) return null;

  // Destructuring data for easier access in the JSX
  const { total_employees, total_departments, today_attendance, department_wise_count, recent_employees } = data;

  return (
    <>
      <h1 className="page-title">Dashboard</h1>

      <div className="stats-grid">
        <div className="card stat-card">
          <div className="card-icon">👥</div>
          <div className="card-content">
            <div className="card-title">Total Employees</div>
            <div className="card-value">{total_employees}</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="card-icon">🏢</div>
          <div className="card-content">
            <div className="card-title">Departments</div>
            <div className="card-value">{total_departments}</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="card-icon">✅</div>
          <div className="card-content">
            <div className="card-title">Present Today</div>
            <div className="card-value">{today_attendance?.present ?? 0}</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="card-icon">📊</div>
          <div className="card-content">
            <div className="card-title">Attendance %</div>
            <div className="card-value">{today_attendance?.percentage ?? 0}%</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3 className="card-header-small">Department Overview</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Employees</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(department_wise_count || {}).map(([dept, count]) => (
                  <tr key={dept}>
                    <td>{dept}</td>
                    <td>{count}</td>
                  </tr>
                ))}
                {(!department_wise_count || Object.keys(department_wise_count).length === 0) && (
                  <tr><td colSpan={2}>No departments</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h3 className="card-header-small">Recent Employees</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(recent_employees) ? recent_employees : []).map((emp) => (
                  <tr key={emp.employee_id}>
                    <td>{emp.employee_id}</td>
                    <td>{emp.full_name}</td>
                    <td>{emp.department}</td>
                  </tr>
                ))}
                {(!recent_employees || recent_employees.length === 0) && (
                  <tr><td colSpan={3}>No employees</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
