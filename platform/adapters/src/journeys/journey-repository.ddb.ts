/**
 * JourneyRepository — in-memory product sandbox.
 */

import type { JourneyRepository } from '@offertrail/services/journeys';
import {
  envelope,
  ensureProductSandboxSeeded,
  journeysById,
  listJourneys,
  nowIso,
  productSandboxId,
  toPublicJourney,
  type JourneyStatus,
  type OrchestrationStatus,
  type SandboxJourney,
} from '../_shared/product-sandbox-store.js';

export class JourneyRepositoryDdb implements JourneyRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listJourneys(
    input: Parameters<JourneyRepository['listJourneys']>[0]
  ): Promise<Awaited<ReturnType<JourneyRepository['listJourneys']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const orgId = String(raw.orgId ?? 'tnt_demo');
    const status = raw.status ? String(raw.status) : undefined;
    ensureProductSandboxSeeded();
    const items = listJourneys(orgId, status).map(toPublicJourney);
    return envelope({ items }, correlationId) as never;
  }

  async createJourney(
    input: Parameters<JourneyRepository['createJourney']>[0]
  ): Promise<Awaited<ReturnType<JourneyRepository['createJourney']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const orgId = String(raw.orgId ?? 'tnt_demo');
    const id = String(raw.id ?? productSandboxId('jrn'));
    const now = nowIso();
    const journey: SandboxJourney = {
      id,
      orgId,
      name: String(raw.name ?? 'Untitled journey'),
      description: raw.description ? String(raw.description) : undefined,
      status: 'draft',
      owners: Array.isArray(raw.owners) ? (raw.owners as string[]) : undefined,
      orchestrationStatus: 'not_connected',
      createdAt: now,
      updatedAt: now,
    };
    journeysById.set(id, journey);
    return envelope(toPublicJourney(journey), correlationId) as never;
  }

  async getJourney(
    input: Parameters<JourneyRepository['getJourney']>[0]
  ): Promise<Awaited<ReturnType<JourneyRepository['getJourney']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const journeyId = String(raw.journeyId ?? raw.id ?? '');
    ensureProductSandboxSeeded();
    const journey = journeysById.get(journeyId);
    if (!journey) return null as never;
    return envelope(toPublicJourney(journey), correlationId) as never;
  }

  async updateJourney(
    input: Parameters<JourneyRepository['updateJourney']>[0]
  ): Promise<Awaited<ReturnType<JourneyRepository['updateJourney']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const journeyId = String(raw.journeyId ?? raw.id ?? '');
    ensureProductSandboxSeeded();
    const existing = journeysById.get(journeyId);
    if (!existing) return null as never;

    if (raw.name !== undefined) existing.name = String(raw.name);
    if (raw.description !== undefined)
      existing.description = String(raw.description);
    if (raw.owners !== undefined)
      existing.owners = Array.isArray(raw.owners)
        ? (raw.owners as string[])
        : existing.owners;
    if (raw.status !== undefined)
      existing.status = String(raw.status) as JourneyStatus;
    if (raw.orchestrationStatus !== undefined)
      existing.orchestrationStatus = String(
        raw.orchestrationStatus
      ) as OrchestrationStatus;
    existing.updatedAt = nowIso();
    journeysById.set(journeyId, existing);
    return envelope(toPublicJourney(existing), correlationId) as never;
  }
}
