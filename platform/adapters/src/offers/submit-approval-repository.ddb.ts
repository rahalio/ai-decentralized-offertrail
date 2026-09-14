/**
 * SubmitApprovalRepository — in-memory product sandbox.
 */

import type { SubmitApprovalRepository } from '@offertrail/services/offers';
import {
  envelope,
  nowIso,
  offersById,
  snapshotOfferVersion,
  toPublicOffer,
} from '../_shared/product-sandbox-store.js';

export class SubmitApprovalRepositoryDdb implements SubmitApprovalRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async submitOfferForApproval(
    input: Parameters<SubmitApprovalRepository['submitOfferForApproval']>[0]
  ): Promise<
    Awaited<ReturnType<SubmitApprovalRepository['submitOfferForApproval']>>
  > {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const offerId = String(raw.offerId ?? '');
    const offer = offersById.get(offerId);
    if (!offer) return null as never;

    offer.status = 'pending_approval';
    offer.version += 1;
    offer.updatedAt = nowIso();
    offersById.set(offerId, offer);
    snapshotOfferVersion(offer);
    return envelope(toPublicOffer(offer), correlationId) as never;
  }
}
