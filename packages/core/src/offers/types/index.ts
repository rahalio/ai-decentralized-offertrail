/**
 * Offers Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/offers.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ApprovalDecision = components["schemas"]["ApprovalDecision"];
export type ApprovalId = components["schemas"]["ApprovalId"];
export type ApprovalListData = components["schemas"]["ApprovalListData"];
export type ApprovalRecord = components["schemas"]["ApprovalRecord"];
export type ApprovalRole = components["schemas"]["ApprovalRole"];
export type Offer = components["schemas"]["Offer"];
export type OfferCreate = components["schemas"]["OfferCreate"];
export type OfferId = components["schemas"]["OfferId"];
export type OfferListData = components["schemas"]["OfferListData"];
export type OfferStatus = components["schemas"]["OfferStatus"];
export type OfferUpdate = components["schemas"]["OfferUpdate"];
export type OfferVersion = components["schemas"]["OfferVersion"];
export type OfferVersionId = components["schemas"]["OfferVersionId"];
export type OfferVersionListData = components["schemas"]["OfferVersionListData"];
export type ThirdPartySharing = components["schemas"]["ThirdPartySharing"];
export type ValueType = components["schemas"]["ValueType"];
export type OfferApprovalRequest = components["schemas"]["OfferApprovalRequest"];
export type Version = operations["listOfferVersions"]["responses"]["200"]["content"]["application/json"]["data"];
export type Approval = operations["listPendingApprovals"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateOfferRequestInput = NonNullable<operations["createOffer"]["requestBody"]>["content"]["application/json"];
export type UpdateOfferRequestInput = NonNullable<operations["updateOffer"]["requestBody"]>["content"]["application/json"];
export type UpdateOfferRequest = UpdateOfferRequestInput;
export type RecordOfferApprovalRequestInput = NonNullable<operations["recordOfferApproval"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListOffersParams = NonNullable<operations["listOffers"]["parameters"]["query"]>;
export type GetOfferParams = operations["getOffer"]["parameters"]["path"];
export type UpdateOfferParams = operations["updateOffer"]["parameters"]["path"];
export type ListOfferVersionsParams = operations["listOfferVersions"]["parameters"]["path"];
export type SubmitOfferForApprovalParams = operations["submitOfferForApproval"]["parameters"]["path"];
export type RecordOfferApprovalParams = operations["recordOfferApproval"]["parameters"]["path"];
export type ListPendingApprovalsParams = NonNullable<operations["listPendingApprovals"]["parameters"]["query"]>;
export type ListOfferApprovalsParams = operations["listOfferApprovals"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListOffersResponse = operations["listOffers"]["responses"]["200"]["content"]["application/json"];
export type CreateOfferResponse = operations["createOffer"]["responses"]["201"]["content"]["application/json"];
export type GetOfferResponse = operations["getOffer"]["responses"]["200"]["content"]["application/json"];
export type UpdateOfferResponse = operations["updateOffer"]["responses"]["200"]["content"]["application/json"];
export type ListOfferVersionsResponse = operations["listOfferVersions"]["responses"]["200"]["content"]["application/json"];
export type SubmitOfferForApprovalResponse = operations["submitOfferForApproval"]["responses"]["200"]["content"]["application/json"];
export type RecordOfferApprovalResponse = operations["recordOfferApproval"]["responses"]["200"]["content"]["application/json"];
export type ListPendingApprovalsResponse = operations["listPendingApprovals"]["responses"]["200"]["content"]["application/json"];
export type ListOfferApprovalsResponse = operations["listOfferApprovals"]["responses"]["200"]["content"]["application/json"];


