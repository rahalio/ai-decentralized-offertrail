/**
 * Fulfilments Domain Facade
 *
 * High-level API for fulfilments domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { fulfilmentsService } from "./fulfilments.service";
// TODO: Import types
// import type { ... } from "./fulfilments.api-types";

/**
 * Fulfilments Facade
 *
 * High-level API for fulfilments operations.
 * Components should use this facade instead of services directly.
 */
export const fulfilmentsFacade = {
  /**
   * List fulfilment proofs (optional failure queue filter)
   */
  async getFulfilment(...args: Parameters<typeof fulfilmentsService.getFulfilment>): Promise<any> {
    return fulfilmentsService.getFulfilment(...args);
  }

  /**
   * Record fulfilment evidence for a consent
   */
  async getFulfilment(...args: Parameters<typeof fulfilmentsService.getFulfilment>): Promise<any> {
    return fulfilmentsService.getFulfilment(...args);
  }

  /**
   * Get fulfilment proof
   */
  async getFulfilment(...args: Parameters<typeof fulfilmentsService.getFulfilment>): Promise<any> {
    return fulfilmentsService.getFulfilment(...args);
  }

  /**
   * Retry a failed fulfilment
   */
  async getRetry(...args: Parameters<typeof fulfilmentsService.getRetry>): Promise<any> {
    return fulfilmentsService.getRetry(...args);
  }

  /**
   * Freeze further collection for an offer after fulfilment failure
   */
  async getFreezeCollection(...args: Parameters<typeof fulfilmentsService.getFreezeCollection>): Promise<any> {
    return fulfilmentsService.getFreezeCollection(...args);
  }
};
