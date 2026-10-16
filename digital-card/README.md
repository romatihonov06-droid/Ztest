# Digital Card — backend business card

NestJS · GraphQL · Prisma · PostgreSQL · Docker

## Quick start

```bash
docker compose up --build
```

After the containers start the API will be available at `http://localhost:3000/graphql`.

Open Apollo Sandbox and point it at the endpoint above:

```
https://studio.apollographql.com/sandbox?endpoint=http://localhost:3000/graphql
```

## Example query

```graphql
query {
  profile {
    name
    description
    links {
      label
      url
    }
    skills {
      name
      category
    }
    experience {
      company
      position
      startDate
      endDate
      achievements
    }
    projects {
      name
      description
      url
    }
  }
}
```

## Local development (without Docker)

```bash
cp .env.example .env
# edit DATABASE_URL in .env

npm install
npx prisma migrate deploy
npx ts-node prisma/seed.ts
npm run start:dev
```
