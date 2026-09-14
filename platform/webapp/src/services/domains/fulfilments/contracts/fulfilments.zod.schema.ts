/**
 * Fulfilments Domain Contracts
 *
 * Re-exports Zod schemas from @offertrail/core for runtime validation.
 * This avoids duplication and ensures alignment with the API contract.
 *
 * Architecture:
 * - Single source of truth: @offertrail/core
 * - No code duplication or drift
 * - Runtime validation of API responses
 * - Used in services to validate responses
 *
 * @see @offertrail/core/fulfilments for the source schemas
 */

import { fulfilmentsSchemas as coreFulfilmentsSchemas } from "@offertrail/core/fulfilments";
import type { z } from "zod";

/**
 * Re-export schemas from core
 * These are the same schemas used by the api-server, ensuring perfect alignment
 */
export const {
  // TODO: Add specific schema exports based on OpenAPI spec
  // ResponseMeta,
  // PageInfo,
  // etc.
} = coreFulfilmentsSchemas;

/**
 * Export all schemas as a namespace for convenience
 */
export const fulfilmentsSchemas = coreFulfilmentsSchemas;
