/**
 * ArchiveRepository — in-memory product sandbox.
 */

import type { ArchiveRepository } from '@offertrail/services/journeys';
import {
  envelope,
  ensureProductSandboxSeeded,
  journeysById,
  nowIso,
  toPublicJourney,
} from '../_shared/product-sandbox-store.js';

export class ArchiveRepositoryDdb implements ArchiveRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async archiveJourney(
    input: Parameters<ArchiveRepository['archiveJourney']>[0]
  ): Promise<Awaited<ReturnType<ArchiveRepository['archiveJourney']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const journeyId = String(raw.journeyId ?? raw.id ?? '');
    ensureProductSandboxSeeded();
    const existing = journeysById.get(journeyId);
    if (!existing) return null as never;
    existing.status = 'archived';
    existing.updatedAt = nowIso();
    journeysById.set(journeyId, existing);
    return envelope(toPublicJourney(existing), correlationId) as never;
  }
}
