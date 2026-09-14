/**
 * AuditStatementRepository — sandbox aggregates from in-memory maps.
 */

import type { AuditStatementRepository } from '@offertrail/services/reporting';
import {
  envelope,
  ensureProductSandboxSeeded,
  nowIso,
  ratesForOffers,
} from '../_shared/product-sandbox-store.js';

export class AuditStatementRepositoryDdb implements AuditStatementRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async getAuditStatement(
    input: Parameters<AuditStatementRepository['getAuditStatement']>[0]
  ): Promise<Awaited<ReturnType<AuditStatementRepository['getAuditStatement']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const journeyId = raw.journeyId ? String(raw.journeyId) : undefined;
    const period = String(raw.period ?? 'sandbox');
    const exportFormat = String(raw.format ?? 'json');
    ensureProductSandboxSeeded();
    const rates = ratesForOffers(journeyId);
    return envelope(
      {
        period,
        journeyId,
        generatedAt: nowIso(),
        netNewLawfulSharing: rates.netNewLawfulSharing,
        netRevocations: rates.netRevocations,
        offers: rates.offers,
        exportFormat,
      },
      correlationId
    ) as never;
  }
}
