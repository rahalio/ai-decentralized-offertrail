/**
 * Incidents Mutation Hooks
 *
 * React Query hooks for mutating incidents data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { incidentsService } from "../incidents.service";
// TODO: Import types
// import type { ... } from "../incidents.api-types";

/**
 * Hook to declare a trust incident
 *
 * Automatically invalidates incidents queries on success.
 */
export function useGetIncident() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return incidentsService.getIncident(data);
    },
    {
      invalidateQueries: [["incidents", "Incident"]],
    }
  );
}

/**
 * Hook to pause offer class during trust recovery
 *
 * Automatically invalidates incidents queries on success.
 */
export function useGetPauseOffer() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return incidentsService.getPauseOffer(data);
    },
    {
      invalidateQueries: [["incidents", "PauseOffer"]],
    }
  );
}

/**
 * Hook to resume paused offers after recovery (requires confirm)
 *
 * Automatically invalidates incidents queries on success.
 */
export function useGetResumeOffer() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return incidentsService.getResumeOffer(data);
    },
    {
      invalidateQueries: [["incidents", "ResumeOffer"]],
    }
  );
}
