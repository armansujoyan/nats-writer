# Base image
FROM node:20.11.1-alpine AS base

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml  ./

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

# Development image
FROM base as development

ENV NODE_ENV=development

CMD ["pnpm", "start:debug"]

# Production image
FROM base as production

ENV NODE_ENV=production

CMD ["pnpm", "start:prod"]

