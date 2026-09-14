/**
 * Journeys Query Hooks
 *
 * React Query hooks for fetching journeys data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { journeysService } from "../journeys.service";

/**
 * Hook to list priority journeys
 *
 * Query key: ["journeys", "Journey", ]
 */
export function useJourney(params?: Record<string, any>) {
  return useTenantQuery(
    ["journeys", "Journey", ],
    async (orgId: string, signal?: AbortSignal) => {
      return journeysService.getJourney(params, signal);
    }
  );
}

/**
 * Hook to get a journey
 *
 * Query key: ["journeys", "Journey", journeyId]
 */
export function useJourney(journeyId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["journeys", "Journey", journeyId],
    async (orgId: string, signal?: AbortSignal) => {
      return journeysService.getJourney(journeyId, params, signal);
    },
    {
      enabled: !!journeyId
    }
  );
}
