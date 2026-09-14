/**
 * RevokeRepository — in-memory product sandbox.
 */

import type { RevokeRepository } from '@offertrail/services/consents';
import {
  consentsById,
  envelope,
  nowIso,
} from '../_shared/product-sandbox-store.js';

export class RevokeRepositoryDdb implements RevokeRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async revokeConsent(
    input: Parameters<RevokeRepository['revokeConsent']>[0]
  ): Promise<Awaited<ReturnType<RevokeRepository['revokeConsent']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const consentId = String(raw.consentId ?? '');
    const consent = consentsById.get(consentId);
    if (!consent) return null as never;

    const revokedAt = nowIso();
    consent.status = 'revoked';
    consent.revokedAt = revokedAt;
    consent.revokeReason = String(raw.reason ?? 'sandbox-revoke');
    consent.stopProcessingStatus = 'in_progress';
    consentsById.set(consentId, consent);

    return envelope(
      {
        consentId,
        revokedAt,
        reason: consent.revokeReason,
        stopProcessingStatus: consent.stopProcessingStatus,
      },
      correlationId
    ) as never;
  }
}
