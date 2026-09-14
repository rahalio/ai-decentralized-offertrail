import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { BrandMark } from '@/components/BrandMark';
import { clearApiKey } from '@/shared/auth';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/journeys', label: 'Journeys' },
  { to: '/offers', label: 'Offers' },
  { to: '/approvals', label: 'Approvals' },
  { to: '/consents', label: 'Consents' },
  { to: '/fulfil', label: 'Fulfil' },
  { to: '/incidents', label: 'Incidents' },
  { to: '/report', label: 'Report' },
];

export function AppShell() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '220px 1fr',
        background: 'var(--color-charcoal-950)',
      }}
    >
      <aside
        style={{
          background: 'var(--color-chrome)',
          borderRight: '1px solid var(--color-border-dark)',
          padding: 'var(--space-5)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-6)',
        }}
      >
        <BrandMark onDark />
        <nav className="stack" style={{ gap: '0.35rem' }}>
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              style={({ isActive }) => ({
                padding: '0.55rem 0.7rem',
                borderRadius: 'var(--radius-sm)',
                color: isActive ? 'var(--color-panel)' : 'rgba(243,246,242,0.7)',
                background: isActive ? 'var(--color-chrome-elevated)' : 'transparent',
                fontWeight: isActive ? 600 : 500,
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          className="btn btn-ghost"
          style={{ marginTop: 'auto' }}
          onClick={() => {
            clearApiKey();
            navigate('/login');
          }}
        >
          Sign out
        </button>
      </aside>
      <main style={{ minWidth: 0 }}>
        <Outlet />
      </main>
    </div>
  );
}
