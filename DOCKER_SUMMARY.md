# 🐳 Docker Setup Complete!

## What You Got

I've created a complete Docker setup with TWO options:

### Option 1: Database Only (Recommended) 🌟

**File:** `docker-compose.dev.yml`

Just runs PostgreSQL + pgAdmin in Docker, your app runs locally.

```bash
# Start database
docker-compose -f docker-compose.dev.yml up -d

# Run app locally (with hot reload!)
npm run dev
```

**Perfect for development because:**

- ✅ Fast hot reload
- ✅ Easy debugging
- ✅ Use your local Node.js
- ✅ Database never needs manual setup

### Option 2: Full Stack

**File:** `docker-compose.yml`

Runs EVERYTHING in Docker (database + backend + pgAdmin).

```bash
docker-compose up -d
```

**Good for:**

- Testing deployment
- Consistent environments
- CI/CD pipelines

## 🚀 Ultra Quick Start

Just run this ONE command:

```bash
npm run setup
```

This script will:

1. ✅ Check Docker is installed
2. ✅ Install dependencies
3. ✅ Create .env file
4. ✅ Start PostgreSQL
5. ✅ Setup Prisma
6. ✅ Create database schema

Then just:

```bash
npm run dev
```

## 📦 Helpful Commands Added

I added these to package.json:

```bash
# Database commands
npm run docker:db          # Start database only
npm run docker:db:stop     # Stop database
npm run db:studio          # Open Prisma Studio

# Full Docker
npm run docker:full        # Start everything in Docker
npm run docker:full:stop   # Stop everything
npm run docker:clean       # Clean up (deletes data).

# Setup
npm run setup              # Complete setup script
```

## 🎯 Your Recommended Workflow

**Day 1 (First time):**

```bash
npm run setup
npm run dev
```

**Every day after:**

```bash
npm run docker:db    # Start database
npm run dev          # Start app
```

**When done:**

```bash
npm run docker:db:stop    # Stop database
```

The database data persists! No need to setup again. 🎉

## 📊 What's Running

When you run `docker-compose -f docker-compose.dev.yml up -d`:

1. **PostgreSQL** (port 5432)
   - Database: `smashmed_dev`
   - User: `postgres`
   - Password: `postgres`

2. **pgAdmin** (port 5050)
   - URL: http://localhost:5050
   - Email: `admin@admin.com`
   - Password: `admin`

## 🗄️ Accessing Your Database

### Option 1: Prisma Studio (Best for data viewing)

```bash
npm run db:studio
```

Opens at: http://localhost:5555

### Option 2: pgAdmin (Best for SQL queries)

1. Open: http://localhost:5050
2. Login: `admin@admin.com` / `admin`
3. Add server:
   - Host: `postgres`
   - Port: `5432`
   - Database: `smashmed_dev`
   - Username: `postgres`
   - Password: `postgres`

### Option 3: Command Line

```bash
docker-compose -f docker-compose.dev.yml exec postgres psql -U postgres -d smashmed_dev
```

## 📁 Files Created

```
├── docker-compose.yml           # Full stack setup
├── docker-compose.dev.yml       # Database only (recommended)
├── Dockerfile                   # Backend container config
├── .dockerignore               # Docker ignore rules
├── setup.sh                    # Automated setup script
├── DOCKER_GUIDE.md            # Complete Docker reference
├── DOCKER_QUICKSTART.md       # Quick Docker guide
└── README.md                  # Updated main readme
```

## 🎨 Database Persists!

Your database data is stored in Docker volumes:

- Even if you stop containers
- Even if you restart your computer
- Until you run `npm run docker:clean`

This means:

- ✅ Register once, login forever
- ✅ No need to re-seed data
- ✅ Fast restarts

## 🔥 Hot Reload Still Works!

When running the app locally (`npm run dev`):

- Edit backend code → auto restarts
- Edit frontend code → instant reload
- Edit Prisma schema → run `npm run db:push`

## 🛑 Stopping Services

```bash
# Stop database only
npm run docker:db:stop

# Stop everything (if using full docker)
npm run docker:full:stop

# Clean everything (⚠️ deletes database data)
npm run docker:clean
```

## 💡 Pro Tips

1. **Keep database running**

   ```bash
   # Start database once
   npm run docker:db

   # Leave it running for weeks!
   # Just run npm run dev when you code
   ```

2. **View logs**

   ```bash
   docker-compose -f docker-compose.dev.yml logs -f
   ```

3. **Reset database**

   ```bash
   npm run docker:clean
   npm run docker:db
   npm run db:push
   ```

4. **Check status**
   ```bash
   docker-compose -f docker-compose.dev.yml ps
   ```

## 🐛 Troubleshooting

### Port 5432 already in use?

```bash
# Stop local PostgreSQL
brew services stop postgresql

# Or find what's using the port
lsof -i :5432
```

### Docker not running?

1. Open Docker Desktop
2. Wait for it to start
3. Try again

### Connection refused?

```bash
# Check database is running
docker-compose -f docker-compose.dev.yml ps

# Restart database
npm run docker:db:stop
npm run docker:db
```

## 🎉 You're Done!

No more:

- ❌ "Did I start the database?"
- ❌ "Where's my PostgreSQL?"
- ❌ "How do I connect?"
- ❌ Manual database setup

Just:

- ✅ `npm run docker:db` once
- ✅ `npm run dev` to code
- ✅ Everything works!

Happy coding! 🚀

---

**Quick Reference:**

```bash
npm run setup          # First time setup
npm run docker:db      # Start database
npm run dev            # Start app
npm run db:studio      # View database
```

See [DOCKER_GUIDE.md](DOCKER_GUIDE.md) for complete documentation.
