import { useEffect, useState } from 'react';
import {
  listOfferApprovals,
  listPendingApprovals,
  recordOfferApproval,
} from '@/api/offers';
import type { ApprovalDecision, ApprovalRecord, ApprovalRole, Offer } from '@/api/types';
import { ApprovalTripleGate } from '@/components/ApprovalTripleGate';
import { ValueOfferCard } from '@/components/ValueOfferCard';

export function ApprovalsPage() {
  const [queue, setQueue] = useState<Offer[]>([]);
  const [selected, setSelected] = useState<Offer | null>(null);
  const [records, setRecords] = useState<ApprovalRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function refreshQueue() {
    const res = await listPendingApprovals({ limit: 50 });
    setQueue(res.data.items);
  }

  useEffect(() => {
    refreshQueue().catch((e) => setError(e instanceof Error ? e.message : 'Failed to load queue'));
  }, []);

  async function selectOffer(offer: Offer) {
    setSelected(offer);
    setError(null);
    try {
      const res = await listOfferApprovals(offer.id);
      setRecords(res.data.items);
    } catch (err) {
      setRecords([]);
      setError(err instanceof Error ? err.message : 'Failed to load approvals');
    }
  }

  async function onDecide(role: ApprovalRole, decision: ApprovalDecision) {
    if (!selected) return;
    setBusy(true);
    setError(null);
    try {
      await recordOfferApproval(selected.id, {
        role,
        decision,
        rationale: decision === 'rejected' ? 'Needs minimisation' : 'Looks good',
      });
      const res = await listOfferApprovals(selected.id);
      setRecords(res.data.items);
      await refreshQueue();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Decision failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Approval queue</h1>
          <p>Business, privacy, and technology decisions before go-live.</p>
        </div>
      </header>
      {error ? <div className="error-banner">{error}</div> : null}

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 'var(--space-4)' }}>
        <div className="stack">
          {queue.length === 0 ? (
            <div className="panel form-card empty">No pending approvals.</div>
          ) : (
            queue.map((offer) => (
              <button
                key={offer.id}
                type="button"
                onClick={() => selectOffer(offer)}
                style={{
                  textAlign: 'left',
                  border: 'none',
                  padding: 0,
                  background: 'transparent',
                  cursor: 'pointer',
                }}
              >
                <ValueOfferCard offer={offer} />
              </button>
            ))
          )}
        </div>
        <aside className="panel form-card stack">
          <h2>Decision pane</h2>
          {selected ? (
            <>
              <p>
                Recording for <strong>{selected.name}</strong>
              </p>
              <ApprovalTripleGate records={records} onDecide={onDecide} busy={busy} />
            </>
          ) : (
            <div className="empty">Select an offer from the queue.</div>
          )}
        </aside>
      </div>
    </div>
  );
}
