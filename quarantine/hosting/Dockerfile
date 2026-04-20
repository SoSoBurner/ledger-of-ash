# ── Ledger of Ash — Static Frontend Dockerfile ──
# For Phase 1: serves the built single-file HTML
# For Phase 2: replace with React/Vite build + Fastify API

FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN python3 build.py

FROM nginx:alpine
COPY --from=builder /app/dist/index.html /usr/share/nginx/html/index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
