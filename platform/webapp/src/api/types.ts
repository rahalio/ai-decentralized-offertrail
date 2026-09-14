export type JourneyStatus = 'draft' | 'active' | 'archived';

export type Journey = {
  id: string;
  name: string;
  description?: string;
  status: JourneyStatus;
  owners?: string[];
  orchestrationStatus?: 'not_connected' | 'connected' | 'degraded';
  createdAt: string;
  updatedAt?: string;
};

export type OfferStatus = 'draft' | 'pending_approval' | 'live' | 'paused' | 'retired';
export type ValueType = 'discount' | 'service_upgrade' | 'choosable_third_party_share';
export type ThirdPartySharing = 'excluded' | 'optional';
export type ApprovalRole = 'business' | 'privacy' | 'technology';
export type ApprovalDecision = 'approved' | 'rejected' | 'change_requested';

export type Offer = {
  id: string;
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
};

export type ApprovalRecord = {
  id: string;
  offerId: string;
  role: ApprovalRole;
  decision: ApprovalDecision;
  rationale?: string;
  decidedAt: string;
  decidedBy?: string;
};

export type ConsentStatus = 'active' | 'revoked' | 'paused';

export type ConsentEvent = {
  id: string;
  offerId: string;
  subjectRef: string;
  status: ConsentStatus;
  channel?: string;
  grantedAt: string;
  stopProcessingStatus?: 'not_required' | 'in_progress' | 'completed' | 'stuck';
};

export type FulfilmentStatus = 'pending' | 'fulfilled' | 'failed';
export type FulfilmentType = 'coupon_issued' | 'service_unlocked' | 'discount_applied';

export type FulfilmentProof = {
  id: string;
  consentId: string;
  offerId: string;
  fulfilmentType: FulfilmentType;
  status: FulfilmentStatus;
  evidenceRef?: string;
  failureReason?: string;
  fulfilledAt?: string;
  createdAt: string;
};

export type TrustIncident = {
  id: string;
  severity: 'low' | 'medium' | 'high';
  status: 'open' | 'mitigating' | 'closed';
  summary: string;
  linkedOfferIds?: string[];
  pausedOfferClass?: 'third_party_share' | 'all_live';
  createdAt: string;
  updatedAt?: string;
  closedAt?: string;
};

export type OfferContribution = {
  offerId: string;
  offerName?: string;
  optIns?: number;
  revocations?: number;
  fulfilments?: number;
  netLawfulSharing?: number;
};

export type OfferPerformanceReport = {
  journeyId?: string;
  period: string;
  optInRate: number;
  revokeRate: number;
  fulfilmentRate24h: number;
  offers: OfferContribution[];
};

export type AuditStatement = {
  period: string;
  journeyId?: string;
  generatedAt: string;
  netNewLawfulSharing: number;
  netRevocations: number;
  offers: OfferContribution[];
  exportFormat?: 'json' | 'csv';
};

export type JourneyCompareRow = {
  journeyId: string;
  journeyName: string;
  optInRate: number;
  revokeRate: number;
  fulfilmentRate24h: number;
};

export type JourneyCompareReport = {
  period: string;
  journeys: JourneyCompareRow[];
};
