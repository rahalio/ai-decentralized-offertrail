import { FormEvent, useEffect, useState } from 'react';
import { listJourneys } from '@/api/journeys';
import { createOffer, listOffers, submitOfferForApproval } from '@/api/offers';
import type { Journey, Offer, ValueType } from '@/api/types';
import { ValueOfferCard } from '@/components/ValueOfferCard';

export function OffersPage() {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    journeyId: '',
    name: '',
    valueType: 'discount' as ValueType,
    purpose: 'Loyalty birthday reward',
    dataCategories: 'date_of_birth, email',
    retentionIntent: 'Retain while enrolled in programme',
    valuePromise: 'Birthday coupon after opt-in',
    thirdPartySharing: 'excluded' as 'excluded' | 'optional',
  });

  async function refresh() {
    const [j, o] = await Promise.all([listJourneys({ limit: 50 }), listOffers({ limit: 50 })]);
    setJourneys(j.data.items);
    setOffers(o.data.items);
    if (!form.journeyId && j.data.items[0]) {
      setForm((f) => ({ ...f, journeyId: j.data.items[0].id }));
    }
  }

  useEffect(() => {
    refresh().catch((e) => setError(e instanceof Error ? e.message : 'Failed to load offers'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await createOffer({
        journeyId: form.journeyId,
        name: form.name,
        valueType: form.valueType,
        purpose: form.purpose,
        dataCategories: form.dataCategories.split(',').map((s) => s.trim()).filter(Boolean),
        retentionIntent: form.retentionIntent,
        valuePromise: form.valuePromise,
        thirdPartySharing: form.thirdPartySharing,
      });
      setForm((f) => ({ ...f, name: '' }));
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Create failed');
    } finally {
      setBusy(false);
    }
  }

  async function onSubmit(offerId: string) {
    setBusy(true);
    setError(null);
    try {
      await submitOfferForApproval(offerId);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submit failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Offer catalogue</h1>
          <p>Package tangible returns bound to purpose and data categories.</p>
        </div>
      </header>
      {error ? <div className="error-banner">{error}</div> : null}

      <form className="panel form-card stack" onSubmit={onCreate}>
        <h2>Create draft offer</h2>
        <div className="row">
          <label className="field">
            Journey
            <select
              value={form.journeyId}
              onChange={(e) => setForm({ ...form, journeyId: e.target.value })}
              required
            >
              <option value="" disabled>
                Select journey
              </option>
              {journeys.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.name}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            Name
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </label>
          <label className="field">
            Value type
            <select
              value={form.valueType}
              onChange={(e) => setForm({ ...form, valueType: e.target.value as ValueType })}
            >
              <option value="discount">discount</option>
              <option value="service_upgrade">service_upgrade</option>
              <option value="choosable_third_party_share">choosable_third_party_share</option>
            </select>
          </label>
        </div>
        <div className="row">
          <label className="field">
            Purpose
            <input value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} required />
          </label>
          <label className="field">
            Categories (comma-separated)
            <input
              value={form.dataCategories}
              onChange={(e) => setForm({ ...form, dataCategories: e.target.value })}
              required
            />
          </label>
        </div>
        <div className="row">
          <label className="field">
            Retention
            <input
              value={form.retentionIntent}
              onChange={(e) => setForm({ ...form, retentionIntent: e.target.value })}
              required
            />
          </label>
          <label className="field">
            Value promise
            <input
              value={form.valuePromise}
              onChange={(e) => setForm({ ...form, valuePromise: e.target.value })}
            />
          </label>
          <label className="field">
            Third-party
            <select
              value={form.thirdPartySharing}
              onChange={(e) =>
                setForm({ ...form, thirdPartySharing: e.target.value as 'excluded' | 'optional' })
              }
            >
              <option value="excluded">excluded</option>
              <option value="optional">optional</option>
            </select>
          </label>
        </div>
        <button className="btn" type="submit" disabled={busy || !form.journeyId}>
          Save draft
        </button>
      </form>

      <div className="grid-cards">
        {offers.map((offer) => (
          <ValueOfferCard
            key={offer.id}
            offer={offer}
            actions={
              offer.status === 'draft' ? (
                <button type="button" className="btn" disabled={busy} onClick={() => onSubmit(offer.id)}>
                  Submit for approval
                </button>
              ) : null
            }
          />
        ))}
      </div>
      {offers.length === 0 ? <div className="empty panel form-card">No offers yet.</div> : null}
    </div>
  );
}
