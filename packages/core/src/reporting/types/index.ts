/**
 * Reporting Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/reporting.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AuditStatement = components["schemas"]["AuditStatement"];
export type JourneyCompareReport = components["schemas"]["JourneyCompareReport"];
export type JourneyCompareRow = components["schemas"]["JourneyCompareRow"];
export type OfferContribution = components["schemas"]["OfferContribution"];
export type OfferPerformanceReport = components["schemas"]["OfferPerformanceReport"];
export type OfferPerformance = components["schemas"]["OfferPerformanceResponse"];
export type JourneyCompare = components["schemas"]["JourneyCompareResponse"];



// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type GetOfferPerformanceReportParams = NonNullable<operations["getOfferPerformanceReport"]["parameters"]["query"]>;
export type GetAuditStatementParams = NonNullable<operations["getAuditStatement"]["parameters"]["query"]>;
export type CompareJourneysParams = NonNullable<operations["compareJourneys"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type GetOfferPerformanceReportResponse = operations["getOfferPerformanceReport"]["responses"]["200"]["content"]["application/json"];
export type GetAuditStatementResponse = operations["getAuditStatement"]["responses"]["200"]["content"]["application/json"];
export type CompareJourneysResponse = operations["compareJourneys"]["responses"]["200"]["content"]["application/json"];


