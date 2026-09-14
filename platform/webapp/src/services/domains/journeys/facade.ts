/**
 * Journeys Domain Facade
 *
 * High-level API for journeys domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { journeysService } from "./journeys.service";
// TODO: Import types
// import type { ... } from "./journeys.api-types";

/**
 * Journeys Facade
 *
 * High-level API for journeys operations.
 * Components should use this facade instead of services directly.
 */
export const journeysFacade = {
  /**
   * List priority journeys
   */
  async getJourney(...args: Parameters<typeof journeysService.getJourney>): Promise<any> {
    return journeysService.getJourney(...args);
  }

  /**
   * Create a priority journey
   */
  async createJourney(...args: Parameters<typeof journeysService.createJourney>): Promise<any> {
    return journeysService.createJourney(...args);
  }

  /**
   * Get a journey
   */
  async getJourney(...args: Parameters<typeof journeysService.getJourney>): Promise<any> {
    return journeysService.getJourney(...args);
  }

  /**
   * Update journey metadata, owners, or status
   */
  async updateJourney(...args: Parameters<typeof journeysService.updateJourney>): Promise<any> {
    return journeysService.updateJourney(...args);
  }

  /**
   * Archive a journey
   */
  async getArchive(...args: Parameters<typeof journeysService.getArchive>): Promise<any> {
    return journeysService.getArchive(...args);
  }
};
