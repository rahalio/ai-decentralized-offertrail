/**
 * FreezeCollectionRepository — in-memory product sandbox.
 */

import type { FreezeCollectionRepository } from '@offertrail/services/fulfilments';
import {
  envelope,
  nowIso,
  offersById,
} from '../_shared/product-sandbox-store.js';

export class FreezeCollectionRepositoryDdb
  implements FreezeCollectionRepository
{
  constructor(private readonly _dynamoClient: unknown) {}

  async freezeOfferCollection(
    input: Parameters<FreezeCollectionRepository['freezeOfferCollection']>[0]
  ): Promise<
    Awaited<ReturnType<FreezeCollectionRepository['freezeOfferCollection']>>
  > {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const offerId = String(raw.offerId ?? '');
    const offer = offersById.get(offerId);
    if (!offer) return null as never;

    offer.collectionFrozen = true;
    offer.updatedAt = nowIso();
    offersById.set(offerId, offer);

    return envelope(
      {
        offerId,
        collectionFrozen: true,
        reason: String(raw.reason ?? 'fulfilment-failure'),
      },
      correlationId
    ) as never;
  }
}
