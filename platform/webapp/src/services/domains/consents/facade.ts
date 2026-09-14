/**
 * Consents Domain Facade
 *
 * High-level API for consents domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { consentsService } from "./consents.service";
// TODO: Import types
// import type { ... } from "./consents.api-types";

/**
 * Consents Facade
 *
 * High-level API for consents operations.
 * Components should use this facade instead of services directly.
 */
export const consentsFacade = {
  /**
   * List consent events
   */
  async getConsent(...args: Parameters<typeof consentsService.getConsent>): Promise<any> {
    return consentsService.getConsent(...args);
  }

  /**
   * Grant consent for a live offer
   */
  async getConsent(...args: Parameters<typeof consentsService.getConsent>): Promise<any> {
    return consentsService.getConsent(...args);
  }

  /**
   * Get consent event
   */
  async getConsent(...args: Parameters<typeof consentsService.getConsent>): Promise<any> {
    return consentsService.getConsent(...args);
  }

  /**
   * Revoke offer permission without killing unrelated account access
   */
  async getRevoke(...args: Parameters<typeof consentsService.getRevoke>): Promise<any> {
    return consentsService.getRevoke(...args);
  }
};
