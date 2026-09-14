import { apiRequest, type DataEnvelope } from '@/api/client';
import type {
  AuditStatement,
  JourneyCompareReport,
  OfferPerformanceReport,
} from '@/api/types';

export async function getOfferPerformanceReport(params: { period: string; journeyId?: string }) {
  return apiRequest<DataEnvelope<OfferPerformanceReport>>('/v1/reports/offer-performance', {
    query: params,
  });
}

export async function getAuditStatement(params: {
  period: string;
  journeyId?: string;
  format?: 'json' | 'csv';
}) {
  return apiRequest<DataEnvelope<AuditStatement>>('/v1/reports/audit-statement', {
    query: params,
  });
}

export async function compareJourneys(period: string) {
  return apiRequest<DataEnvelope<JourneyCompareReport>>('/v1/reports/journey-compare', {
    query: { period },
  });
}
