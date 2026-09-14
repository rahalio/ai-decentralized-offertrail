/**
 * RetryRepository — in-memory product sandbox.
 */

import type { RetryRepository } from '@offertrail/services/fulfilments';
import {
  envelope,
  fulfilmentsById,
  nowIso,
  toPublicFulfilment,
} from '../_shared/product-sandbox-store.js';

export class RetryRepositoryDdb implements RetryRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async retryFulfilment(
    input: Parameters<RetryRepository['retryFulfilment']>[0]
  ): Promise<Awaited<ReturnType<RetryRepository['retryFulfilment']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const fulfilmentId = String(raw.fulfilmentId ?? '');
    const fulfilment = fulfilmentsById.get(fulfilmentId);
    if (!fulfilment) return null as never;

    fulfilment.status = 'fulfilled';
    fulfilment.failureReason = undefined;
    fulfilment.fulfilledAt = nowIso();
    fulfilment.evidenceRef =
      fulfilment.evidenceRef ?? 'sandbox-retry-evidence';
    fulfilmentsById.set(fulfilmentId, fulfilment);
    return envelope(toPublicFulfilment(fulfilment), correlationId) as never;
  }
}
