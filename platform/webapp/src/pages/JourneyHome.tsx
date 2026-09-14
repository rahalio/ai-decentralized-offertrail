import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listJourneys } from '@/api/journeys';
import { listTrustIncidents } from '@/api/incidents';
import { compareJourneys } from '@/api/reporting';
import type { Journey, JourneyCompareRow, TrustIncident } from '@/api/types';
import { JourneyKpiStrip } from '@/components/JourneyKpiStrip';
import { TrustPauseVeil } from '@/components/TrustPauseVeil';

export function JourneyHome() {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [compare, setCompare] = useState<JourneyCompareRow[]>([]);
  const [incidents, setIncidents] = useState<TrustIncident[]>([]);
  const [brand, setBrand] = useState('Offertrail demo');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [jRes, iRes] = await Promise.all([
          listJourneys({ limit: 20 }),
          listTrustIncidents({ status: 'open', limit: 10 }),
        ]);
        if (cancelled) return;
        setJourneys(jRes.data.items);
        setIncidents(iRes.data.items);
        try {
          const period = `${new Date().getFullYear()}-Q${Math.floor(new Date().getMonth() / 3) + 1}`;
          const cRes = await compareJourneys(period);
          if (!cancelled) setCompare(cRes.data.journeys);
        } catch {
          if (!cancelled) setCompare([]);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load home');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const paused = incidents.some((i) => Boolean(i.pausedOfferClass));
  const byJourney = new Map(compare.map((r) => [r.journeyId, r]));

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Journey shelf</h1>
          <p>Which priority journeys convert lawful sharing because the value was real?</p>
        </div>
        <div className="row">
          <label className="field" style={{ minWidth: 180 }}>
            <span style={{ color: 'rgba(243,246,242,0.65)' }}>Brand</span>
            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option>Offertrail demo</option>
              <option>Acme Loyalty</option>
              <option>Northwind CX</option>
            </select>
          </label>
          <Link className="btn" to="/offers">
            Create offer
          </Link>
          <Link className="btn btn-coral" to="/incidents">
            Pause third-party class
          </Link>
        </div>
      </header>

      {error ? <div className="error-banner">{error}</div> : null}
      {loading ? <div className="empty muted">Loading journeys…</div> : null}

      {!loading && journeys.length === 0 ? (
        <div className="panel form-card empty">
          Empty shelf — start with acquire, loyalty, or win-back journeys.
          <div className="row" style={{ justifyContent: 'center', marginTop: '1rem' }}>
            <Link className="btn" to="/journeys">
              Add journey
            </Link>
          </div>
        </div>
      ) : null}

      <TrustPauseVeil paused={paused} label="Trust incident — share offers paused">
        <div className="grid-cards">
          {journeys.slice(0, 5).map((j) => {
            const kpi = byJourney.get(j.id);
            return (
              <article key={j.id} className="panel form-card">
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <span className={`badge ${j.status === 'active' ? 'badge-foliage' : 'badge-amber'}`}>
                    {j.status}
                  </span>
                  <span className="muted" style={{ fontSize: '0.8rem' }}>
                    {brand}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.25rem', marginTop: '0.6rem' }}>{j.name}</h2>
                <p>{j.description || 'Priority journey tile'}</p>
                <JourneyKpiStrip
                  optIns={kpi ? Math.round(kpi.optInRate * 100) + '%' : '—'}
                  revokes={kpi ? Math.round(kpi.revokeRate * 100) + '%' : '—'}
                  fulfilments={kpi ? Math.round(kpi.fulfilmentRate24h * 100) + '%' : '—'}
                />
                <div className="row" style={{ marginTop: '1rem' }}>
                  <Link className="btn btn-chrome" to="/journeys">
                    Open journey
                  </Link>
                  <Link className="btn btn-ghost" style={{ color: 'var(--color-ink)', borderColor: 'var(--color-border)' }} to="/offers">
                    New offer
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </TrustPauseVeil>

      {incidents.length > 0 ? (
        <section className="panel form-card">
          <h2>Active trust alerts</h2>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--color-coral)' }}>
            {incidents.map((i) => (
              <li key={i.id}>{i.summary}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
