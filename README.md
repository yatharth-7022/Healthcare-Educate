# Healthcare-Educate Platform

A professional healthcare education platform with secure authentication.

## 🚀 Quick Start

### Option 1: Docker (Recommended - Zero Setup!)

```bash
# Start database
docker-compose -f docker-compose.dev.yml up -d

# Setup Prisma
npx prisma generate
npx prisma db push

# Run app
npm run dev
```

Visit: http://localhost:5000

### Option 2: Local PostgreSQL

1. Install and start PostgreSQL
2. Update `.env` with your database URL
3. Run:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run dev
   ```

## 📦 What's Included

✅ **Backend** - Express.js with TypeScript  
✅ **Frontend** - React with TypeScript  
✅ **Database** - PostgreSQL with Prisma ORM  
✅ **Auth** - JWT access & refresh tokens  
✅ **Security** - bcrypt password hashing, HttpOnly cookies  
✅ **Logging** - Winston professional logging  
✅ **Validation** - Zod schema validation  
✅ **UI** - Beautiful Tailwind CSS + shadcn/ui

## 🐳 Docker Options

We provide two Docker setups:

### 1. Database Only (Recommended for Development)

```bash
docker-compose -f docker-compose.dev.yml up -d
```

- Runs PostgreSQL + pgAdmin
- App runs locally with hot reload
- Fast, simple, perfect for development

### 2. Full Stack in Docker

```bash
docker-compose up -d
```

- Runs PostgreSQL + Backend + pgAdmin
- Everything containerized
- Good for testing deployment

See [DOCKER_QUICKSTART.md](DOCKER_QUICKSTART.md) for details.

## 📚 Documentation

- [🔐 Authentication System](AUTH_README.md) - Complete auth documentation
- [⚡ Getting Started](GETTING_STARTED.md) - Detailed setup guide
- [🐳 Docker Guide](DOCKER_GUIDE.md) - Full Docker reference
- [🚀 Docker Quick Start](DOCKER_QUICKSTART.md) - Fast Docker setup

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start database (Docker)
docker-compose -f docker-compose.dev.yml up -d

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Start development server
npm run dev

# View database (Prisma Studio)
npx prisma studio

# View database (pgAdmin)
# Open http://localhost:5050
```

## 📁 Project Structure

```
├── client/              # Frontend React app
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── hooks/       # Custom hooks (auth, etc)
│   │   ├── lib/         # Utilities (API client)
│   │   └── pages/       # Page components
├── server/              # Backend Express app
│   ├── config/          # Configuration
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   └── utils/           # Utilities (JWT, logger)
├── prisma/              # Database schema
└── shared/              # Shared types
```

## 🔑 Environment Variables

Copy `.env.example` to `.env` and update:

```env
# For Docker
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/smashmed_dev

# JWT Secrets (change in production!)
JWT_ACCESS_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
```

## 🎯 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Other

- `POST /api/subscribers` - Newsletter subscription

## 🧪 Testing the App

1. Start services:

   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   npm run dev
   ```

2. Visit http://localhost:5000/auth

3. Register a new account

4. Get redirected to dashboard

5. Test logout and login

## 🗄️ Database Access

### Prisma Studio (Recommended)

```bash
npx prisma studio
```

Open: http://localhost:5555

### pgAdmin (Included in Docker)

Open: http://localhost:5050

- Email: `admin@admin.com`
- Password: `admin`

### Direct PostgreSQL

```bash
docker-compose -f docker-compose.dev.yml exec postgres psql -U postgres -d smashmed_dev
```

## 🛑 Stopping Services

```bash
# Stop database
docker-compose -f docker-compose.dev.yml down

# Stop everything (if using full docker)
docker-compose down
```

## 🧹 Clean Up

```bash
# Remove containers and volumes (⚠️ deletes data)
docker-compose -f docker-compose.dev.yml down -v

# Or
docker-compose down -v
```

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run check        # TypeScript type check
```

## 🚀 Deployment

See individual documentation files for deployment guides.

## 💡 Tips

- Use `docker-compose.dev.yml` for daily development
- Use `docker-compose.yml` for testing full deployment
- Database data persists in Docker volumes
- App auto-reloads when you edit files
- Check logs: `docker-compose logs -f`

## 🐛 Troubleshooting

### Port already in use

```bash
# Find and kill process using port
lsof -i :5432
lsof -i :5000
```

### Database connection failed

```bash
# Check if database is running
docker-compose -f docker-compose.dev.yml ps

# View database logs
docker-compose -f docker-compose.dev.yml logs postgres
```

### Clean start

```bash
docker-compose down -v
docker-compose -f docker-compose.dev.yml up -d
npx prisma db push
npm run dev
```

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please read the documentation before submitting PRs.

---

Made with ❤️ for Healthcare Education
