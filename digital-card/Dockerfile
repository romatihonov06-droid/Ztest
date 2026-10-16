# ── build stage ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

# ── production stage ──────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# Копируем сгенерированный Prisma client и скомпилированное приложение
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# ts-node нужен для выполнения seed.ts в runtime
RUN npm install ts-node typescript --save-dev

EXPOSE 3000

# entrypoint: миграции → сид → запуск приложения
CMD ["sh", "-c", "npx prisma migrate deploy && npx ts-node prisma/seed.ts && node dist/main"]
