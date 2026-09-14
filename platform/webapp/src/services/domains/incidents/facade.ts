/**
 * Incidents Domain Facade
 *
 * High-level API for incidents domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { incidentsService } from "./incidents.service";
// TODO: Import types
// import type { ... } from "./incidents.api-types";

/**
 * Incidents Facade
 *
 * High-level API for incidents operations.
 * Components should use this facade instead of services directly.
 */
export const incidentsFacade = {
  /**
   * List trust incidents
   */
  async getIncident(...args: Parameters<typeof incidentsService.getIncident>): Promise<any> {
    return incidentsService.getIncident(...args);
  }

  /**
   * Declare a trust incident
   */
  async getIncident(...args: Parameters<typeof incidentsService.getIncident>): Promise<any> {
    return incidentsService.getIncident(...args);
  }

  /**
   * Get trust incident
   */
  async getIncident(...args: Parameters<typeof incidentsService.getIncident>): Promise<any> {
    return incidentsService.getIncident(...args);
  }

  /**
   * Pause offer class during trust recovery
   */
  async getPauseOffer(...args: Parameters<typeof incidentsService.getPauseOffer>): Promise<any> {
    return incidentsService.getPauseOffer(...args);
  }

  /**
   * Resume paused offers after recovery (requires confirm)
   */
  async getResumeOffer(...args: Parameters<typeof incidentsService.getResumeOffer>): Promise<any> {
    return incidentsService.getResumeOffer(...args);
  }
};
