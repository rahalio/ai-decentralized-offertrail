/**
 * ApprovalRepository — in-memory product sandbox.
 */

import type { ApprovalRepository } from '@offertrail/services/offers';
import {
  approvalsById,
  envelope,
  listOffers,
  nowIso,
  offersById,
  productSandboxId,
  type ApprovalDecision,
  type ApprovalRole,
  type SandboxApproval,
} from '../_shared/product-sandbox-store.js';

export class ApprovalRepositoryDdb implements ApprovalRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async recordOfferApproval(
    input: Parameters<ApprovalRepository['recordOfferApproval']>[0]
  ): Promise<Awaited<ReturnType<ApprovalRepository['recordOfferApproval']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const offerId = String(raw.offerId ?? '');
    const offer = offersById.get(offerId);
    if (!offer) return null as never;

    const approval: SandboxApproval = {
      id: productSandboxId('apr'),
      offerId,
      role: String(raw.role ?? 'business') as ApprovalRole,
      decision: String(raw.decision ?? 'approved') as ApprovalDecision,
      rationale: raw.rationale ? String(raw.rationale) : undefined,
      decidedAt: nowIso(),
      decidedBy: raw.createdByActorId
        ? String(raw.createdByActorId)
        : undefined,
    };
    approvalsById.set(approval.id, approval);

    if (approval.decision === 'rejected') {
      offer.status = 'draft';
    } else if (approval.decision === 'approved') {
      const roles = new Set(
        [...approvalsById.values()]
          .filter((a) => a.offerId === offerId && a.decision === 'approved')
          .map((a) => a.role)
      );
      if (
        roles.has('business') &&
        roles.has('privacy') &&
        roles.has('technology')
      ) {
        offer.status = 'live';
      }
    } else if (approval.decision === 'change_requested') {
      offer.status = 'draft';
    }
    offer.updatedAt = nowIso();
    offersById.set(offerId, offer);

    return envelope(approval, correlationId) as never;
  }

  async listPendingApprovals(
    input: Parameters<ApprovalRepository['listPendingApprovals']>[0]
  ): Promise<Awaited<ReturnType<ApprovalRepository['listPendingApprovals']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const role = raw.role ? String(raw.role) : undefined;
    const pendingOfferIds = new Set(
      listOffers({ status: 'pending_approval' }).map((o) => o.id)
    );
    const items = [...approvalsById.values()].filter((a) => {
      if (!pendingOfferIds.has(a.offerId)) return false;
      if (role && a.role !== role) return false;
      return true;
    });
    return envelope({ items }, correlationId) as never;
  }

  async listOfferApprovals(
    input: Parameters<ApprovalRepository['listOfferApprovals']>[0]
  ): Promise<Awaited<ReturnType<ApprovalRepository['listOfferApprovals']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const offerId = String(raw.offerId ?? '');
    const items = [...approvalsById.values()].filter(
      (a) => a.offerId === offerId
    );
    return envelope({ items }, correlationId) as never;
  }
}
