import { FormEvent, useEffect, useState } from 'react';
import { archiveJourney, createJourney, listJourneys } from '@/api/journeys';
import type { Journey } from '@/api/types';

export function JourneysPage() {
  const [items, setItems] = useState<Journey[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function refresh() {
    const res = await listJourneys({ limit: 50 });
    setItems(res.data.items);
  }

  useEffect(() => {
    refresh().catch((e) => setError(e instanceof Error ? e.message : 'Failed to load journeys'));
  }, []);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await createJourney({ name, description: description || undefined });
      setName('');
      setDescription('');
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Create failed');
    } finally {
      setBusy(false);
    }
  }

  async function onArchive(id: string) {
    setBusy(true);
    setError(null);
    try {
      await archiveJourney(id);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Archive failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Priority journeys</h1>
          <p>Keep programme structure simple around journeys, not regulation nodes.</p>
        </div>
      </header>
      {error ? <div className="error-banner">{error}</div> : null}

      <form className="panel form-card stack" onSubmit={onCreate}>
        <h2>Add journey</h2>
        <div className="row">
          <label className="field">
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} required maxLength={200} />
          </label>
          <label className="field">
            Description
            <input value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
          <button className="btn" type="submit" disabled={busy}>
            Create
          </button>
        </div>
        {items.length > 8 ? (
          <p className="badge badge-amber">Cap sprawl — prefer a small set of priority journeys.</p>
        ) : null}
      </form>

      <div className="panel form-card table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Orchestration</th>
              <th>Id</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((j) => (
              <tr key={j.id}>
                <td>
                  <strong style={{ fontFamily: 'var(--font-display)' }}>{j.name}</strong>
                  {j.description ? <div className="muted">{j.description}</div> : null}
                </td>
                <td>
                  <span className={`badge ${j.status === 'active' ? 'badge-foliage' : 'badge-amber'}`}>
                    {j.status}
                  </span>
                </td>
                <td>{j.orchestrationStatus ?? '—'}</td>
                <td className="mono">{j.id}</td>
                <td>
                  {j.status !== 'archived' ? (
                    <button type="button" className="btn btn-chrome" disabled={busy} onClick={() => onArchive(j.id)}>
                      Archive
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 ? <div className="empty">No journeys yet.</div> : null}
      </div>
    </div>
  );
}
