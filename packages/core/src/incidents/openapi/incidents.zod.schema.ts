import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const declareTrustIncident_Body = z
  .object({
    severity: z.enum(['low', 'medium', 'high']),
    summary: z.string().min(1),
    linkedOfferIds: z
      .array(z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
  })
  .passthrough();
const pauseOffersForIncident_Body = z
  .object({ offerClass: z.enum(['third_party_share', 'all_live']) })
  .passthrough();
const IncidentStatus = z.enum(['open', 'mitigating', 'closed']);
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const IncidentId = z.string();
const IncidentSeverity = z.enum(['low', 'medium', 'high']);
const OfferPauseClass = z.enum(['third_party_share', 'all_live']);
const TrustIncident = z
  .object({
    id: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
    severity: z.enum(['low', 'medium', 'high']),
    status: z.enum(['open', 'mitigating', 'closed']),
    summary: z.string(),
    linkedOfferIds: z
      .array(z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
    pausedOfferClass: z.enum(['third_party_share', 'all_live']).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
    closedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const IncidentListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
          severity: z.enum(['low', 'medium', 'high']),
          status: z.enum(['open', 'mitigating', 'closed']),
          summary: z.string(),
          linkedOfferIds: z
            .array(z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/))
            .optional(),
          pausedOfferClass: z
            .enum(['third_party_share', 'all_live'])
            .optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }).optional(),
          closedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const IncidentListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
              severity: z.enum(['low', 'medium', 'high']),
              status: z.enum(['open', 'mitigating', 'closed']),
              summary: z.string(),
              linkedOfferIds: z
                .array(z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/))
                .optional(),
              pausedOfferClass: z
                .enum(['third_party_share', 'all_live'])
                .optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }).optional(),
              closedAt: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const TrustIncidentCreate = z
  .object({
    severity: z.enum(['low', 'medium', 'high']),
    summary: z.string().min(1),
    linkedOfferIds: z
      .array(z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
  })
  .passthrough();
const IncidentResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
        severity: z.enum(['low', 'medium', 'high']),
        status: z.enum(['open', 'mitigating', 'closed']),
        summary: z.string(),
        linkedOfferIds: z
          .array(z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/))
          .optional(),
        pausedOfferClass: z.enum(['third_party_share', 'all_live']).optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }).optional(),
        closedAt: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const PauseOffersRequest = z
  .object({ offerClass: z.enum(['third_party_share', 'all_live']) })
  .passthrough();
const ResumeOffersRequest = z
  .object({ confirm: z.boolean() })
  .partial()
  .passthrough();

export const schemas: any = {
  declareTrustIncident_Body,
  pauseOffersForIncident_Body,
  IncidentStatus,
  Problem,
  IncidentId,
  IncidentSeverity,
  OfferPauseClass,
  TrustIncident,
  IncidentListData,
  ResponseMeta,
  IncidentListResponse,
  TrustIncidentCreate,
  IncidentResponse,
  PauseOffersRequest,
  ResumeOffersRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/incidents',
    alias: 'listTrustIncidents',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['open', 'mitigating', 'closed']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
                  severity: z.enum(['low', 'medium', 'high']),
                  status: z.enum(['open', 'mitigating', 'closed']),
                  summary: z.string(),
                  linkedOfferIds: z
                    .array(z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/))
                    .optional(),
                  pausedOfferClass: z
                    .enum(['third_party_share', 'all_live'])
                    .optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }).optional(),
                  closedAt: z.string().datetime({ offset: true }).optional(),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/incidents',
    alias: 'declareTrustIncident',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: declareTrustIncident_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
            severity: z.enum(['low', 'medium', 'high']),
            status: z.enum(['open', 'mitigating', 'closed']),
            summary: z.string(),
            linkedOfferIds: z
              .array(z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/))
              .optional(),
            pausedOfferClass: z
              .enum(['third_party_share', 'all_live'])
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
            closedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/incidents/:incidentId',
    alias: 'getTrustIncident',
    requestFormat: 'json',
    parameters: [
      {
        name: 'incidentId',
        type: 'Path',
        schema: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
            severity: z.enum(['low', 'medium', 'high']),
            status: z.enum(['open', 'mitigating', 'closed']),
            summary: z.string(),
            linkedOfferIds: z
              .array(z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/))
              .optional(),
            pausedOfferClass: z
              .enum(['third_party_share', 'all_live'])
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
            closedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/incidents/:incidentId/pause-offers',
    alias: 'pauseOffersForIncident',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: pauseOffersForIncident_Body,
      },
      {
        name: 'incidentId',
        type: 'Path',
        schema: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
            severity: z.enum(['low', 'medium', 'high']),
            status: z.enum(['open', 'mitigating', 'closed']),
            summary: z.string(),
            linkedOfferIds: z
              .array(z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/))
              .optional(),
            pausedOfferClass: z
              .enum(['third_party_share', 'all_live'])
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
            closedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/incidents/:incidentId/resume-offers',
    alias: 'resumeOffersForIncident',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ confirm: z.boolean() }).partial().passthrough(),
      },
      {
        name: 'incidentId',
        type: 'Path',
        schema: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
            severity: z.enum(['low', 'medium', 'high']),
            status: z.enum(['open', 'mitigating', 'closed']),
            summary: z.string(),
            linkedOfferIds: z
              .array(z.string().regex(/^ofr_[0-9A-HJKMNP-TV-Z]{26}$/))
              .optional(),
            pausedOfferClass: z
              .enum(['third_party_share', 'all_live'])
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
            closedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
