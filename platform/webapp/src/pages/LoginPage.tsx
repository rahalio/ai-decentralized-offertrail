import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandMark } from '@/components/BrandMark';
import { DEMO_API_KEY, setApiKey } from '@/shared/auth';

export function LoginPage() {
  const navigate = useNavigate();

  function enter(e: FormEvent) {
    e.preventDefault();
    setApiKey(DEMO_API_KEY);
    navigate('/');
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 'var(--space-6)',
        background:
          'radial-gradient(ellipse at 20% 10%, rgba(58,125,92,0.22), transparent 45%), radial-gradient(ellipse at 80% 90%, rgba(201,138,26,0.12), transparent 40%), var(--color-charcoal-950)',
      }}
    >
      <form className="panel form-card stack" style={{ width: 'min(440px, 100%)' }} onSubmit={enter}>
        <BrandMark size="lg" />
        <h1 style={{ fontSize: '2rem', lineHeight: 1.15 }}>Trade data for a clear return</h1>
        <p>
          Journey-tied value exchanges — purpose, categories, and fulfilment proof on one commercial
          desk.
        </p>
        <button type="submit" className="btn" style={{ width: '100%', marginTop: '0.5rem' }}>
          Enter with demo key
        </button>
        <p className="mono muted" style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
          X-API-Key · {DEMO_API_KEY}
        </p>
        <p style={{ marginTop: '0.25rem' }}>
          <Link to="/" style={{ color: 'var(--color-brand)' }}>
            Continue if already signed in
          </Link>
        </p>
      </form>
    </div>
  );
}
