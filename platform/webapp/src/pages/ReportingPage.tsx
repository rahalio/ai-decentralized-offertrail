import { FormEvent, useState } from 'react';
import {
  compareJourneys,
  getAuditStatement,
  getOfferPerformanceReport,
} from '@/api/reporting';
import type {
  AuditStatement,
  JourneyCompareReport,
  OfferPerformanceReport,
} from '@/api/types';
import { PeriodShareStatement } from '@/components/PeriodShareStatement';

export function ReportingPage() {
  const [period, setPeriod] = useState(
    `${new Date().getFullYear()}-Q${Math.floor(new Date().getMonth() / 3) + 1}`,
  );
  const [performance, setPerformance] = useState<OfferPerformanceReport | null>(null);
  const [statement, setStatement] = useState<AuditStatement | null>(null);
  const [compare, setCompare] = useState<JourneyCompareReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onLoad(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const [p, a, c] = await Promise.all([
        getOfferPerformanceReport({ period }),
        getAuditStatement({ period, format: 'json' }),
        compareJourneys(period),
      ]);
      setPerformance(p.data);
      setStatement(a.data);
      setCompare(c.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Report load failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Reporting</h1>
          <p>Net lawful sharing vs revocations — period board pack.</p>
        </div>
      </header>
      {error ? <div className="error-banner">{error}</div> : null}

      <form className="panel form-card row" onSubmit={onLoad}>
        <label className="field">
          Period
          <input value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="2026-Q1" required />
        </label>
        <button className="btn" type="submit" disabled={busy}>
          Load reports
        </button>
      </form>

      {performance ? (
        <section className="panel form-card stack">
          <h2>Offer performance</h2>
          <div className="row">
            <Stat label="Opt-in rate" value={`${Math.round(performance.optInRate * 100)}%`} />
            <Stat label="Revoke rate" value={`${Math.round(performance.revokeRate * 100)}%`} tone="coral" />
            <Stat
              label="Fulfilment 24h"
              value={`${Math.round(performance.fulfilmentRate24h * 100)}%`}
              tone="foliage"
            />
          </div>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Offer</th>
                  <th>Opt-ins</th>
                  <th>Revokes</th>
                  <th>Fulfilments</th>
                  <th>Net</th>
                </tr>
              </thead>
              <tbody>
                {performance.offers.map((o) => (
                  <tr key={o.offerId}>
                    <td>{o.offerName || o.offerId}</td>
                    <td>{o.optIns ?? 0}</td>
                    <td>{o.revocations ?? 0}</td>
                    <td>{o.fulfilments ?? 0}</td>
                    <td>{o.netLawfulSharing ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <PeriodShareStatement statement={statement} />

      {compare ? (
        <section className="panel form-card stack">
          <h2>Journey compare</h2>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Journey</th>
                  <th>Opt-in</th>
                  <th>Revoke</th>
                  <th>Fulfil 24h</th>
                </tr>
              </thead>
              <tbody>
                {compare.journeys.map((j) => (
                  <tr key={j.journeyId}>
                    <td>{j.journeyName}</td>
                    <td>{Math.round(j.optInRate * 100)}%</td>
                    <td>{Math.round(j.revokeRate * 100)}%</td>
                    <td>{Math.round(j.fulfilmentRate24h * 100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {compare.journeys.length === 0 ? (
            <div className="empty">Empty period — no journey metrics yet.</div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: 'coral' | 'foliage';
}) {
  const color =
    tone === 'coral'
      ? 'var(--color-coral)'
      : tone === 'foliage'
        ? 'var(--color-foliage-dim)'
        : 'var(--color-ink)';
  return (
    <div>
      <div className="muted">{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color }}>{value}</div>
    </div>
  );
}
