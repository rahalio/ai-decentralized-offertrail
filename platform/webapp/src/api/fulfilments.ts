import { apiRequest, type DataEnvelope, type ListData } from '@/api/client';
import type { FulfilmentProof, FulfilmentType } from '@/api/types';

export async function listFulfilments(params?: {
  status?: string;
  offerId?: string;
  consentId?: string;
  limit?: number;
}) {
  return apiRequest<DataEnvelope<ListData<FulfilmentProof>>>('/v1/fulfilments', { query: params });
}

export async function recordFulfilment(body: {
  consentId: string;
  fulfilmentType: FulfilmentType;
  evidenceRef: string;
  fulfilledAt?: string;
}) {
  return apiRequest<DataEnvelope<FulfilmentProof>>('/v1/fulfilments', {
    method: 'POST',
    body,
    idempotencyKey: crypto.randomUUID(),
  });
}

export async function freezeOfferCollection(offerId: string, reason?: string) {
  return apiRequest<DataEnvelope<{ offerId: string; collectionFrozen: boolean; reason?: string }>>(
    `/v1/offers/${offerId}/freeze-collection`,
    {
      method: 'POST',
      body: reason ? { reason } : undefined,
      idempotencyKey: crypto.randomUUID(),
    },
  );
}
