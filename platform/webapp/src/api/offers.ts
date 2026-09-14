import { apiRequest, type DataEnvelope, type ListData } from '@/api/client';
import type {
  ApprovalDecision,
  ApprovalRecord,
  ApprovalRole,
  Offer,
  ThirdPartySharing,
  ValueType,
} from '@/api/types';

export type OfferCreate = {
  journeyId: string;
  name: string;
  valueType: ValueType;
  purpose: string;
  dataCategories: string[];
  retentionIntent: string;
  valuePromise?: string;
  thirdPartySharing?: ThirdPartySharing;
  templateKey?: string;
};

export type OfferApprovalRequest = {
  role: ApprovalRole;
  decision: ApprovalDecision;
  rationale?: string;
};

export async function listOffers(params?: { journeyId?: string; status?: string; limit?: number }) {
  return apiRequest<DataEnvelope<ListData<Offer>>>('/v1/offers', { query: params });
}

export async function createOffer(body: OfferCreate) {
  return apiRequest<DataEnvelope<Offer>>('/v1/offers', {
    method: 'POST',
    body,
    idempotencyKey: crypto.randomUUID(),
  });
}

export async function submitOfferForApproval(offerId: string) {
  return apiRequest<DataEnvelope<Offer>>(`/v1/offers/${offerId}/submit-approval`, {
    method: 'POST',
    idempotencyKey: crypto.randomUUID(),
  });
}

export async function listPendingApprovals(params?: { role?: ApprovalRole; limit?: number }) {
  return apiRequest<DataEnvelope<ListData<Offer>>>('/v1/approvals', { query: params });
}

export async function recordOfferApproval(offerId: string, body: OfferApprovalRequest) {
  return apiRequest<DataEnvelope<ApprovalRecord>>(`/v1/offers/${offerId}/approval`, {
    method: 'POST',
    body,
    idempotencyKey: crypto.randomUUID(),
  });
}

export async function listOfferApprovals(offerId: string) {
  return apiRequest<DataEnvelope<ListData<ApprovalRecord>>>(`/v1/offers/${offerId}/approvals`);
}
