# Authentication System - Quick Start Guide

## ✅ Implementation Complete!

Your authentication system is now fully implemented with:

- ✅ Clean Service-Controller architecture
- ✅ JWT access & refresh tokens
- ✅ Secure password hashing with bcrypt
- ✅ Winston logging
- ✅ Complete error handling
- ✅ Frontend integration with React hooks
- ✅ Dashboard page

## 📁 Project Structure

```
server/
├── config/
│   └── env.ts                 # Environment configuration
├── controllers/
│   └── authController.ts      # HTTP request handlers
├── services/
│   └── authService.ts         # Business logic
├── middleware/
│   ├── authMiddleware.ts      # JWT authentication
│   └── errorHandler.ts        # Global error handling
├── utils/
│   ├── jwt.ts                 # JWT token utilities
│   ├── logger.ts              # Winston logger
│   └── AppError.ts            # Custom error classes
└── routes/
    └── authRoutes.ts          # Auth route definitions

client/src/
├── lib/
│   └── api.ts                 # API client functions
├── hooks/
│   └── use-auth.ts            # Auth React hook
└── pages/
    ├── AuthPage.tsx           # Login/Register page
    └── Dashboard.tsx          # Protected dashboard
```

## 🚀 Getting Started

### 1. Environment Setup

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/smashmed_dev
JWT_ACCESS_SECRET=your-super-secret-key-here
JWT_REFRESH_SECRET=your-other-secret-key-here
NODE_ENV=development
PORT=5000
```

### 2. Database Setup

Make sure PostgreSQL is running, then:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### 3. Start the Application

```bash
npm run dev
```

The app will be available at: `http://localhost:5000`

## 🔐 API Endpoints

### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"password123"}'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get Profile (requires access token)

```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Refresh Token

```bash
curl -X POST http://localhost:5000/api/auth/refresh \
  --cookie "refreshToken=YOUR_REFRESH_TOKEN"
```

### Logout

```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🎯 Frontend Usage

### Using the Auth Hook

```tsx
import { useAuth } from "@/hooks/use-auth";

function MyComponent() {
  const {
    user, // Current user or null
    isAuthenticated, // Boolean
    login, // async (data) => Promise
    register, // async (data) => Promise
    logout, // async () => Promise
    isLoading, // Boolean
  } = useAuth();

  const handleLogin = async () => {
    try {
      await login({
        email: "user@example.com",
        password: "password",
      });
      // Redirect to dashboard
    } catch (error) {
      console.error(error);
    }
  };

  return <div>{user?.username}</div>;
}
```

### Protected Routes

```tsx
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";

function ProtectedPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    setLocation("/auth");
    return null;
  }

  return <div>Protected Content</div>;
}
```

## 📊 Logging

Logs are saved in the `/logs` directory:

- `logs/error.log` - Error logs only
- `logs/combined.log` - All logs

View logs in real-time:

```bash
tail -f logs/combined.log
```

## 🔒 Security Features

1. **Password Security**
   - Hashed with bcrypt (10 salt rounds)
   - Never stored or transmitted in plain text

2. **Token Security**
   - Access tokens: 15 minutes (short-lived)
   - Refresh tokens: 7 days (long-lived)
   - Refresh tokens in HttpOnly cookies (XSS protection)
   - Access tokens in memory (not localStorage)

3. **Cookie Security**
   - HttpOnly: prevents JavaScript access
   - SameSite: CSRF protection
   - Secure: HTTPS only in production

4. **Input Validation**
   - Zod schema validation
   - Email format validation
   - Password length requirements

## 🧪 Testing the System

### 1. Register a New User

- Go to `http://localhost:5000/auth`
- Click "Create account" tab
- Fill in username, email, password
- Submit form
- Should redirect to `/dashboard`

### 2. Logout and Login

- Click "Logout" on dashboard
- Should redirect to `/auth`
- Click "Login" tab
- Enter email and password
- Should redirect back to `/dashboard`

### 3. Token Refresh

- Tokens automatically refresh every 10 minutes
- Check browser DevTools > Network tab
- Look for calls to `/api/auth/refresh`

## 🛠️ Customization Guide

### Changing Token Expiry

Edit `server/config/env.ts`:

```typescript
jwt: {
  accessTokenExpiry: '30m',  // Change to 30 minutes
  refreshTokenExpiry: '30d', // Change to 30 days
}
```

### Adding More User Fields

1. Update Prisma schema (`prisma/schema.prisma`):

```prisma
model User {
  // ... existing fields
  phoneNumber String?
  role        String  @default("user")
}
```

2. Run migration:

```bash
npx prisma db push
```

3. Update types in `server/services/authService.ts`

### Custom Error Messages

Edit `server/middleware/errorHandler.ts` to customize error responses.

### Adding Email Verification

1. Add `emailVerified` field to User model
2. Create verification token table
3. Send verification email on registration
4. Create verification endpoint

## ❓ Troubleshooting

### "Can't reach database server"

```bash
# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql

# Check if running
psql -U postgres
```

### "Invalid token"

- Clear browser cookies
- Try logging in again
- Check JWT_ACCESS_SECRET and JWT_REFRESH_SECRET in .env

### "Module not found"

```bash
npm install
```

### TypeScript errors

```bash
npx tsc --noEmit
```

## 📚 Next Steps

1. **Add Email Verification**
2. **Implement Password Reset**
3. **Add OAuth (Google, GitHub)**
4. **Implement 2FA**
5. **Add Rate Limiting**
6. **Setup CORS for production**
7. **Add API documentation (Swagger)**
8. **Implement user roles and permissions**

## 📖 Documentation

For detailed documentation, see [AUTH_README.md](./AUTH_README.md)

## 🎉 You're All Set!

Your authentication system is production-ready with:

- ✅ Secure authentication
- ✅ Clean architecture
- ✅ Comprehensive error handling
- ✅ Professional logging
- ✅ Type safety
- ✅ Easy to maintain and extend

Happy coding! 🚀
