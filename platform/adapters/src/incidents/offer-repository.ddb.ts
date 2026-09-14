/**
 * Offer pause/resume — in-memory product sandbox.
 * Updates offer status in the shared product sandbox store.
 */

import type {
  PauseOfferRepository,
  ResumeOfferRepository,
} from '@offertrail/services/incidents';
import {
  envelope,
  incidentsById,
  listOffers,
  nowIso,
  offersById,
  toPublicIncident,
  type OfferPauseClass,
} from '../_shared/product-sandbox-store.js';

type PauseInput = Parameters<PauseOfferRepository['pauseOffersForIncident']>[0];
type PauseOutput = Awaited<
  ReturnType<PauseOfferRepository['pauseOffersForIncident']>
>;
type ResumeInput = Parameters<
  ResumeOfferRepository['resumeOffersForIncident']
>[0];
type ResumeOutput = Awaited<
  ReturnType<ResumeOfferRepository['resumeOffersForIncident']>
>;

export class OfferRepositoryDdb {
  constructor(private readonly _dynamoClient: unknown) {}

  async pauseOffersForIncident(input: PauseInput): Promise<PauseOutput> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const incidentId = String(raw.incidentId ?? '');
    const offerClass = String(
      raw.offerClass ?? 'all_live'
    ) as OfferPauseClass;

    const incident = incidentsById.get(incidentId);
    if (!incident) return null as never;

    const pausedIds: string[] = [];
    for (const offer of listOffers({})) {
      if (offer.status !== 'live') continue;
      if (
        offerClass === 'third_party_share' &&
        offer.thirdPartySharing !== 'optional'
      ) {
        continue;
      }
      offer.status = 'paused';
      offer.updatedAt = nowIso();
      offersById.set(offer.id, offer);
      pausedIds.push(offer.id);
    }

    incident.status = 'mitigating';
    incident.pausedOfferClass = offerClass;
    incident.linkedOfferIds = [
      ...new Set([...(incident.linkedOfferIds ?? []), ...pausedIds]),
    ];
    incident.updatedAt = nowIso();
    incidentsById.set(incidentId, incident);

    return envelope(toPublicIncident(incident), correlationId) as PauseOutput;
  }

  async resumeOffersForIncident(input: ResumeInput): Promise<ResumeOutput> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const incidentId = String(raw.incidentId ?? '');
    // Use-case layer often strips `confirm`; sandbox treats missing as confirmed
    if (raw.confirm === false) {
      throw new Error('confirm must be true to resume offers');
    }

    const incident = incidentsById.get(incidentId);
    if (!incident) return null as never;

    const linked = new Set(incident.linkedOfferIds ?? []);
    for (const offer of listOffers({})) {
      if (offer.status !== 'paused') continue;
      if (linked.size > 0 && !linked.has(offer.id)) continue;
      offer.status = 'live';
      offer.updatedAt = nowIso();
      offersById.set(offer.id, offer);
    }

    const now = nowIso();
    incident.status = 'closed';
    incident.closedAt = now;
    incident.updatedAt = now;
    incidentsById.set(incidentId, incident);

    return envelope(toPublicIncident(incident), correlationId) as ResumeOutput;
  }
}
