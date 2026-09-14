import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createJourney_Body = z
  .object({
    name: z.string().min(1).max(200),
    description: z.string().max(2000).optional(),
    owners: z.array(z.string()).optional(),
  })
  .passthrough();
const updateJourney_Body = z
  .object({
    name: z.string().min(1).max(200),
    description: z.string().max(2000),
    owners: z.array(z.string()),
    status: z.enum(['draft', 'active', 'archived']),
    orchestrationStatus: z.enum(['not_connected', 'connected', 'degraded']),
  })
  .partial()
  .passthrough();
const JourneyStatus = z.enum(['draft', 'active', 'archived']);
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
const JourneyId = z.string();
const OrchestrationStatus = z.enum(['not_connected', 'connected', 'degraded']);
const Journey = z
  .object({
    id: z.string().regex(/^jrn_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string().min(1).max(200),
    description: z.string().max(2000).optional(),
    status: z.enum(['draft', 'active', 'archived']),
    owners: z.array(z.string()).optional(),
    orchestrationStatus: z
      .enum(['not_connected', 'connected', 'degraded'])
      .optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const JourneyListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^jrn_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string().min(1).max(200),
          description: z.string().max(2000).optional(),
          status: z.enum(['draft', 'active', 'archived']),
          owners: z.array(z.string()).optional(),
          orchestrationStatus: z
            .enum(['not_connected', 'connected', 'degraded'])
            .optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }).optional(),
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
const JourneyListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^jrn_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string().min(1).max(200),
              description: z.string().max(2000).optional(),
              status: z.enum(['draft', 'active', 'archived']),
              owners: z.array(z.string()).optional(),
              orchestrationStatus: z
                .enum(['not_connected', 'connected', 'degraded'])
                .optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }).optional(),
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
const JourneyCreate = z
  .object({
    name: z.string().min(1).max(200),
    description: z.string().max(2000).optional(),
    owners: z.array(z.string()).optional(),
  })
  .passthrough();
const JourneyResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^jrn_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string().min(1).max(200),
        description: z.string().max(2000).optional(),
        status: z.enum(['draft', 'active', 'archived']),
        owners: z.array(z.string()).optional(),
        orchestrationStatus: z
          .enum(['not_connected', 'connected', 'degraded'])
          .optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }).optional(),
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
const JourneyUpdate = z
  .object({
    name: z.string().min(1).max(200),
    description: z.string().max(2000),
    owners: z.array(z.string()),
    status: z.enum(['draft', 'active', 'archived']),
    orchestrationStatus: z.enum(['not_connected', 'connected', 'degraded']),
  })
  .partial()
  .passthrough();

export const schemas: any = {
  createJourney_Body,
  updateJourney_Body,
  JourneyStatus,
  Problem,
  JourneyId,
  OrchestrationStatus,
  Journey,
  JourneyListData,
  ResponseMeta,
  JourneyListResponse,
  JourneyCreate,
  JourneyResponse,
  JourneyUpdate,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/journeys',
    alias: 'listJourneys',
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
        schema: z.enum(['draft', 'active', 'archived']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^jrn_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string().min(1).max(200),
                  description: z.string().max(2000).optional(),
                  status: z.enum(['draft', 'active', 'archived']),
                  owners: z.array(z.string()).optional(),
                  orchestrationStatus: z
                    .enum(['not_connected', 'connected', 'degraded'])
                    .optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/journeys',
    alias: 'createJourney',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createJourney_Body,
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
            id: z.string().regex(/^jrn_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            description: z.string().max(2000).optional(),
            status: z.enum(['draft', 'active', 'archived']),
            owners: z.array(z.string()).optional(),
            orchestrationStatus: z
              .enum(['not_connected', 'connected', 'degraded'])
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/journeys/:journeyId',
    alias: 'getJourney',
    requestFormat: 'json',
    parameters: [
      {
        name: 'journeyId',
        type: 'Path',
        schema: z.string().regex(/^jrn_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^jrn_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            description: z.string().max(2000).optional(),
            status: z.enum(['draft', 'active', 'archived']),
            owners: z.array(z.string()).optional(),
            orchestrationStatus: z
              .enum(['not_connected', 'connected', 'degraded'])
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'patch',
    path: '/v1/journeys/:journeyId',
    alias: 'updateJourney',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateJourney_Body,
      },
      {
        name: 'journeyId',
        type: 'Path',
        schema: z.string().regex(/^jrn_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^jrn_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            description: z.string().max(2000).optional(),
            status: z.enum(['draft', 'active', 'archived']),
            owners: z.array(z.string()).optional(),
            orchestrationStatus: z
              .enum(['not_connected', 'connected', 'degraded'])
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/journeys/:journeyId/archive',
    alias: 'archiveJourney',
    requestFormat: 'json',
    parameters: [
      {
        name: 'journeyId',
        type: 'Path',
        schema: z.string().regex(/^jrn_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^jrn_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(200),
            description: z.string().max(2000).optional(),
            status: z.enum(['draft', 'active', 'archived']),
            owners: z.array(z.string()).optional(),
            orchestrationStatus: z
              .enum(['not_connected', 'connected', 'degraded'])
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
