/**
 * Offers Domain Facade
 *
 * High-level API for offers domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { offersService } from "./offers.service";
// TODO: Import types
// import type { ... } from "./offers.api-types";

/**
 * Offers Facade
 *
 * High-level API for offers operations.
 * Components should use this facade instead of services directly.
 */
export const offersFacade = {
  /**
   * List offers
   */
  async getOffer(...args: Parameters<typeof offersService.getOffer>): Promise<any> {
    return offersService.getOffer(...args);
  }

  /**
   * Create offer draft
   */
  async createOffer(...args: Parameters<typeof offersService.createOffer>): Promise<any> {
    return offersService.createOffer(...args);
  }

  /**
   * Get offer
   */
  async getOffer(...args: Parameters<typeof offersService.getOffer>): Promise<any> {
    return offersService.getOffer(...args);
  }

  /**
   * Update draft offer (creates a new version snapshot)
   */
  async updateOffer(...args: Parameters<typeof offersService.updateOffer>): Promise<any> {
    return offersService.updateOffer(...args);
  }

  /**
   * List offer version history
   */
  async getVersion(...args: Parameters<typeof offersService.getVersion>): Promise<any> {
    return offersService.getVersion(...args);
  }

  /**
   * Move draft offer to pending_approval
   */
  async createSubmitApproval(...args: Parameters<typeof offersService.createSubmitApproval>): Promise<any> {
    return offersService.createSubmitApproval(...args);
  }

  /**
   * Record business, privacy, or technology decision
   */
  async getApproval(...args: Parameters<typeof offersService.getApproval>): Promise<any> {
    return offersService.getApproval(...args);
  }

  /**
   * List offers pending cross-functional approval
   */
  async getApproval(...args: Parameters<typeof offersService.getApproval>): Promise<any> {
    return offersService.getApproval(...args);
  }

  /**
   * List approval decision log for an offer
   */
  async getApproval(...args: Parameters<typeof offersService.getApproval>): Promise<any> {
    return offersService.getApproval(...args);
  }
};
