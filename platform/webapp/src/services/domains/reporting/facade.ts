/**
 * Reporting Domain Facade
 *
 * High-level API for reporting domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { reportingService } from "./reporting.service";
// TODO: Import types
// import type { ... } from "./reporting.api-types";

/**
 * Reporting Facade
 *
 * High-level API for reporting operations.
 * Components should use this facade instead of services directly.
 */
export const reportingFacade = {
  /**
   * Opt-in, revoke, and fulfilment rates by offer
   */
  async getOfferPerformance(...args: Parameters<typeof reportingService.getOfferPerformance>): Promise<any> {
    return reportingService.getOfferPerformance(...args);
  }

  /**
   * Exportable period statement of net lawful sharing vs revocations
   */
  async getAuditStatement(...args: Parameters<typeof reportingService.getAuditStatement>): Promise<any> {
    return reportingService.getAuditStatement(...args);
  }

  /**
   * Compare opt-in / revoke / fulfilment across journeys
   */
  async getJourneyCompare(...args: Parameters<typeof reportingService.getJourneyCompare>): Promise<any> {
    return reportingService.getJourneyCompare(...args);
  }
};
