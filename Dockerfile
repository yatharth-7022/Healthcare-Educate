# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies for Prisma
RUN apk add --no-cache openssl

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./
COPY components.json ./
COPY prisma.config.ts ./

# Install dependencies
RUN npm install

# Copy Prisma schema
COPY prisma ./prisma

# Copy source code
COPY server ./server
COPY client ./client
COPY shared ./shared
COPY script ./script

# Generate Prisma client
RUN npx prisma generate

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "dev"]
