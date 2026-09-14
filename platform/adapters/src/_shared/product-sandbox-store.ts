/**
 * Process-wide in-memory store for product-domain sandbox adapters.
 * Used when DynamoDB x-dynamodb metadata is absent — local API without Dynamo.
 */

import { ulid } from 'ulid';

export function productSandboxId(prefix: string): string {
  return `${prefix}_${ulid().toLowerCase()}`;
}

export function nowIso(): string {
  return new Date().toISOString();
}

export function meta(correlationId?: string) {
  return {
    correlationId,
    generatedAt: nowIso(),
  };
}

export function envelope<T>(data: T, correlationId?: string) {
  return { data, meta: meta(correlationId) };
}

export type JourneyStatus = 'draft' | 'active' | 'archived';
export type OrchestrationStatus = 'not_connected' | 'connected' | 'degraded';
export type OfferStatus =
  | 'draft'
  | 'pending_approval'
  | 'live'
  | 'paused'
  | 'retired';
export type ValueType =
  | 'discount'
  | 'service_upgrade'
  | 'choosable_third_party_share';
export type ThirdPartySharing = 'excluded' | 'optional';
export type ApprovalRole = 'business' | 'privacy' | 'technology';
export type ApprovalDecision = 'approved' | 'rejected' | 'change_requested';
export type ConsentStatus = 'active' | 'revoked' | 'paused';
export type StopProcessingStatus =
  | 'not_required'
  | 'in_progress'
  | 'completed'
  | 'stuck';
export type FulfilmentType =
  | 'coupon_issued'
  | 'service_unlocked'
  | 'discount_applied';
export type FulfilmentStatus = 'pending' | 'fulfilled' | 'failed';
export type IncidentSeverity = 'low' | 'medium' | 'high';
export type IncidentStatus = 'open' | 'mitigating' | 'closed';
export type OfferPauseClass = 'third_party_share' | 'all_live';

export interface SandboxJourney {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  status: JourneyStatus;
  owners?: string[];
  orchestrationStatus?: OrchestrationStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface SandboxOffer {
  id: string;
  orgId: string;
  journeyId: string;
  name: string;
  status: OfferStatus;
  valueType: ValueType;
  valuePromise?: string;
  purpose: string;
  dataCategories: string[];
  retentionIntent: string;
  thirdPartySharing: ThirdPartySharing;
  templateKey?: string;
  version: number;
  collectionFrozen?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface SandboxOfferVersion {
  id: string;
  offerId: string;
  version: number;
  snapshot: SandboxOffer;
  createdAt: string;
}

export interface SandboxApproval {
  id: string;
  offerId: string;
  role: ApprovalRole;
  decision: ApprovalDecision;
  rationale?: string;
  decidedAt: string;
  decidedBy?: string;
}

export interface SandboxConsent {
  id: string;
  orgId: string;
  offerId: string;
  subjectRef: string;
  status: ConsentStatus;
  channel?: string;
  grantedAt: string;
  stopProcessingStatus?: StopProcessingStatus;
  revokedAt?: string;
  revokeReason?: string;
}

export interface SandboxFulfilment {
  id: string;
  orgId: string;
  consentId: string;
  offerId: string;
  fulfilmentType: FulfilmentType;
  status: FulfilmentStatus;
  evidenceRef?: string;
  failureReason?: string;
  fulfilledAt?: string;
  createdAt: string;
}

export interface SandboxIncident {
  id: string;
  orgId: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  summary: string;
  linkedOfferIds?: string[];
  pausedOfferClass?: OfferPauseClass;
  createdAt: string;
  updatedAt?: string;
  closedAt?: string;
}

export const journeysById = new Map<string, SandboxJourney>();
export const offersById = new Map<string, SandboxOffer>();
export const offerVersionsById = new Map<string, SandboxOfferVersion>();
export const approvalsById = new Map<string, SandboxApproval>();
export const consentsById = new Map<string, SandboxConsent>();
export const fulfilmentsById = new Map<string, SandboxFulfilment>();
export const incidentsById = new Map<string, SandboxIncident>();

let seeded = false;

function seedDemoJourneys() {
  if (seeded) return;
  seeded = true;
  const now = nowIso();
  const orgId = 'tnt_demo';
  const seeds: Array<Pick<SandboxJourney, 'name' | 'description' | 'status'>> = [
    {
      name: 'Acquire',
      description: 'New-customer acquisition value offers',
      status: 'active',
    },
    {
      name: 'Loyalty',
      description: 'Retention and loyalty rewards',
      status: 'active',
    },
    {
      name: 'Win-back',
      description: 'Re-engage lapsed customers',
      status: 'draft',
    },
  ];
  for (const seed of seeds) {
    const id = productSandboxId('jrn');
    journeysById.set(id, {
      id,
      orgId,
      name: seed.name,
      description: seed.description,
      status: seed.status,
      owners: ['admin@demo.local'],
      orchestrationStatus: 'not_connected',
      createdAt: now,
      updatedAt: now,
    });
  }
}

/** Ensure demo journeys exist (idempotent). */
export function ensureProductSandboxSeeded(): void {
  seedDemoJourneys();
}

export function listJourneys(orgId?: string, status?: string): SandboxJourney[] {
  ensureProductSandboxSeeded();
  return [...journeysById.values()].filter((j) => {
    if (orgId && j.orgId !== orgId && orgId !== 'system') {
      // Demo seeds use tnt_demo; accept any org for local sandbox
      if (j.orgId !== 'tnt_demo') return false;
    }
    if (status && j.status !== status) return false;
    return true;
  });
}

export function listOffers(filters: {
  orgId?: string;
  journeyId?: string;
  status?: string;
}): SandboxOffer[] {
  ensureProductSandboxSeeded();
  return [...offersById.values()].filter((o) => {
    if (filters.journeyId && o.journeyId !== filters.journeyId) return false;
    if (filters.status && o.status !== filters.status) return false;
    return true;
  });
}

export function toPublicJourney(j: SandboxJourney) {
  return {
    id: j.id,
    name: j.name,
    description: j.description,
    status: j.status,
    owners: j.owners,
    orchestrationStatus: j.orchestrationStatus,
    createdAt: j.createdAt,
    updatedAt: j.updatedAt,
  };
}

export function toPublicOffer(o: SandboxOffer) {
  return {
    id: o.id,
    journeyId: o.journeyId,
    name: o.name,
    status: o.status,
    valueType: o.valueType,
    valuePromise: o.valuePromise,
    purpose: o.purpose,
    dataCategories: o.dataCategories,
    retentionIntent: o.retentionIntent,
    thirdPartySharing: o.thirdPartySharing,
    templateKey: o.templateKey,
    version: o.version,
    collectionFrozen: o.collectionFrozen,
    createdAt: o.createdAt,
    updatedAt: o.updatedAt,
  };
}

export function toPublicConsent(c: SandboxConsent) {
  return {
    id: c.id,
    offerId: c.offerId,
    subjectRef: c.subjectRef,
    status: c.status,
    channel: c.channel,
    grantedAt: c.grantedAt,
    stopProcessingStatus: c.stopProcessingStatus,
  };
}

export function toPublicFulfilment(f: SandboxFulfilment) {
  return {
    id: f.id,
    consentId: f.consentId,
    offerId: f.offerId,
    fulfilmentType: f.fulfilmentType,
    status: f.status,
    evidenceRef: f.evidenceRef,
    failureReason: f.failureReason,
    fulfilledAt: f.fulfilledAt,
    createdAt: f.createdAt,
  };
}

export function toPublicIncident(i: SandboxIncident) {
  return {
    id: i.id,
    severity: i.severity,
    status: i.status,
    summary: i.summary,
    linkedOfferIds: i.linkedOfferIds,
    pausedOfferClass: i.pausedOfferClass,
    createdAt: i.createdAt,
    updatedAt: i.updatedAt,
    closedAt: i.closedAt,
  };
}

export function snapshotOfferVersion(offer: SandboxOffer): SandboxOfferVersion {
  const version: SandboxOfferVersion = {
    id: productSandboxId('ovn'),
    offerId: offer.id,
    version: offer.version,
    snapshot: { ...offer },
    createdAt: nowIso(),
  };
  offerVersionsById.set(version.id, version);
  return version;
}

/** Build offer contribution rows for reporting aggregates. */
export function offerContributions(journeyId?: string) {
  const offers = listOffers({ journeyId });
  return offers.map((offer) => {
    const consents = [...consentsById.values()].filter(
      (c) => c.offerId === offer.id
    );
    const optIns = consents.filter((c) => c.status === 'active').length;
    const revocations = consents.filter((c) => c.status === 'revoked').length;
    const fulfilments = [...fulfilmentsById.values()].filter(
      (f) => f.offerId === offer.id && f.status === 'fulfilled'
    ).length;
    return {
      offerId: offer.id,
      offerName: offer.name,
      optIns,
      revocations,
      fulfilments,
      netLawfulSharing: optIns - revocations,
    };
  });
}

export function ratesForOffers(journeyId?: string) {
  const rows = offerContributions(journeyId);
  const optIns = rows.reduce((s, r) => s + r.optIns, 0);
  const revocations = rows.reduce((s, r) => s + r.revocations, 0);
  const fulfilments = rows.reduce((s, r) => s + r.fulfilments, 0);
  const denom = Math.max(optIns + revocations, 1);
  return {
    optInRate: optIns / denom,
    revokeRate: revocations / denom,
    fulfilmentRate24h: optIns > 0 ? fulfilments / optIns : 0,
    offers: rows,
    netNewLawfulSharing: optIns,
    netRevocations: revocations,
  };
}
