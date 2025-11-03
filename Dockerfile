# Multi-stage Dockerfile for Vite React frontend (OAG)
# Stage 1: build the app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies based on package-lock/package.json
# Copy package files first to take advantage of Docker cache
COPY package*.json ./

# If you use npm ci in CI, keep it; otherwise npm install is fine.
RUN npm ci --silent

# Copy rest of the source
COPY . .

# Build the app (expects "build" script defined in package.json)
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:stable-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy custom nginx config (SPA-friendly routing)
# This replaces the default nginx config so client-side routes fall back to index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE port 80
EXPOSE 80

# Use default nginx entrypoint; start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
