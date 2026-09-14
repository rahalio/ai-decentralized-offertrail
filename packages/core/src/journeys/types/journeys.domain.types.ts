/**
 * Journeys Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/journeys.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Journey = components["schemas"]["Journey"];
export type JourneyCreate = components["schemas"]["JourneyCreate"];
export type JourneyId = components["schemas"]["JourneyId"];
export type JourneyListData = components["schemas"]["JourneyListData"];
export type JourneyStatus = components["schemas"]["JourneyStatus"];
export type JourneyUpdate = components["schemas"]["JourneyUpdate"];
export type OrchestrationStatus = components["schemas"]["OrchestrationStatus"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateJourneyRequestInput = NonNullable<operations["createJourney"]["requestBody"]>["content"]["application/json"];
export type UpdateJourneyRequestInput = NonNullable<operations["updateJourney"]["requestBody"]>["content"]["application/json"];
export type UpdateJourneyRequest = UpdateJourneyRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListJourneysParams = NonNullable<operations["listJourneys"]["parameters"]["query"]>;
export type GetJourneyParams = operations["getJourney"]["parameters"]["path"];
export type UpdateJourneyParams = operations["updateJourney"]["parameters"]["path"];
export type ArchiveJourneyParams = operations["archiveJourney"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListJourneysResponse = operations["listJourneys"]["responses"]["200"]["content"]["application/json"];
export type CreateJourneyResponse = operations["createJourney"]["responses"]["201"]["content"]["application/json"];
export type GetJourneyResponse = operations["getJourney"]["responses"]["200"]["content"]["application/json"];
export type UpdateJourneyResponse = operations["updateJourney"]["responses"]["200"]["content"]["application/json"];
export type ArchiveJourneyResponse = operations["archiveJourney"]["responses"]["200"]["content"]["application/json"];


