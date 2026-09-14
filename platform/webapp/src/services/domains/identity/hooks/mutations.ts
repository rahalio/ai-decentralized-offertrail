/**
 * Identity Mutation Hooks
 *
 * React Query hooks for mutating identity data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { identityService } from "../identity.service";
// TODO: Import types
// import type { ... } from "../identity.api-types";

/**
 * Hook to create an api key (secret returned once)
 *
 * Automatically invalidates identity queries on success.
 */
export function useCreateApiKey() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return identityService.createApiKey(data);
    },
    {
      invalidateQueries: [["identity", "ApiKey"]],
    }
  );
}

/**
 * Hook to revoke an api key
 *
 * Automatically invalidates identity queries on success.
 */
export function useGetApiKey() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return identityService.getApiKey(data);
    },
    {
      invalidateQueries: [["identity", "ApiKey"]],
    }
  );
}

/**
 * Hook to create an operator user (password set once)
 *
 * Automatically invalidates identity queries on success.
 */
export function useCreateUser() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return identityService.createUser(data);
    },
    {
      invalidateQueries: [["identity", "User"]],
    }
  );
}

/**
 * Hook to update display name, role, or reset password
 *
 * Automatically invalidates identity queries on success.
 */
export function useUpdateUser() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return identityService.updateUser(data);
    },
    {
      invalidateQueries: [["identity", "User"]],
    }
  );
}

/**
 * Hook to disable an operator user
 *
 * Automatically invalidates identity queries on success.
 */
export function useUpdateDisable() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return identityService.updateDisable(data);
    },
    {
      invalidateQueries: [["identity", "Disable"]],
    }
  );
}

/**
 * Hook to re-enable an operator user
 *
 * Automatically invalidates identity queries on success.
 */
export function useUpdateEnable() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return identityService.updateEnable(data);
    },
    {
      invalidateQueries: [["identity", "Enable"]],
    }
  );
}

/**
 * Hook to operator login (stub)
 *
 * Automatically invalidates identity queries on success.
 */
export function useGetLogin() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return identityService.getLogin(data);
    },
    {
      invalidateQueries: [["identity", "Login"]],
    }
  );
}

/**
 * Hook to update own display name
 *
 * Automatically invalidates identity queries on success.
 */
export function useUpdateMe() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return identityService.updateMe(data);
    },
    {
      invalidateQueries: [["identity", "Me"]],
    }
  );
}

/**
 * Hook to refresh operator tokens (stub)
 *
 * Automatically invalidates identity queries on success.
 */
export function useGetRefresh() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return identityService.getRefresh(data);
    },
    {
      invalidateQueries: [["identity", "Refresh"]],
    }
  );
}

/**
 * Hook to operator logout (stub)
 *
 * Automatically invalidates identity queries on success.
 */
export function useGetLogout() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return identityService.getLogout(data);
    },
    {
      invalidateQueries: [["identity", "Logout"]],
    }
  );
}
