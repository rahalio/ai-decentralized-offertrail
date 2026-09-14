/**
 * JourneyCompareRepository — sandbox aggregates from in-memory maps.
 */

import type { JourneyCompareRepository } from '@offertrail/services/reporting';
import {
  envelope,
  ensureProductSandboxSeeded,
  listJourneys,
  ratesForOffers,
} from '../_shared/product-sandbox-store.js';

export class JourneyCompareRepositoryDdb implements JourneyCompareRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async compareJourneys(
    input: Parameters<JourneyCompareRepository['compareJourneys']>[0]
  ): Promise<Awaited<ReturnType<JourneyCompareRepository['compareJourneys']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const period = String(raw.period ?? 'sandbox');
    ensureProductSandboxSeeded();
    const journeys = listJourneys().map((j) => {
      const rates = ratesForOffers(j.id);
      return {
        journeyId: j.id,
        journeyName: j.name,
        optInRate: rates.optInRate,
        revokeRate: rates.revokeRate,
        fulfilmentRate24h: rates.fulfilmentRate24h,
      };
    });
    return envelope({ period, journeys }, correlationId) as never;
  }
}
