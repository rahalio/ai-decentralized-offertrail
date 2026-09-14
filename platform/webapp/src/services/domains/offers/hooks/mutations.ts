/**
 * Offers Mutation Hooks
 *
 * React Query hooks for mutating offers data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { offersService } from "../offers.service";
// TODO: Import types
// import type { ... } from "../offers.api-types";

/**
 * Hook to create offer draft
 *
 * Automatically invalidates offers queries on success.
 */
export function useCreateOffer() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return offersService.createOffer(data);
    },
    {
      invalidateQueries: [["offers", "Offer"]],
    }
  );
}

/**
 * Hook to update draft offer (creates a new version snapshot)
 *
 * Automatically invalidates offers queries on success.
 */
export function useUpdateOffer() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return offersService.updateOffer(data);
    },
    {
      invalidateQueries: [["offers", "Offer"]],
    }
  );
}

/**
 * Hook to move draft offer to pending_approval
 *
 * Automatically invalidates offers queries on success.
 */
export function useCreateSubmitApproval() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return offersService.createSubmitApproval(data);
    },
    {
      invalidateQueries: [["offers", "SubmitApproval"]],
    }
  );
}

/**
 * Hook to record business, privacy, or technology decision
 *
 * Automatically invalidates offers queries on success.
 */
export function useGetApproval() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return offersService.getApproval(data);
    },
    {
      invalidateQueries: [["offers", "Approval"]],
    }
  );
}
