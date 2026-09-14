/**
 * OfferRepository — in-memory product sandbox.
 */

import type { OfferRepository } from '@offertrail/services/offers';
import {
  envelope,
  ensureProductSandboxSeeded,
  listOffers,
  nowIso,
  offersById,
  productSandboxId,
  snapshotOfferVersion,
  toPublicOffer,
  type SandboxOffer,
  type ThirdPartySharing,
  type ValueType,
} from '../_shared/product-sandbox-store.js';

export class OfferRepositoryDdb implements OfferRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listOffers(
    input: Parameters<OfferRepository['listOffers']>[0]
  ): Promise<Awaited<ReturnType<OfferRepository['listOffers']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    ensureProductSandboxSeeded();
    const items = listOffers({
      journeyId: raw.journeyId ? String(raw.journeyId) : undefined,
      status: raw.status ? String(raw.status) : undefined,
    }).map(toPublicOffer);
    return envelope({ items }, correlationId) as never;
  }

  async createOffer(
    input: Parameters<OfferRepository['createOffer']>[0]
  ): Promise<Awaited<ReturnType<OfferRepository['createOffer']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const orgId = String(raw.orgId ?? 'tnt_demo');
    const id = String(raw.id ?? productSandboxId('ofr'));
    const now = nowIso();
    const offer: SandboxOffer = {
      id,
      orgId,
      journeyId: String(raw.journeyId ?? ''),
      name: String(raw.name ?? 'Untitled offer'),
      status: 'draft',
      valueType: String(raw.valueType ?? 'discount') as ValueType,
      valuePromise: raw.valuePromise ? String(raw.valuePromise) : undefined,
      purpose: String(raw.purpose ?? ''),
      dataCategories: Array.isArray(raw.dataCategories)
        ? (raw.dataCategories as string[])
        : [],
      retentionIntent: String(raw.retentionIntent ?? ''),
      thirdPartySharing: String(
        raw.thirdPartySharing ?? 'excluded'
      ) as ThirdPartySharing,
      templateKey: raw.templateKey ? String(raw.templateKey) : undefined,
      version: 1,
      collectionFrozen: false,
      createdAt: now,
      updatedAt: now,
    };
    offersById.set(id, offer);
    snapshotOfferVersion(offer);
    return envelope(toPublicOffer(offer), correlationId) as never;
  }

  async getOffer(
    input: Parameters<OfferRepository['getOffer']>[0]
  ): Promise<Awaited<ReturnType<OfferRepository['getOffer']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const offerId = String(raw.offerId ?? raw.id ?? '');
    const offer = offersById.get(offerId);
    if (!offer) return null as never;
    return envelope(toPublicOffer(offer), correlationId) as never;
  }

  async updateOffer(
    input: Parameters<OfferRepository['updateOffer']>[0]
  ): Promise<Awaited<ReturnType<OfferRepository['updateOffer']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const offerId = String(raw.offerId ?? raw.id ?? '');
    const existing = offersById.get(offerId);
    if (!existing) return null as never;

    if (raw.name !== undefined) existing.name = String(raw.name);
    if (raw.valuePromise !== undefined)
      existing.valuePromise = String(raw.valuePromise);
    if (raw.purpose !== undefined) existing.purpose = String(raw.purpose);
    if (raw.dataCategories !== undefined && Array.isArray(raw.dataCategories))
      existing.dataCategories = raw.dataCategories as string[];
    if (raw.retentionIntent !== undefined)
      existing.retentionIntent = String(raw.retentionIntent);
    if (raw.thirdPartySharing !== undefined)
      existing.thirdPartySharing = String(
        raw.thirdPartySharing
      ) as ThirdPartySharing;
    existing.updatedAt = nowIso();
    offersById.set(offerId, existing);
    return envelope(toPublicOffer(existing), correlationId) as never;
  }
}
