/**
 * Consents Mutation Hooks
 *
 * React Query hooks for mutating consents data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { consentsService } from "../consents.service";
// TODO: Import types
// import type { ... } from "../consents.api-types";

/**
 * Hook to grant consent for a live offer
 *
 * Automatically invalidates consents queries on success.
 */
export function useGetConsent() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return consentsService.getConsent(data);
    },
    {
      invalidateQueries: [["consents", "Consent"]],
    }
  );
}

/**
 * Hook to revoke offer permission without killing unrelated account access
 *
 * Automatically invalidates consents queries on success.
 */
export function useGetRevoke() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return consentsService.getRevoke(data);
    },
    {
      invalidateQueries: [["consents", "Revoke"]],
    }
  );
}
