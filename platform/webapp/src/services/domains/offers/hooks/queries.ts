/**
 * Offers Query Hooks
 *
 * React Query hooks for fetching offers data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { offersService } from "../offers.service";

/**
 * Hook to list offers
 *
 * Query key: ["offers", "Offer", ]
 */
export function useOffer(params?: Record<string, any>) {
  return useTenantQuery(
    ["offers", "Offer", ],
    async (orgId: string, signal?: AbortSignal) => {
      return offersService.getOffer(params, signal);
    }
  );
}

/**
 * Hook to get offer
 *
 * Query key: ["offers", "Offer", offerId]
 */
export function useOffer(offerId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["offers", "Offer", offerId],
    async (orgId: string, signal?: AbortSignal) => {
      return offersService.getOffer(offerId, params, signal);
    },
    {
      enabled: !!offerId
    }
  );
}

/**
 * Hook to list offer version history
 *
 * Query key: ["offers", "Version", offerId]
 */
export function useVersion(offerId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["offers", "Version", offerId],
    async (orgId: string, signal?: AbortSignal) => {
      return offersService.getVersion(offerId, params, signal);
    },
    {
      enabled: !!offerId
    }
  );
}

/**
 * Hook to list offers pending cross-functional approval
 *
 * Query key: ["offers", "Approval", ]
 */
export function useApproval(params?: Record<string, any>) {
  return useTenantQuery(
    ["offers", "Approval", ],
    async (orgId: string, signal?: AbortSignal) => {
      return offersService.getApproval(params, signal);
    }
  );
}

/**
 * Hook to list approval decision log for an offer
 *
 * Query key: ["offers", "Approval", offerId]
 */
export function useApproval(offerId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["offers", "Approval", offerId],
    async (orgId: string, signal?: AbortSignal) => {
      return offersService.getApproval(offerId, params, signal);
    },
    {
      enabled: !!offerId
    }
  );
}
