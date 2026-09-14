import { apiRequest, type DataEnvelope, type ListData } from '@/api/client';
import type { ConsentEvent } from '@/api/types';

export async function listConsents(params?: {
  subjectRef?: string;
  offerId?: string;
  limit?: number;
}) {
  return apiRequest<DataEnvelope<ListData<ConsentEvent>>>('/v1/consents', { query: params });
}

export async function grantConsent(body: { offerId: string; subjectRef: string; channel?: string }) {
  return apiRequest<DataEnvelope<ConsentEvent>>('/v1/consents', {
    method: 'POST',
    body,
    idempotencyKey: crypto.randomUUID(),
  });
}

export async function revokeConsent(consentId: string, reason: string) {
  return apiRequest<DataEnvelope<{ consentId: string; revokedAt: string; reason: string }>>(
    `/v1/consents/${consentId}/revoke`,
    {
      method: 'POST',
      body: { reason },
      idempotencyKey: crypto.randomUUID(),
    },
  );
}
