/**
 * Fulfilments Mutation Hooks
 *
 * React Query hooks for mutating fulfilments data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { fulfilmentsService } from "../fulfilments.service";
// TODO: Import types
// import type { ... } from "../fulfilments.api-types";

/**
 * Hook to record fulfilment evidence for a consent
 *
 * Automatically invalidates fulfilments queries on success.
 */
export function useGetFulfilment() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return fulfilmentsService.getFulfilment(data);
    },
    {
      invalidateQueries: [["fulfilments", "Fulfilment"]],
    }
  );
}

/**
 * Hook to retry a failed fulfilment
 *
 * Automatically invalidates fulfilments queries on success.
 */
export function useGetRetry() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return fulfilmentsService.getRetry(data);
    },
    {
      invalidateQueries: [["fulfilments", "Retry"]],
    }
  );
}

/**
 * Hook to freeze further collection for an offer after fulfilment failure
 *
 * Automatically invalidates fulfilments queries on success.
 */
export function useGetFreezeCollection() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return fulfilmentsService.getFreezeCollection(data);
    },
    {
      invalidateQueries: [["fulfilments", "FreezeCollection"]],
    }
  );
}
