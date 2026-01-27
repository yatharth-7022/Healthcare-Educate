# 🚀 Docker Cheat Sheet

## One-Time Setup

```bash
npm run setup
```

## Daily Workflow

### Start Your Day

```bash
npm run docker:db    # Start database (just once)
npm run dev          # Start app
```

### End Your Day

```bash
# Press Ctrl+C to stop npm run dev
npm run docker:db:stop    # Optional: stop database
```

## Common Commands

| Task                          | Command                                                        |
| ----------------------------- | -------------------------------------------------------------- |
| 🚀 First time setup           | `npm run setup`                                                |
| 🗄️ Start database             | `npm run docker:db`                                            |
| 🛑 Stop database              | `npm run docker:db:stop`                                       |
| 💻 Start app                  | `npm run dev`                                                  |
| 📊 View database (GUI)        | `npm run db:studio`                                            |
| 🔄 Reset database             | `npm run docker:clean && npm run docker:db && npm run db:push` |
| 🐳 Start everything in Docker | `npm run docker:full`                                          |
| 📝 View logs                  | `docker-compose -f docker-compose.dev.yml logs -f`             |

## Access Points

| Service       | URL                   | Credentials             |
| ------------- | --------------------- | ----------------------- |
| App           | http://localhost:5000 | -                       |
| Prisma Studio | http://localhost:5555 | -                       |
| pgAdmin       | http://localhost:5050 | admin@admin.com / admin |
| PostgreSQL    | localhost:5432        | postgres / postgres     |

## Troubleshooting

### Port Already in Use

```bash
lsof -i :5432        # Find what's using port
brew services stop postgresql    # Stop local PostgreSQL
```

### Database Won't Connect

```bash
docker-compose -f docker-compose.dev.yml ps       # Check status
docker-compose -f docker-compose.dev.yml restart postgres    # Restart
```

### Start Fresh

```bash
npm run docker:clean    # Remove everything
npm run setup           # Setup again
```

## Pro Tips

💡 **Leave database running** - No need to stop it daily  
💡 **Data persists** - Your data survives container restarts  
💡 **Hot reload works** - Code changes reload instantly  
💡 **Use Prisma Studio** - Best way to view/edit data

## Quick Reference

**Recommended flow:**

```bash
# Day 1
npm run setup

# Every day after
npm run docker:db
npm run dev
# ... code all day ...
# Press Ctrl+C when done

# Database keeps running (optional to stop)
```

**If something breaks:**

```bash
npm run docker:clean
npm run setup
```

That's it! 🎉
