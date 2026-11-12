# Scalable E-commerce Backend

Backend-only reference application built with plain JavaScript ES Modules, Node.js, Express, PostgreSQL, Prisma and Zod.

## Engineering conventions

- ES Modules everywhere: `import` / `export`; no CommonJS.
- JavaScript only: no TypeScript, interfaces, or `tsconfig`.
- Each business module follows the same flow:
  `routes -> controller -> service -> repository -> Prisma`.
- Controllers handle HTTP input/output only.
- Services own business rules and orchestration.
- Repositories own database access.
- Zod schemas validate request body, query and params.
- Validated request data is passed through `res.locals.validated`.
- Shared middleware, errors and utilities are kept under `src/shared`.
- Use explicit `.js` extensions in relative imports for Node ESM compatibility.

## Project structure

```text
src/
  config/
    env.js
    prisma.js
  modules/
    auth/
      auth.routes.js
      auth.controller.js
      auth.service.js
      auth.repository.js
      auth.validator.js
    users/
      user.routes.js
      user.controller.js
      user.service.js
      user.repository.js
      user.validator.js
    products/
      product.routes.js
      product.controller.js
      product.service.js
      product.repository.js
      product.validator.js
    categories/
      category.routes.js
      category.controller.js
      category.service.js
      category.repository.js
      category.validator.js
    cart/
      cart.routes.js
      cart.controller.js
      cart.service.js
      cart.repository.js
      cart.validator.js
    orders/
      order.routes.js
      order.controller.js
      order.service.js
      order.repository.js
      order.validator.js
  routes/
    index.js
  shared/
    errors/
    middlewares/
    types/
    utils/
  app.js
  server.js
prisma/
  schema.prisma
  seed.js
```

## Requirements

- Node.js 20+
- PostgreSQL
- npm

## Setup

```bash
npm install
```

Copy `.env.example` to `.env`, configure PostgreSQL and set a random JWT secret of at least 32 characters.

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

API base URL: `http://localhost:4000/api/v1`

Seed admin credentials for local development only:
- Email: `admin@example.com`
- Password: `ChangeMe123!`

Change these credentials immediately; never use them in production.

## API endpoints

| Method | Endpoint | Access |
|---|---|---|
| POST | `/auth/register` | Public |
| POST | `/auth/login` | Public |
| GET | `/users/me` | Authenticated |
| GET | `/users` | Admin |
| GET | `/categories` | Public |
| GET | `/categories/:id` | Public |
| POST | `/categories` | Admin |
| GET | `/products` | Public |
| GET | `/products/:id` | Public |
| POST | `/products` | Admin |
| PATCH | `/products/:id` | Admin |
| GET | `/cart` | Authenticated |
| POST | `/cart/items` | Authenticated |
| PATCH | `/cart/items/:itemId` | Authenticated |
| DELETE | `/cart/items/:itemId` | Authenticated |
| POST | `/orders` | Authenticated |
| GET | `/orders` | Authenticated |
| GET | `/orders/:id` | Authenticated |

Send JWT access tokens using `Authorization: Bearer <token>`.

## Production checklist

This project is a learning/reference foundation and must be reviewed and extended before production use:
- Implement refresh-token rotation, revocation, password reset and email verification.
- Add tests (unit, integration and API), CI and OpenAPI documentation.
- Integrate a payment provider and verify signed webhooks; never trust a client-side "paid" flag.
- Add idempotency keys and concurrency-safe inventory reservation for checkout.
- Add audit logs, observability, secret management, TLS and database backups.
- Configure strict CORS origins and rate limits for the deployment environment.
- Review database pooling, query plans, authorization and data retention policies.
