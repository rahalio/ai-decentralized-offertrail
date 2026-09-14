# DynamoDB Local (optional)

Product domains use an in-memory sandbox by default. Use Dynamo Local when wiring real `x-dynamodb` persistence:

```bash
docker compose up -d
TABLE_NAME=offertrail-core-local AWS_ENDPOINT_URL=http://localhost:8000 node scripts/ensure-dynamo-table.mjs
TABLE_NAME=offertrail-core-local AWS_ENDPOINT_URL=http://localhost:8000 AWS_REGION=us-east-1 pnpm --filter @offertrail/api-server dev
```
