const API_BASE = 'https://hr-management-system-1-jfv9.onrender.com/api';

async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.detail || 'Request failed');
    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

export const hrApi = {
  employees: {
    list: () => request('/employees'),
    get: (id) => request(`/employees/${id}`),
    create: (body) => request('/employees', { method: 'POST', body: JSON.stringify(body) }),
    update: (id, body) => request(`/employees/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (id) => request(`/employees/${id}`, { method: 'DELETE' }),
  },
  attendance: {
    list: () => request('/attendance'),
    listByEmployee: (id) => request(`/attendance/${id}`),
    summary: (id) => request(`/attendance/summary/${id}`),
    create: (body) => request('/attendance', { method: 'POST', body: JSON.stringify(body) }),
  },
  dashboard: () => request('/dashboard'),
};
