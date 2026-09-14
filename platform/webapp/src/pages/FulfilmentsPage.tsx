import { FormEvent, useEffect, useState } from 'react';
import { listConsents } from '@/api/consents';
import {
  freezeOfferCollection,
  listFulfilments,
  recordFulfilment,
} from '@/api/fulfilments';
import type { ConsentEvent, FulfilmentProof, FulfilmentType } from '@/api/types';
import { ConsentFulfilmentJoin } from '@/components/ConsentFulfilmentJoin';

export function FulfilmentsPage() {
  const [items, setItems] = useState<FulfilmentProof[]>([]);
  const [consents, setConsents] = useState<ConsentEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    consentId: '',
    fulfilmentType: 'coupon_issued' as FulfilmentType,
    evidenceRef: '',
    freezeOfferId: '',
  });

  async function refresh() {
    const [f, c] = await Promise.all([
      listFulfilments({ limit: 50 }),
      listConsents({ limit: 50 }),
    ]);
    setItems(f.data.items);
    setConsents(c.data.items);
  }

  useEffect(() => {
    refresh().catch((e) => setError(e instanceof Error ? e.message : 'Failed to load fulfilments'));
  }, []);

  async function onRecord(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await recordFulfilment({
        consentId: form.consentId,
        fulfilmentType: form.fulfilmentType,
        evidenceRef: form.evidenceRef,
      });
      setForm((f) => ({ ...f, evidenceRef: '' }));
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Record failed');
    } finally {
      setBusy(false);
    }
  }

  async function onFreeze(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await freezeOfferCollection(form.freezeOfferId, 'Fulfilment failure freeze');
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Freeze failed');
    } finally {
      setBusy(false);
    }
  }

  const pendingAmber = items.filter((i) => i.status === 'pending').length;

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Fulfilment evidence</h1>
          <p>Prove coupon or service unlock landed against the consent event.</p>
        </div>
        {pendingAmber > 0 ? (
          <span className="badge badge-amber">{pendingAmber} pending within 24h window</span>
        ) : null}
      </header>
      {error ? <div className="error-banner">{error}</div> : null}

      <form className="panel form-card stack" onSubmit={onRecord}>
        <h2>Record fulfilment</h2>
        <div className="row">
          <label className="field">
            Consent id
            <input
              value={form.consentId}
              onChange={(e) => setForm({ ...form, consentId: e.target.value })}
              className="mono"
              required
            />
          </label>
          <label className="field">
            Type
            <select
              value={form.fulfilmentType}
              onChange={(e) =>
                setForm({ ...form, fulfilmentType: e.target.value as FulfilmentType })
              }
            >
              <option value="coupon_issued">coupon_issued</option>
              <option value="service_unlocked">service_unlocked</option>
              <option value="discount_applied">discount_applied</option>
            </select>
          </label>
          <label className="field">
            Evidence ref
            <input
              value={form.evidenceRef}
              onChange={(e) => setForm({ ...form, evidenceRef: e.target.value })}
              required
            />
          </label>
          <button className="btn" type="submit" disabled={busy}>
            Record
          </button>
        </div>
      </form>

      <form className="panel form-card row" onSubmit={onFreeze}>
        <label className="field">
          Freeze collection for offer
          <input
            value={form.freezeOfferId}
            onChange={(e) => setForm({ ...form, freezeOfferId: e.target.value })}
            className="mono"
            placeholder="ofr_…"
            required
          />
        </label>
        <button className="btn btn-amber" type="submit" disabled={busy}>
          Freeze collection
        </button>
      </form>

      <ConsentFulfilmentJoin consents={consents} fulfilments={items} />
    </div>
  );
}
