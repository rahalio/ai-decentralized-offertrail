/**
 * VersionRepository — in-memory product sandbox.
 */

import type { VersionRepository } from '@offertrail/services/offers';
import {
  envelope,
  offerVersionsById,
  toPublicOffer,
} from '../_shared/product-sandbox-store.js';

export class VersionRepositoryDdb implements VersionRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listOfferVersions(
    input: Parameters<VersionRepository['listOfferVersions']>[0]
  ): Promise<Awaited<ReturnType<VersionRepository['listOfferVersions']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const offerId = String(raw.offerId ?? '');
    const items = [...offerVersionsById.values()]
      .filter((v) => v.offerId === offerId)
      .sort((a, b) => a.version - b.version)
      .map((v) => ({
        id: v.id,
        offerId: v.offerId,
        version: v.version,
        snapshot: toPublicOffer(v.snapshot),
        createdAt: v.createdAt,
      }));
    return envelope({ items }, correlationId) as never;
  }
}
