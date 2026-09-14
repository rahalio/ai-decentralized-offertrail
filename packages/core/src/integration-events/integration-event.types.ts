/**
 * Integration event type definition (hand-maintained companion to generated registry).
 */

export type IntegrationEventTypeDefinition = {
  type: string;
  domain: string;
  aggregateType?: string;
  description?: string;
  defaultDeliveryMode?: "sync" | "async";
};
