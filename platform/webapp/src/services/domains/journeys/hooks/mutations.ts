/**
 * Journeys Mutation Hooks
 *
 * React Query hooks for mutating journeys data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { journeysService } from "../journeys.service";
// TODO: Import types
// import type { ... } from "../journeys.api-types";

/**
 * Hook to create a priority journey
 *
 * Automatically invalidates journeys queries on success.
 */
export function useCreateJourney() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return journeysService.createJourney(data);
    },
    {
      invalidateQueries: [["journeys", "Journey"]],
    }
  );
}

/**
 * Hook to update journey metadata, owners, or status
 *
 * Automatically invalidates journeys queries on success.
 */
export function useUpdateJourney() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return journeysService.updateJourney(data);
    },
    {
      invalidateQueries: [["journeys", "Journey"]],
    }
  );
}

/**
 * Hook to archive a journey
 *
 * Automatically invalidates journeys queries on success.
 */
export function useGetArchive() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return journeysService.getArchive(data);
    },
    {
      invalidateQueries: [["journeys", "Archive"]],
    }
  );
}
