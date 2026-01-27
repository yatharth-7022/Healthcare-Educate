# Docker Compose Development Guide

## 🚀 Quick Start

Start everything with one command:

```bash
docker-compose up
```

Or run in detached mode (background):

```bash
docker-compose up -d
```

## 📦 What's Included

### Services

1. **PostgreSQL Database** (postgres)
   - Port: `5432`
   - Database: `smashmed_dev`
   - User: `postgres`
   - Password: `postgres`
   - Persistent storage with Docker volumes

2. **Backend Application** (app)
   - Port: `5000`
   - Auto-restarts on code changes
   - Automatically runs Prisma migrations
   - Connected to PostgreSQL

3. **pgAdmin** (pgadmin) - Optional Database UI
   - Port: `5050`
   - Email: `admin@admin.com`
   - Password: `admin`
   - Access at: `http://localhost:5050`

## 🎯 Common Commands

### Start all services

```bash
docker-compose up
```

### Start in background

```bash
docker-compose up -d
```

### View logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app
docker-compose logs -f postgres
```

### Stop all services

```bash
docker-compose down
```

### Stop and remove volumes (⚠️ This deletes database data)

```bash
docker-compose down -v
```

### Restart a specific service

```bash
docker-compose restart app
docker-compose restart postgres
```

### Rebuild containers

```bash
docker-compose up --build
```

### Execute commands in containers

```bash
# Access app container shell
docker-compose exec app sh

# Access PostgreSQL
docker-compose exec postgres psql -U postgres -d smashmed_dev

# Run Prisma commands
docker-compose exec app npx prisma studio
docker-compose exec app npx prisma db push
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
JWT_ACCESS_SECRET=your-super-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key
SESSION_SECRET=your-session-secret
```

Or use the defaults from docker-compose.yml.

### Database Connection

The app automatically connects to the database using:

```
postgresql://postgres:postgres@postgres:5432/smashmed_dev
```

No need to change anything - it just works! ✨

## 🗄️ Database Management

### Using pgAdmin

1. Start services: `docker-compose up -d`
2. Open browser: `http://localhost:5050`
3. Login with:
   - Email: `admin@admin.com`
   - Password: `admin`
4. Add new server:
   - Host: `postgres`
   - Port: `5432`
   - Database: `smashmed_dev`
   - Username: `postgres`
   - Password: `postgres`

### Using Prisma Studio

```bash
docker-compose exec app npx prisma studio
```

Then open: `http://localhost:5555`

### Direct PostgreSQL Access

```bash
docker-compose exec postgres psql -U postgres -d smashmed_dev
```

## 📝 Development Workflow

1. **First time setup:**

   ```bash
   docker-compose up --build
   ```

2. **Daily development:**

   ```bash
   docker-compose up
   ```

   - Edit code in your editor
   - Changes auto-reload (hot reload enabled)
   - Database persists between restarts

3. **Database changes:**

   ```bash
   # Edit prisma/schema.prisma
   docker-compose exec app npx prisma db push
   ```

4. **Clean restart:**

   ```bash
   docker-compose down
   docker-compose up
   ```

5. **Fresh start (deletes data):**
   ```bash
   docker-compose down -v
   docker-compose up --build
   ```

## 🐛 Troubleshooting

### Port already in use

```bash
# Check what's using the port
lsof -i :5432
lsof -i :5000

# Kill the process or change ports in docker-compose.yml
```

### Database connection issues

```bash
# Check if postgres is healthy
docker-compose ps

# View postgres logs
docker-compose logs postgres

# Restart database
docker-compose restart postgres
```

### App won't start

```bash
# View app logs
docker-compose logs app

# Rebuild the app
docker-compose up --build app
```

### Clear everything and start fresh

```bash
docker-compose down -v
docker system prune -a
docker-compose up --build
```

## 🎨 Customization

### Change PostgreSQL version

Edit `docker-compose.yml`:

```yaml
postgres:
  image: postgres:15-alpine # or postgres:14-alpine
```

### Change ports

Edit `docker-compose.yml`:

```yaml
ports:
  - "3000:5000" # Map host port 3000 to container port 5000
```

### Add more services

Add to `docker-compose.yml`:

```yaml
redis:
  image: redis:alpine
  ports:
    - "6379:6379"
```

## 🔒 Production Notes

For production, you should:

1. Use environment-specific `.env` files
2. Change default passwords
3. Use Docker secrets for sensitive data
4. Remove pgAdmin service
5. Use proper SSL certificates
6. Set `NODE_ENV=production`
7. Build optimized images
8. Use health checks
9. Configure logging
10. Set up monitoring

## 📊 Monitoring

### Check service status

```bash
docker-compose ps
```

### View resource usage

```bash
docker stats
```

### Check logs

```bash
docker-compose logs -f --tail=100
```

## 🎯 Quick Reference

| Action         | Command                                     |
| -------------- | ------------------------------------------- |
| Start all      | `docker-compose up`                         |
| Start detached | `docker-compose up -d`                      |
| Stop all       | `docker-compose down`                       |
| View logs      | `docker-compose logs -f`                    |
| Rebuild        | `docker-compose up --build`                 |
| Clean slate    | `docker-compose down -v`                    |
| Shell access   | `docker-compose exec app sh`                |
| Run Prisma     | `docker-compose exec app npx prisma studio` |

## ✅ Benefits

✨ **One command to rule them all** - No more manual database setup
🔄 **Automatic restarts** - Database and app restart automatically
💾 **Persistent data** - Database data survives container restarts
🔥 **Hot reload** - Code changes reflect immediately
🐳 **Isolated environment** - No conflicts with other projects
🧹 **Easy cleanup** - One command to remove everything
📦 **Reproducible** - Same environment for all developers

Enjoy your streamlined development workflow! 🚀
