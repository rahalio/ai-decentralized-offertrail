/**
 * IncidentRepository — in-memory product sandbox.
 */

import type { IncidentRepository } from '@offertrail/services/incidents';
import {
  envelope,
  incidentsById,
  nowIso,
  productSandboxId,
  toPublicIncident,
  type IncidentSeverity,
  type SandboxIncident,
} from '../_shared/product-sandbox-store.js';

export class IncidentRepositoryDdb implements IncidentRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listTrustIncidents(
    input: Parameters<IncidentRepository['listTrustIncidents']>[0]
  ): Promise<Awaited<ReturnType<IncidentRepository['listTrustIncidents']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const status = raw.status ? String(raw.status) : undefined;
    const items = [...incidentsById.values()]
      .filter((i) => (status ? i.status === status : true))
      .map(toPublicIncident);
    return envelope({ items }, correlationId) as never;
  }

  async declareTrustIncident(
    input: Parameters<IncidentRepository['declareTrustIncident']>[0]
  ): Promise<Awaited<ReturnType<IncidentRepository['declareTrustIncident']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const orgId = String(raw.orgId ?? 'tnt_demo');
    const now = nowIso();
    const incident: SandboxIncident = {
      id: String(raw.id ?? productSandboxId('inc')),
      orgId,
      severity: String(raw.severity ?? 'medium') as IncidentSeverity,
      status: 'open',
      summary: String(raw.summary ?? 'Sandbox trust incident'),
      linkedOfferIds: Array.isArray(raw.linkedOfferIds)
        ? (raw.linkedOfferIds as string[])
        : [],
      createdAt: now,
      updatedAt: now,
    };
    incidentsById.set(incident.id, incident);
    return envelope(toPublicIncident(incident), correlationId) as never;
  }

  async getTrustIncident(
    input: Parameters<IncidentRepository['getTrustIncident']>[0]
  ): Promise<Awaited<ReturnType<IncidentRepository['getTrustIncident']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const incidentId = String(raw.incidentId ?? raw.id ?? '');
    const incident = incidentsById.get(incidentId);
    if (!incident) return null as never;
    return envelope(toPublicIncident(incident), correlationId) as never;
  }
}
