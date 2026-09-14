/**
 * Fulfilments Query Hooks
 *
 * React Query hooks for fetching fulfilments data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { fulfilmentsService } from "../fulfilments.service";

/**
 * Hook to list fulfilment proofs (optional failure queue filter)
 *
 * Query key: ["fulfilments", "Fulfilment", ]
 */
export function useFulfilment(params?: Record<string, any>) {
  return useTenantQuery(
    ["fulfilments", "Fulfilment", ],
    async (orgId: string, signal?: AbortSignal) => {
      return fulfilmentsService.getFulfilment(params, signal);
    }
  );
}

/**
 * Hook to get fulfilment proof
 *
 * Query key: ["fulfilments", "Fulfilment", fulfilmentId]
 */
export function useFulfilment(fulfilmentId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["fulfilments", "Fulfilment", fulfilmentId],
    async (orgId: string, signal?: AbortSignal) => {
      return fulfilmentsService.getFulfilment(fulfilmentId, params, signal);
    },
    {
      enabled: !!fulfilmentId
    }
  );
}
