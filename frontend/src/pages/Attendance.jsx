import { useState, useEffect } from 'react';
import { hrApi } from '../api/hrApi';

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [form, setForm] = useState({
    employee_id: '',
    date: new Date().toISOString().slice(0, 10),
    status: 'Present',
  });

  const loadData = async () => {
    setError('');
    try {
      const [emps, att] = await Promise.all([hrApi.employees.list(), hrApi.attendance.list()]);
      setEmployees(Array.isArray(emps) ? emps : []);
      setRecords(Array.isArray(att) ? att : []);
    } catch (e) {
      setError(e.message || 'Failed to load data');
      setEmployees([]);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    const body = {
      employee_id: form.employee_id,
      date: new Date(form.date).toISOString(),
      status: form.status,
    };
    try {
      await hrApi.attendance.create(body);
      setSuccess('Attendance recorded successfully');
      setForm({ ...form, employee_id: '' });
      loadData();
    } catch (e) {
      setError(e.message);
    }
  };

  const fmt = (d) => {
    if (!d) return '-';
    const x = new Date(d);
    return x.toLocaleDateString() + ' ' + x.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const toDateOnly = (d) => {
    if (!d) return '';
    const x = new Date(d);
    return x.toISOString().slice(0, 10);
  };

  // Filter records based on the selected date range
  const filteredRecords = (Array.isArray(records) ? records : []).filter((r) => {
    const recordDate = toDateOnly(r.date);
    if (filterFrom && recordDate < filterFrom) return false;
    if (filterTo && recordDate > filterTo) return false;
    return true;
  });

  return (
    <>
      <h1 className="page-title">Attendance</h1>

      {/* Mark Attendance Form */}
      <div className="card card-form attendance-form-card">
        <h3 className="section-title">Mark Attendance</h3>
        <p className="section-desc">Select an employee, date, and status to record attendance.</p>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={submit} className="attendance-form">
          <div className="form-group">
            <label>Employee</label>
            <select
              value={form.employee_id}
              onChange={(e) => setForm((f) => ({ ...f, employee_id: e.target.value }))}
              required
            >
              <option value="">— Select Employee —</option>
              {(Array.isArray(employees) ? employees : []).map((emp) => (
                <option key={emp.employee_id} value={emp.employee_id}>
                  {emp.full_name} ({emp.employee_id}) — {emp.department}
                </option>
              ))}
              {(!employees || employees.length === 0) && <option value="" disabled>No employees yet. Add employees first.</option>}
            </select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
            >
              <option value="Present">✓ Present</option>
              <option value="Absent">✗ Absent</option>
            </select>
          </div>
          <div className="form-group form-group-btn">
            <label>&nbsp;</label>
            <button type="submit" className="btn btn-primary btn-block" disabled={!Array.isArray(employees) || employees.length === 0}>
              Mark Attendance
            </button>
          </div>
        </form>
      </div>

      {/* Attendance Records */}
      <div className="card">
        <h3 className="section-title">Attendance Records</h3>
        <div className="filter-row">
          <div className="form-group">
            <label>Filter by date</label>
            <div className="filter-inputs">
              <input
                type="date"
                value={filterFrom}
                onChange={(e) => setFilterFrom(e.target.value)}
                placeholder="From"
              />
              <span className="filter-separator">to</span>
              <input
                type="date"
                value={filterTo}
                onChange={(e) => setFilterTo(e.target.value)}
                placeholder="To"
              />
              {(filterFrom || filterTo) && (
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => { setFilterFrom(''); setFilterTo(''); }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
        {loading ? (
          <div className="loading-state">Loading records...</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((r) => (
                  <tr key={r._id || r.id}>
                    <td>{r.employee_id}</td>
                    <td>{fmt(r.date)}</td>
                    <td>
                      <span className={`status-badge status-${r.status.toLowerCase()}`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredRecords.length === 0 && (
                  <tr>
                    <td colSpan={3}>
                      {records?.length > 0
                        ? 'No records match the selected date range.'
                        : 'No attendance records yet. Mark attendance above.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}