FROM node:20-slim as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build


FROM alpine:latest

WORKDIR /frontend_dist
COPY --from=builder /app/dist .
CMD ["sh", "-c", "cp -rp ./* /var/www/html/"]
