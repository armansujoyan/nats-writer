# NATS Subscription Service

A 3-layered NestJS application that subscribes to NATS messages, processes them, and persists them in a PostgreSQL database.

---

## 📦 Project Structure

- **API Layer**: Subscribes to NATS subject(s) and receives messages.
- **Service Layer**: Processes and validates incoming messages.
- **Data Layer**: Persists messages to PostgreSQL using TypeORM.

---

## 🚀 Getting Started

### Prerequisites

- [pnpm](https://pnpm.io/installation)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 🐳 Running the App with Docker Compose

Start all services (Nest app, PostgreSQL, and NATS):

```bash
docker-compose up --build
```

You can then access the NestJS app on http://localhost:3000.

## 🧪 Publishing Test Messages to NATS

You can send test messages to your NATS subject (general) using a CLI script:

📤 Send a Message

```bash
pnpm nats:publish "Hello from CLI"
```

This will publish the following message to general:

```json
{
  "message": "Hello from CLI",
  "timestamp": "2025-04-13T17:55:00.000Z"
}
```

The subscriber will process it and persist it into PostgreSQL.

`Under the hood, this runs the script: scripts/publish.ts.`

## 🛠 Environment Configuration

All configuration is defined in .env:

```env
PORT=3000
NODE_ENV=development

# PostgreSQL config
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=nats
DATABASE_SYNC=false
DATABASE_LOGGING=false

# NATS config
NATS_URL=nats://nats:4222
MESSAGE_SUBJECT=general
```

Feel free to use `.env.sample` as an example

## 🛢️ Database Migrations

This project uses TypeORM with CLI access for migrations.

### 🔧 Generate a new migration

```bash
pnpm db:migration:generate <MigrationFilePath>
```

## 🏁 Run migrations

```bash
pnpm db:migration:run
```

## ↩️ Revert the last migration

```bash
pnpm db:migration:revert
```

Note: Make sure your database is up via Docker before running these.

## 🧼 Linting and Formatting

Run ESLint and Prettier:

```bash
pnpm lint
pnpm format
```
