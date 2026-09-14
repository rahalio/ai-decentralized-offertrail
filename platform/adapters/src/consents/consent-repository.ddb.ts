/**
 * ConsentRepository — in-memory product sandbox.
 */

import type { ConsentRepository } from '@offertrail/services/consents';
import {
  consentsById,
  envelope,
  nowIso,
  productSandboxId,
  toPublicConsent,
  type SandboxConsent,
} from '../_shared/product-sandbox-store.js';

export class ConsentRepositoryDdb implements ConsentRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listConsents(
    input: Parameters<ConsentRepository['listConsents']>[0]
  ): Promise<Awaited<ReturnType<ConsentRepository['listConsents']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const offerId = raw.offerId ? String(raw.offerId) : undefined;
    const subjectRef = raw.subjectRef ? String(raw.subjectRef) : undefined;
    const items = [...consentsById.values()]
      .filter((c) => {
        if (offerId && c.offerId !== offerId) return false;
        if (subjectRef && c.subjectRef !== subjectRef) return false;
        return true;
      })
      .map(toPublicConsent);
    return envelope({ items }, correlationId) as never;
  }

  async grantConsent(
    input: Parameters<ConsentRepository['grantConsent']>[0]
  ): Promise<Awaited<ReturnType<ConsentRepository['grantConsent']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const orgId = String(raw.orgId ?? 'tnt_demo');
    const offerId = String(raw.offerId ?? '');
    if (!offerId) return null as never;

    const consent: SandboxConsent = {
      id: String(raw.id ?? productSandboxId('cns')),
      orgId,
      offerId,
      subjectRef: String(raw.subjectRef ?? `subj_${ulidSuffix()}`),
      status: 'active',
      channel: raw.channel ? String(raw.channel) : 'sandbox',
      grantedAt: nowIso(),
      stopProcessingStatus: 'not_required',
    };
    consentsById.set(consent.id, consent);
    return envelope(toPublicConsent(consent), correlationId) as never;
  }

  async getConsent(
    input: Parameters<ConsentRepository['getConsent']>[0]
  ): Promise<Awaited<ReturnType<ConsentRepository['getConsent']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const consentId = String(raw.consentId ?? raw.id ?? '');
    const consent = consentsById.get(consentId);
    if (!consent) return null as never;
    return envelope(toPublicConsent(consent), correlationId) as never;
  }
}

function ulidSuffix(): string {
  return productSandboxId('cns').slice(4, 12);
}
