import type { ConsentEvent, FulfilmentProof } from '@/api/types';

type ConsentFulfilmentJoinProps = {
  consents: ConsentEvent[];
  fulfilments: FulfilmentProof[];
};

export function ConsentFulfilmentJoin({ consents, fulfilments }: ConsentFulfilmentJoinProps) {
  const byConsent = new Map(fulfilments.map((f) => [f.consentId, f]));

  if (consents.length === 0) {
    return <div className="empty">No consent↔fulfilment joins yet.</div>;
  }

  return (
    <div className="table-wrap panel form-card">
      <table className="data">
        <thead>
          <tr>
            <th>Consent</th>
            <th>Subject</th>
            <th>Offer</th>
            <th>Fulfilment</th>
            <th>Evidence</th>
          </tr>
        </thead>
        <tbody>
          {consents.map((c) => {
            const f = byConsent.get(c.id);
            const done = f?.status === 'fulfilled';
            return (
              <tr key={c.id}>
                <td className="mono">{c.id}</td>
                <td>{c.subjectRef}</td>
                <td className="mono">{c.offerId}</td>
                <td>
                  <span className="row">
                    <span className={`fulfil-check ${done ? 'is-done' : ''}`} aria-hidden>
                      ✓
                    </span>
                    <span className={done ? 'badge badge-foliage' : 'badge badge-amber'}>
                      {f?.status ?? 'awaiting'}
                    </span>
                  </span>
                </td>
                <td className="mono">{f?.evidenceRef ?? '—'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
