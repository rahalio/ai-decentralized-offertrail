/**
 * Incidents Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/incidents.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type IncidentId = components["schemas"]["IncidentId"];
export type IncidentListData = components["schemas"]["IncidentListData"];
export type IncidentSeverity = components["schemas"]["IncidentSeverity"];
export type IncidentStatus = components["schemas"]["IncidentStatus"];
export type OfferPauseClass = components["schemas"]["OfferPauseClass"];
export type TrustIncident = components["schemas"]["TrustIncident"];
export type TrustIncidentCreate = components["schemas"]["TrustIncidentCreate"];
export type PauseOffersRequest = components["schemas"]["PauseOffersRequest"];
export type ResumeOffersRequest = components["schemas"]["ResumeOffersRequest"];
export type Incident = components["schemas"]["IncidentResponse"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type DeclareTrustIncidentRequestInput = NonNullable<operations["declareTrustIncident"]["requestBody"]>["content"]["application/json"];
export type PauseOffersForIncidentRequestInput = NonNullable<operations["pauseOffersForIncident"]["requestBody"]>["content"]["application/json"];
export type ResumeOffersForIncidentRequestInput = NonNullable<operations["resumeOffersForIncident"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListTrustIncidentsParams = NonNullable<operations["listTrustIncidents"]["parameters"]["query"]>;
export type GetTrustIncidentParams = operations["getTrustIncident"]["parameters"]["path"];
export type PauseOffersForIncidentParams = operations["pauseOffersForIncident"]["parameters"]["path"];
export type ResumeOffersForIncidentParams = operations["resumeOffersForIncident"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListTrustIncidentsResponse = operations["listTrustIncidents"]["responses"]["200"]["content"]["application/json"];
export type DeclareTrustIncidentResponse = operations["declareTrustIncident"]["responses"]["201"]["content"]["application/json"];
export type GetTrustIncidentResponse = operations["getTrustIncident"]["responses"]["200"]["content"]["application/json"];
export type PauseOffersForIncidentResponse = operations["pauseOffersForIncident"]["responses"]["202"]["content"]["application/json"];
export type ResumeOffersForIncidentResponse = operations["resumeOffersForIncident"]["responses"]["202"]["content"]["application/json"];


