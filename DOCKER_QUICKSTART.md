# 🐳 Docker Quick Start

## Just want the database? (Recommended for development)

```bash
# Start just the database
docker-compose -f docker-compose.dev.yml up -d

# Your app runs locally with:
npm run dev
```

This connects to `postgresql://postgres:postgres@localhost:5432/smashmed_dev`

## Want everything in Docker?

```bash
# Start database + backend + pgAdmin
docker-compose up

# Or in background
docker-compose up -d
```

## Common Commands

```bash
# Start database only
docker-compose -f docker-compose.dev.yml up -d

# Stop database
docker-compose -f docker-compose.dev.yml down

# Start everything
docker-compose up -d

# View logs
docker-compose logs -f

# Stop everything
docker-compose down

# Clean slate (⚠️ deletes database data)
docker-compose down -v
```

## Access Points

- **Backend**: http://localhost:5000
- **pgAdmin**: http://localhost:5050 (admin@admin.com / admin)
- **Database**: localhost:5432 (postgres / postgres)

## 🎯 Recommended Workflow

1. **Start database:**

   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Setup Prisma:**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Run your app locally:**

   ```bash
   npm run dev
   ```

4. **When done:**
   ```bash
   docker-compose -f docker-compose.dev.yml down
   ```

That's it! Your database runs in Docker, your app runs locally with hot reload. 🚀

See [DOCKER_GUIDE.md](DOCKER_GUIDE.md) for complete documentation.
