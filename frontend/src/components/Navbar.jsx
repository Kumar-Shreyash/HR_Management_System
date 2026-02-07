import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();
  const navClass = (path) =>
    pathname === path ? 'nav-link active' : 'nav-link';

  return (
    <div className="layout">
      <header className="header">
        <h1 className="logo">
          <span style={{ marginRight: '0.5rem', fontSize: '1.5rem' }}>💠</span>
          HRMS Lite
        </h1>
        <nav className="nav">
          <Link to="/" className={navClass('/')}>Dashboard</Link>
          <Link to="/employees" className={navClass('/employees')}>Employees</Link>
          <Link to="/attendance" className={navClass('/attendance')}>Attendance</Link>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}