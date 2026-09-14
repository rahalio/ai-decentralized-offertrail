/**
 * OfferPerformanceRepository — sandbox aggregates from in-memory maps.
 */

import type { OfferPerformanceRepository } from '@offertrail/services/reporting';
import {
  envelope,
  ensureProductSandboxSeeded,
  ratesForOffers,
} from '../_shared/product-sandbox-store.js';

export class OfferPerformanceRepositoryDdb
  implements OfferPerformanceRepository
{
  constructor(private readonly _dynamoClient: unknown) {}

  async getOfferPerformanceReport(
    input: Parameters<OfferPerformanceRepository['getOfferPerformanceReport']>[0]
  ): Promise<
    Awaited<ReturnType<OfferPerformanceRepository['getOfferPerformanceReport']>>
  > {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const journeyId = raw.journeyId ? String(raw.journeyId) : undefined;
    const period = String(raw.period ?? 'sandbox');
    ensureProductSandboxSeeded();
    const rates = ratesForOffers(journeyId);
    return envelope(
      {
        journeyId,
        period,
        optInRate: rates.optInRate,
        revokeRate: rates.revokeRate,
        fulfilmentRate24h: rates.fulfilmentRate24h,
        offers: rates.offers,
      },
      correlationId
    ) as never;
  }
}
