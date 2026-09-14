/**
 * Identity Domain Facade
 *
 * High-level API for identity domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { identityService } from "./identity.service";
// TODO: Import types
// import type { ... } from "./identity.api-types";

/**
 * Identity Facade
 *
 * High-level API for identity operations.
 * Components should use this facade instead of services directly.
 */
export const identityFacade = {
  /**
   * List API keys for the current tenant
   */
  async getApiKey(...args: Parameters<typeof identityService.getApiKey>): Promise<any> {
    return identityService.getApiKey(...args);
  }

  /**
   * Create an API key (secret returned once)
   */
  async createApiKey(...args: Parameters<typeof identityService.createApiKey>): Promise<any> {
    return identityService.createApiKey(...args);
  }

  /**
   * Get API key metadata
   */
  async getApiKey(...args: Parameters<typeof identityService.getApiKey>): Promise<any> {
    return identityService.getApiKey(...args);
  }

  /**
   * Revoke an API key
   */
  async getApiKey(...args: Parameters<typeof identityService.getApiKey>): Promise<any> {
    return identityService.getApiKey(...args);
  }

  /**
   * List operator users for the current tenant
   */
  async getUser(...args: Parameters<typeof identityService.getUser>): Promise<any> {
    return identityService.getUser(...args);
  }

  /**
   * Create an operator user (password set once)
   */
  async createUser(...args: Parameters<typeof identityService.createUser>): Promise<any> {
    return identityService.createUser(...args);
  }

  /**
   * Get operator user metadata
   */
  async getUser(...args: Parameters<typeof identityService.getUser>): Promise<any> {
    return identityService.getUser(...args);
  }

  /**
   * Update display name, role, or reset password
   */
  async updateUser(...args: Parameters<typeof identityService.updateUser>): Promise<any> {
    return identityService.updateUser(...args);
  }

  /**
   * Disable an operator user
   */
  async updateDisable(...args: Parameters<typeof identityService.updateDisable>): Promise<any> {
    return identityService.updateDisable(...args);
  }

  /**
   * Re-enable an operator user
   */
  async updateEnable(...args: Parameters<typeof identityService.updateEnable>): Promise<any> {
    return identityService.updateEnable(...args);
  }

  /**
   * Operator login (stub)
   */
  async getLogin(...args: Parameters<typeof identityService.getLogin>): Promise<any> {
    return identityService.getLogin(...args);
  }

  /**
   * Current operator session
   */
  async getMe(...args: Parameters<typeof identityService.getMe>): Promise<any> {
    return identityService.getMe(...args);
  }

  /**
   * Update own display name
   */
  async updateMe(...args: Parameters<typeof identityService.updateMe>): Promise<any> {
    return identityService.updateMe(...args);
  }

  /**
   * Refresh operator tokens (stub)
   */
  async getRefresh(...args: Parameters<typeof identityService.getRefresh>): Promise<any> {
    return identityService.getRefresh(...args);
  }

  /**
   * Operator logout (stub)
   */
  async getLogout(...args: Parameters<typeof identityService.getLogout>): Promise<any> {
    return identityService.getLogout(...args);
  }
};
