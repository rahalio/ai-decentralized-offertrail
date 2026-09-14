/**
 * Reporting Query Hooks
 *
 * React Query hooks for fetching reporting data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { reportingService } from "../reporting.service";

/**
 * Hook to opt-in, revoke, and fulfilment rates by offer
 *
 * Query key: ["reporting", "OfferPerformance", ]
 */
export function useOfferPerformance(params?: Record<string, any>) {
  return useTenantQuery(
    ["reporting", "OfferPerformance", ],
    async (orgId: string, signal?: AbortSignal) => {
      return reportingService.getOfferPerformance(params, signal);
    }
  );
}

/**
 * Hook to exportable period statement of net lawful sharing vs revocations
 *
 * Query key: ["reporting", "AuditStatement", ]
 */
export function useAuditStatement(params?: Record<string, any>) {
  return useTenantQuery(
    ["reporting", "AuditStatement", ],
    async (orgId: string, signal?: AbortSignal) => {
      return reportingService.getAuditStatement(params, signal);
    }
  );
}

/**
 * Hook to compare opt-in / revoke / fulfilment across journeys
 *
 * Query key: ["reporting", "JourneyCompare", ]
 */
export function useJourneyCompare(params?: Record<string, any>) {
  return useTenantQuery(
    ["reporting", "JourneyCompare", ],
    async (orgId: string, signal?: AbortSignal) => {
      return reportingService.getJourneyCompare(params, signal);
    }
  );
}
