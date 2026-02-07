import { useState, useEffect } from 'react';
import { hrApi } from '../api/hrApi';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [presentDays, setPresentDays] = useState({}); // { employee_id: count }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modal, setModal] = useState(null); // 'edit' | 'delete' | null
  const [selected, setSelected] = useState(null);
  const [addForm, setAddForm] = useState({ employee_id: '', full_name: '', email: '', department: '' });
  const [editForm, setEditForm] = useState({ full_name: '', email: '', department: '' });

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch both employees and attendance records in parallel
      const [empsData, attData] = await Promise.all([hrApi.employees.list(), hrApi.attendance.list()]);

      setEmployees(Array.isArray(empsData) ? empsData : []);
      const records = Array.isArray(attData) ? attData : [];

      // Calculate present days count per employee
      const counts = {};
      records.forEach((r) => {
        if (r.status === 'Present') {
          counts[r.employee_id] = (counts[r.employee_id] || 0) + 1;
        }
      });
      setPresentDays(counts);
    } catch (e) {
      setError(e.message || 'Failed to load employees');
      setEmployees([]);
      setPresentDays({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openEdit = (emp) => {
    setEditForm({ full_name: emp.full_name, email: emp.email, department: emp.department });
    setSelected(emp);
    setModal('edit');
    setError('');
    setSuccess('');
  };

  const openDelete = (emp) => {
    setSelected(emp);
    setModal('delete');
    setError('');
  };

  const close = () => {
    setModal(null);
    setSelected(null);
    setError('');
  };

  const submitAdd = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await hrApi.employees.create(addForm);
      setSuccess('Employee added successfully');
      setAddForm({ employee_id: '', full_name: '', email: '', department: '' });
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    if (!selected) return;
    setError('');
    try {
      await hrApi.employees.update(selected.employee_id, {
        full_name: editForm.full_name,
        email: editForm.email,
        department: editForm.department,
      });
      setSuccess('Employee updated');
      close();
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const submitDelete = async () => {
    if (!selected) return;
    try {
      await hrApi.employees.delete(selected.employee_id);
      setSuccess('Employee deleted');
      close();
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1 className="page-title">Employees</h1>

      {/* Add Employee Form */}
      <div className="card card-form">
        <h3 className="section-title">Add New Employee</h3>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={submitAdd} className="form-row">
          <div className="form-group">
            <label>Employee ID</label>
            <input
              placeholder="e.g. ABC1"
              value={addForm.employee_id}
              onChange={(e) => setAddForm((f) => ({ ...f, employee_id: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label>Full Name</label>
            <input
              placeholder="John Doe"
              value={addForm.full_name}
              onChange={(e) => setAddForm((f) => ({ ...f, full_name: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="user@gmail.com"
              value={addForm.email}
              onChange={(e) => setAddForm((f) => ({ ...f, email: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label>Department</label>
            <input
              placeholder="e.g. Finance"
              value={addForm.department}
              onChange={(e) => setAddForm((f) => ({ ...f, department: e.target.value }))}
              required
            />
          </div>
          <div className="form-group form-group-btn">
            <label>&nbsp;</label>
            <button type="submit" className="btn btn-primary btn-block">Add Employee</button>
          </div>
        </form>
      </div>

      {/* Employee List */}
      <div className="card">
        <h3 className="section-title">Employee List</h3>
        {loading ? (
          <div className="loading-state">Loading employees...</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Present Days</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(employees) ? employees : []).map((emp) => (
                  <tr key={emp.employee_id}>
                    <td>{emp.employee_id}</td>
                    <td>{emp.full_name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>{presentDays[emp.employee_id] ?? 0}</td>
                    <td>
                      <div className="table-actions">
                        <button className="btn btn-secondary btn-sm" onClick={() => openEdit(emp)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => openDelete(emp)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!employees || employees.length === 0) && (
                  <tr><td colSpan={6}>No employees yet. Add one above.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal === 'edit' && selected && (
        <div className="modal-overlay" onClick={close}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Employee — {selected.employee_id}</h3>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={submitEdit}>
              <div className="form-group">
                <label>Full Name</label>
                <input value={editForm.full_name} onChange={(e) => setEditForm((f) => ({ ...f, full_name: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={editForm.email} onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input value={editForm.department} onChange={(e) => setEditForm((f) => ({ ...f, department: e.target.value }))} required />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={close}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modal === 'delete' && selected && (
        <div className="modal-overlay" onClick={close}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Employee</h3>
            <p>Delete {selected.full_name} ({selected.employee_id})?</p>
            {error && <div className="alert alert-error">{error}</div>}
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={close}>Cancel</button>
              <button className="btn btn-danger" onClick={submitDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}