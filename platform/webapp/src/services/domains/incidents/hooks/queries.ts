/**
 * Incidents Query Hooks
 *
 * React Query hooks for fetching incidents data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { incidentsService } from "../incidents.service";

/**
 * Hook to list trust incidents
 *
 * Query key: ["incidents", "Incident", ]
 */
export function useIncident(params?: Record<string, any>) {
  return useTenantQuery(
    ["incidents", "Incident", ],
    async (orgId: string, signal?: AbortSignal) => {
      return incidentsService.getIncident(params, signal);
    }
  );
}

/**
 * Hook to get trust incident
 *
 * Query key: ["incidents", "Incident", incidentId]
 */
export function useIncident(incidentId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["incidents", "Incident", incidentId],
    async (orgId: string, signal?: AbortSignal) => {
      return incidentsService.getIncident(incidentId, params, signal);
    },
    {
      enabled: !!incidentId
    }
  );
}
