import type { ReactNode } from 'react';
import type { Offer } from '@/api/types';

type ValueOfferCardProps = {
  offer: Offer;
  paused?: boolean;
  actions?: ReactNode;
};

export function ValueOfferCard({ offer, paused = false, actions }: ValueOfferCardProps) {
  return (
    <article className={`panel form-card pause-veil ${paused || offer.status === 'paused' ? 'is-paused' : ''}`}>
      <span className="pause-label badge badge-coral">Paused</span>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span className="badge badge-foliage" style={{ fontFamily: 'var(--font-display)' }}>
          Offertrail
        </span>
        <span className={`badge ${offer.status === 'live' ? 'badge-foliage' : 'badge-amber'}`}>
          {offer.status}
        </span>
      </div>
      <h3 style={{ fontSize: '1.2rem' }}>{offer.name}</h3>
      <p style={{ marginBottom: '0.85rem' }}>{offer.valuePromise || 'Tangible return pending copy.'}</p>
      <dl style={{ margin: 0, display: 'grid', gap: '0.35rem', fontSize: '0.9rem' }}>
        <div>
          <dt className="muted" style={{ display: 'inline' }}>
            Purpose:{' '}
          </dt>
          <dd style={{ display: 'inline', margin: 0 }}>{offer.purpose}</dd>
        </div>
        <div>
          <dt className="muted" style={{ display: 'inline' }}>
            Categories:{' '}
          </dt>
          <dd style={{ display: 'inline', margin: 0 }}>{offer.dataCategories.join(', ')}</dd>
        </div>
        <div>
          <dt className="muted" style={{ display: 'inline' }}>
            Third-party:{' '}
          </dt>
          <dd style={{ display: 'inline', margin: 0 }}>{offer.thirdPartySharing}</dd>
        </div>
        <div>
          <dt className="muted" style={{ display: 'inline' }}>
            Retention:{' '}
          </dt>
          <dd style={{ display: 'inline', margin: 0 }}>{offer.retentionIntent}</dd>
        </div>
      </dl>
      {actions ? <div className="row" style={{ marginTop: '1rem' }}>{actions}</div> : null}
    </article>
  );
}
