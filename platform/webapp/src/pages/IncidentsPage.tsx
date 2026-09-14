import { FormEvent, useEffect, useState } from 'react';
import {
  declareTrustIncident,
  listTrustIncidents,
  pauseOffersForIncident,
  resumeOffersForIncident,
} from '@/api/incidents';
import type { TrustIncident } from '@/api/types';
import { TrustPauseVeil } from '@/components/TrustPauseVeil';

export function IncidentsPage() {
  const [items, setItems] = useState<TrustIncident[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [summary, setSummary] = useState('');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('medium');

  async function refresh() {
    const res = await listTrustIncidents({ limit: 50 });
    setItems(res.data.items);
  }

  useEffect(() => {
    refresh().catch((e) => setError(e instanceof Error ? e.message : 'Failed to load incidents'));
  }, []);

  async function onDeclare(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await declareTrustIncident({ severity, summary });
      setSummary('');
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Declare failed');
    } finally {
      setBusy(false);
    }
  }

  async function onPause(id: string) {
    setBusy(true);
    setError(null);
    try {
      await pauseOffersForIncident(id, 'third_party_share');
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Pause failed');
    } finally {
      setBusy(false);
    }
  }

  async function onResume(id: string) {
    if (!window.confirm('Resume paused offers after recovery?')) return;
    setBusy(true);
    setError(null);
    try {
      await resumeOffersForIncident(id);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Resume failed');
    } finally {
      setBusy(false);
    }
  }

  const anyPaused = items.some((i) => Boolean(i.pausedOfferClass) && i.status !== 'closed');

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Trust incidents</h1>
          <p>Pause value exchanges during trust recovery; resume with confirmation.</p>
        </div>
      </header>
      {error ? <div className="error-banner">{error}</div> : null}

      <form className="panel form-card stack" onSubmit={onDeclare}>
        <h2>Declare incident</h2>
        <div className="row">
          <label className="field">
            Severity
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value as 'low' | 'medium' | 'high')}
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          </label>
          <label className="field">
            Summary
            <input value={summary} onChange={(e) => setSummary(e.target.value)} required />
          </label>
          <button className="btn btn-coral" type="submit" disabled={busy}>
            Declare
          </button>
        </div>
      </form>

      <TrustPauseVeil paused={anyPaused} label="Third-party share class paused">
        <div className="panel form-card table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Summary</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Paused class</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id}>
                  <td>{i.summary}</td>
                  <td>
                    <span className={`badge ${i.severity === 'high' ? 'badge-coral' : 'badge-amber'}`}>
                      {i.severity}
                    </span>
                  </td>
                  <td>{i.status}</td>
                  <td>{i.pausedOfferClass ?? '—'}</td>
                  <td className="row">
                    <button
                      type="button"
                      className="btn btn-coral"
                      disabled={busy || i.status === 'closed'}
                      onClick={() => onPause(i.id)}
                    >
                      Pause offers
                    </button>
                    <button
                      type="button"
                      className="btn"
                      disabled={busy || i.status === 'closed'}
                      onClick={() => onResume(i.id)}
                    >
                      Resume
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 ? <div className="empty">Healthy — no open incidents.</div> : null}
        </div>
      </TrustPauseVeil>
    </div>
  );
}
