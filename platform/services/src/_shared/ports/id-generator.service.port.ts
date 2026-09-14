/**
 * IdGeneratorService Port — Offertrail domain prefixes.
 */

import type { DomainCode } from '@offertrail/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  jrnId(): string;
  ofrId(): string;
  ovnId(): string;
  aprId(): string;
  cnsId(): string;
  fulId(): string;
  incId(): string;
  rptId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
