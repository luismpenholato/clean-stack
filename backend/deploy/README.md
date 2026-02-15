# Deploy

- **api.yaml**: Deployment + Service da API. Troque `bp-api:latest` pela sua imagem.
- **migration.yaml**: Job da migration. Troque `bp-migration:latest` pela sua imagem.

Config (ex.: connection string) pode ser passada por variáveis de ambiente no Deployment/Job ou por Secret/ConfigMap quando for usar em ambiente real.
