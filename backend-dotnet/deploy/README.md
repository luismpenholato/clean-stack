# Deploy

- **api.yaml**: Deployment + Service for the API. Replace `bp-api:latest` with your image.
- **migration.yaml**: Migration Job. Replace `bp-migration:latest` with your image.

Configuration (e.g., connection string) can be passed via environment variables on the Deployment/Job or via Secret/ConfigMap in real environments.
