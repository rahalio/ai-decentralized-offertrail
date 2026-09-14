/**
 * Identity Query Hooks
 *
 * React Query hooks for fetching identity data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { identityService } from "../identity.service";

/**
 * Hook to list api keys for the current tenant
 *
 * Query key: ["identity", "ApiKey", ]
 */
export function useApiKey(params?: Record<string, any>) {
  return useTenantQuery(
    ["identity", "ApiKey", ],
    async (orgId: string, signal?: AbortSignal) => {
      return identityService.getApiKey(params, signal);
    }
  );
}

/**
 * Hook to get api key metadata
 *
 * Query key: ["identity", "ApiKey", keyId]
 */
export function useApiKey(keyId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["identity", "ApiKey", keyId],
    async (orgId: string, signal?: AbortSignal) => {
      return identityService.getApiKey(keyId, params, signal);
    },
    {
      enabled: !!keyId
    }
  );
}

/**
 * Hook to list operator users for the current tenant
 *
 * Query key: ["identity", "User", ]
 */
export function useUser(params?: Record<string, any>) {
  return useTenantQuery(
    ["identity", "User", ],
    async (orgId: string, signal?: AbortSignal) => {
      return identityService.getUser(params, signal);
    }
  );
}

/**
 * Hook to get operator user metadata
 *
 * Query key: ["identity", "User", userId]
 */
export function useUser(userId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["identity", "User", userId],
    async (orgId: string, signal?: AbortSignal) => {
      return identityService.getUser(userId, params, signal);
    },
    {
      enabled: !!userId
    }
  );
}

/**
 * Hook to current operator session
 *
 * Query key: ["identity", "Me", ]
 */
export function useMe(params?: Record<string, any>) {
  return useTenantQuery(
    ["identity", "Me", ],
    async (orgId: string, signal?: AbortSignal) => {
      return identityService.getMe(params, signal);
    }
  );
}
