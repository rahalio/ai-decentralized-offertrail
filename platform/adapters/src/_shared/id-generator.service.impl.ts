/**
 * ID Generator Service Implementation — Offertrail prefixes.
 */

import type { DomainCode } from '@offertrail/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@offertrail/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@offertrail/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  jrnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.journeys);
  }
  ofrId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.offers);
  }
  ovnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.offerVersion);
  }
  aprId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.approvals);
  }
  cnsId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.consents);
  }
  fulId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.fulfilments);
  }
  incId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.incidents);
  }
  rptId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.reporting);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
