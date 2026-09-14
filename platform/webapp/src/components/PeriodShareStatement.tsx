import type { AuditStatement } from '@/api/types';

type PeriodShareStatementProps = {
  statement: AuditStatement | null;
};

export function PeriodShareStatement({ statement }: PeriodShareStatementProps) {
  if (!statement) {
    return <div className="empty panel form-card">Select a period to load the audit statement.</div>;
  }

  return (
    <section className="panel form-card stack">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0 }}>Period share statement</h2>
        <span className="mono muted">{statement.period}</span>
      </div>
      <div className="row">
        <div>
          <div className="muted">Net lawful sharing</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--color-foliage-dim)' }}>
            {statement.netNewLawfulSharing}
          </div>
        </div>
        <div>
          <div className="muted">Net revocations</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--color-coral)' }}>
            {statement.netRevocations}
          </div>
        </div>
        <div>
          <div className="muted">Generated</div>
          <div className="mono">{new Date(statement.generatedAt).toLocaleString()}</div>
        </div>
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
            {statement.offers.map((o) => (
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
  );
}
