/**
 * Consents Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/consents.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ConsentEvent = components["schemas"]["ConsentEvent"];
export type ConsentGrant = components["schemas"]["ConsentGrant"];
export type ConsentId = components["schemas"]["ConsentId"];
export type ConsentListData = components["schemas"]["ConsentListData"];
export type ConsentStatus = components["schemas"]["ConsentStatus"];
export type RevocationEvent = components["schemas"]["RevocationEvent"];
export type StopProcessingStatus = components["schemas"]["StopProcessingStatus"];
export type RevokeConsentRequest = components["schemas"]["RevokeConsentRequest"];
export type Consent = components["schemas"]["ConsentResponse"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type GrantConsentRequestInput = NonNullable<operations["grantConsent"]["requestBody"]>["content"]["application/json"];
export type RevokeConsentRequestInput = NonNullable<operations["revokeConsent"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListConsentsParams = NonNullable<operations["listConsents"]["parameters"]["query"]>;
export type GetConsentParams = operations["getConsent"]["parameters"]["path"];
export type RevokeConsentParams = operations["revokeConsent"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListConsentsResponse = operations["listConsents"]["responses"]["200"]["content"]["application/json"];
export type GrantConsentResponse = operations["grantConsent"]["responses"]["201"]["content"]["application/json"];
export type GetConsentResponse = operations["getConsent"]["responses"]["200"]["content"]["application/json"];
export type RevokeConsentResponse = operations["revokeConsent"]["responses"]["200"]["content"]["application/json"];


