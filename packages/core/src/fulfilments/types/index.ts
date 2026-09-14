/**
 * Fulfilments Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/fulfilments.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type FreezeCollectionResult = components["schemas"]["FreezeCollectionResult"];
export type FulfilmentId = components["schemas"]["FulfilmentId"];
export type FulfilmentListData = components["schemas"]["FulfilmentListData"];
export type FulfilmentProof = components["schemas"]["FulfilmentProof"];
export type FulfilmentStatus = components["schemas"]["FulfilmentStatus"];
export type FulfilmentType = components["schemas"]["FulfilmentType"];
export type FreezeCollectionRequest = components["schemas"]["FreezeCollectionRequest"];
export type FulfilmentRecordRequest = components["schemas"]["FulfilmentRecordRequest"];
export type Fulfilment = components["schemas"]["FulfilmentResponse"];
export type FreezeCollection = components["schemas"]["FreezeCollectionResponse"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RecordFulfilmentRequestInput = NonNullable<operations["recordFulfilment"]["requestBody"]>["content"]["application/json"];
export type FreezeOfferCollectionRequestInput = NonNullable<operations["freezeOfferCollection"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListFulfilmentsParams = NonNullable<operations["listFulfilments"]["parameters"]["query"]>;
export type GetFulfilmentParams = operations["getFulfilment"]["parameters"]["path"];
export type RetryFulfilmentParams = operations["retryFulfilment"]["parameters"]["path"];
export type FreezeOfferCollectionParams = operations["freezeOfferCollection"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListFulfilmentsResponse = operations["listFulfilments"]["responses"]["200"]["content"]["application/json"];
export type RecordFulfilmentResponse = operations["recordFulfilment"]["responses"]["201"]["content"]["application/json"];
export type GetFulfilmentResponse = operations["getFulfilment"]["responses"]["200"]["content"]["application/json"];
export type RetryFulfilmentResponse = operations["retryFulfilment"]["responses"]["200"]["content"]["application/json"];
export type FreezeOfferCollectionResponse = operations["freezeOfferCollection"]["responses"]["200"]["content"]["application/json"];


