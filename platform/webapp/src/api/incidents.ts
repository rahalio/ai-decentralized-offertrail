import { apiRequest, type DataEnvelope, type ListData } from '@/api/client';
import type { TrustIncident } from '@/api/types';

export async function listTrustIncidents(params?: { status?: string; limit?: number }) {
  return apiRequest<DataEnvelope<ListData<TrustIncident>>>('/v1/incidents', { query: params });
}

export async function declareTrustIncident(body: {
  severity: 'low' | 'medium' | 'high';
  summary: string;
  linkedOfferIds?: string[];
}) {
  return apiRequest<DataEnvelope<TrustIncident>>('/v1/incidents', {
    method: 'POST',
    body,
    idempotencyKey: crypto.randomUUID(),
  });
}

export async function pauseOffersForIncident(
  incidentId: string,
  offerClass: 'third_party_share' | 'all_live',
) {
  return apiRequest<DataEnvelope<TrustIncident>>(`/v1/incidents/${incidentId}/pause-offers`, {
    method: 'POST',
    body: { offerClass },
    idempotencyKey: crypto.randomUUID(),
  });
}

export async function resumeOffersForIncident(incidentId: string) {
  return apiRequest<DataEnvelope<TrustIncident>>(`/v1/incidents/${incidentId}/resume-offers`, {
    method: 'POST',
    body: { confirm: true },
    idempotencyKey: crypto.randomUUID(),
  });
}
