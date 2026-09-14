/**
 * FulfilmentRepository — in-memory product sandbox.
 */

import type { FulfilmentRepository } from '@offertrail/services/fulfilments';
import {
  consentsById,
  envelope,
  fulfilmentsById,
  nowIso,
  productSandboxId,
  toPublicFulfilment,
  type FulfilmentType,
  type SandboxFulfilment,
} from '../_shared/product-sandbox-store.js';

export class FulfilmentRepositoryDdb implements FulfilmentRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listFulfilments(
    input: Parameters<FulfilmentRepository['listFulfilments']>[0]
  ): Promise<Awaited<ReturnType<FulfilmentRepository['listFulfilments']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const status = raw.status ? String(raw.status) : undefined;
    const offerId = raw.offerId ? String(raw.offerId) : undefined;
    const consentId = raw.consentId ? String(raw.consentId) : undefined;
    const items = [...fulfilmentsById.values()]
      .filter((f) => {
        if (status && f.status !== status) return false;
        if (offerId && f.offerId !== offerId) return false;
        if (consentId && f.consentId !== consentId) return false;
        return true;
      })
      .map(toPublicFulfilment);
    return envelope({ items }, correlationId) as never;
  }

  async recordFulfilment(
    input: Parameters<FulfilmentRepository['recordFulfilment']>[0]
  ): Promise<Awaited<ReturnType<FulfilmentRepository['recordFulfilment']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const orgId = String(raw.orgId ?? 'tnt_demo');
    const consentId = String(raw.consentId ?? '');
    const consent = consentsById.get(consentId);
    if (!consent && !consentId) return null as never;

    const now = nowIso();
    const fulfilment: SandboxFulfilment = {
      id: String(raw.id ?? productSandboxId('ful')),
      orgId,
      consentId,
      offerId: String(
        raw.offerId ?? consent?.offerId ?? productSandboxId('ofr')
      ),
      fulfilmentType: String(
        raw.fulfilmentType ?? 'coupon_issued'
      ) as FulfilmentType,
      status: 'fulfilled',
      evidenceRef: String(raw.evidenceRef ?? 'sandbox-evidence'),
      fulfilledAt: raw.fulfilledAt ? String(raw.fulfilledAt) : now,
      createdAt: now,
    };
    fulfilmentsById.set(fulfilment.id, fulfilment);
    return envelope(toPublicFulfilment(fulfilment), correlationId) as never;
  }

  async getFulfilment(
    input: Parameters<FulfilmentRepository['getFulfilment']>[0]
  ): Promise<Awaited<ReturnType<FulfilmentRepository['getFulfilment']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const fulfilmentId = String(raw.fulfilmentId ?? raw.id ?? '');
    const fulfilment = fulfilmentsById.get(fulfilmentId);
    if (!fulfilment) return null as never;
    return envelope(toPublicFulfilment(fulfilment), correlationId) as never;
  }
}
