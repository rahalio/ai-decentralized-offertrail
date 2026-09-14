import { FormEvent, useState } from 'react';
import { listConsents, revokeConsent } from '@/api/consents';
import type { ConsentEvent } from '@/api/types';

export function ConsentsPage() {
  const [subjectRef, setSubjectRef] = useState('');
  const [items, setItems] = useState<ConsentEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [lookedUp, setLookedUp] = useState(false);

  async function onLookup(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setLookedUp(true);
    try {
      const res = await listConsents({ subjectRef, limit: 50 });
      setItems(res.data.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lookup failed');
    } finally {
      setBusy(false);
    }
  }

  async function onRevoke(consentId: string) {
    setBusy(true);
    setError(null);
    try {
      await revokeConsent(consentId, 'Customer support revoke request');
      const res = await listConsents({ subjectRef, limit: 50 });
      setItems(res.data.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Revoke failed — consider freezing collection');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Consents and revokes</h1>
          <p>Lookup by customer ref; revoke one offer permission without killing the account.</p>
        </div>
      </header>
      {error ? <div className="error-banner">{error}</div> : null}

      <form className="panel form-card row" onSubmit={onLookup}>
        <label className="field">
          Subject ref
          <input
            value={subjectRef}
            onChange={(e) => setSubjectRef(e.target.value)}
            placeholder="crm_subject_…"
            required
          />
        </label>
        <button className="btn" type="submit" disabled={busy}>
          Lookup
        </button>
      </form>

      <div className="panel form-card table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th>Consent</th>
              <th>Offer</th>
              <th>Status</th>
              <th>Stop-processing</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr key={c.id}>
                <td className="mono">{c.id}</td>
                <td className="mono">{c.offerId}</td>
                <td>
                  <span className={`badge ${c.status === 'active' ? 'badge-foliage' : 'badge-coral'}`}>
                    {c.status}
                  </span>
                </td>
                <td>{c.stopProcessingStatus ?? '—'}</td>
                <td>
                  {c.status === 'active' ? (
                    <button
                      type="button"
                      className="btn btn-coral"
                      disabled={busy}
                      onClick={() => onRevoke(c.id)}
                    >
                      Revoke
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {lookedUp && items.length === 0 ? (
          <div className="empty">No offer permissions for this subject.</div>
        ) : null}
      </div>
    </div>
  );
}
