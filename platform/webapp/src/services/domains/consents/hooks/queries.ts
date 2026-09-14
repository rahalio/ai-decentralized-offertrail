/**
 * Consents Query Hooks
 *
 * React Query hooks for fetching consents data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { consentsService } from "../consents.service";

/**
 * Hook to list consent events
 *
 * Query key: ["consents", "Consent", ]
 */
export function useConsent(params?: Record<string, any>) {
  return useTenantQuery(
    ["consents", "Consent", ],
    async (orgId: string, signal?: AbortSignal) => {
      return consentsService.getConsent(params, signal);
    }
  );
}

/**
 * Hook to get consent event
 *
 * Query key: ["consents", "Consent", consentId]
 */
export function useConsent(consentId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["consents", "Consent", consentId],
    async (orgId: string, signal?: AbortSignal) => {
      return consentsService.getConsent(consentId, params, signal);
    },
    {
      enabled: !!consentId
    }
  );
}
