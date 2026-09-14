import { apiRequest, type DataEnvelope, type ListData } from '@/api/client';
import type { Journey } from '@/api/types';

export type JourneyCreate = {
  name: string;
  description?: string;
  owners?: string[];
};

export async function listJourneys(params?: { status?: string; limit?: number }) {
  return apiRequest<DataEnvelope<ListData<Journey>>>('/v1/journeys', { query: params });
}

export async function createJourney(body: JourneyCreate) {
  return apiRequest<DataEnvelope<Journey>>('/v1/journeys', {
    method: 'POST',
    body,
    idempotencyKey: crypto.randomUUID(),
  });
}

export async function archiveJourney(journeyId: string) {
  return apiRequest<DataEnvelope<Journey>>(`/v1/journeys/${journeyId}/archive`, {
    method: 'POST',
    idempotencyKey: crypto.randomUUID(),
  });
}
