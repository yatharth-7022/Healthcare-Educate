# Authentication System Documentation

This document describes the authentication system implemented in the Healthcare-Educate platform.

## Architecture

The authentication system follows a **Service-Controller pattern** with clean separation of concerns:

```
server/
├── config/           # Configuration files
│   └── env.ts       # Environment and JWT configuration
├── controllers/     # Request handlers
│   └── authController.ts
├── services/        # Business logic
│   └── authService.ts
├── middleware/      # Express middleware
│   ├── authMiddleware.ts
│   └── errorHandler.ts
├── utils/           # Utility functions
│   ├── jwt.ts       # JWT token utilities
│   ├── logger.ts    # Winston logger
│   └── AppError.ts  # Custom error classes
└── routes/          # Route definitions
    └── authRoutes.ts
```

## Features

### Backend (Express.js + PostgreSQL)

1. **User Authentication**
   - Registration with email, username, and password
   - Login with email and password
   - Password hashing using bcryptjs
   - Input validation using Zod

2. **Token Management**
   - **Access Tokens**: Short-lived (15 minutes), sent in response body
   - **Refresh Tokens**: Long-lived (7 days), stored in HttpOnly cookies
   - Automatic token refresh mechanism
   - Token stored in database for validation

3. **Security**
   - Passwords hashed with bcrypt (salt rounds: 10)
   - HttpOnly cookies for refresh tokens (prevents XSS attacks)
   - Access tokens stored in memory on frontend (not localStorage)
   - CSRF protection via SameSite cookies
   - Secure cookies in production

4. **Logging**
   - Winston logger for all authentication events
   - Separate error and combined logs
   - Development-friendly console output
   - Log files in `/logs` directory

5. **Error Handling**
   - Global error handling middleware
   - Custom error classes (BadRequestError, UnauthorizedError, etc.)
   - Detailed error messages in development
   - Generic messages in production

## API Endpoints

### POST /api/auth/register

Register a new user.

**Request Body:**

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "username": "johndoe",
      "email": "john@example.com",
      "isAdmin": false
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### POST /api/auth/login

Login an existing user.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** Same as register

### POST /api/auth/refresh

Refresh the access token using the refresh token cookie.

**Response:**

```json
{
  "status": "success",
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### POST /api/auth/logout

Logout the current user (requires authentication).

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  "status": "success",
  "message": "Logout successful"
}
```

### GET /api/auth/me

Get current user profile (requires authentication).

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": 1,
      "username": "johndoe",
      "email": "john@example.com",
      "isAdmin": false,
      "createdAt": "2025-01-26T..."
    }
  }
}
```

## Frontend Integration

### Authentication Hook

The `useAuth` hook provides authentication functionality:

```tsx
import { useAuth } from "@/hooks/use-auth";

function MyComponent() {
  const {
    user, // Current user object
    isAuthenticated, // Boolean
    login, // Login function
    register, // Register function
    logout, // Logout function
    isLoading, // Loading state
    isLoggingIn, // Login loading state
    isRegistering, // Register loading state
  } = useAuth();

  // Use the hook...
}
```

### API Client

The API client (`client/src/lib/api.ts`) provides typed functions for all auth operations:

```typescript
import {
  login,
  register,
  logout,
  getCurrentUser,
  refreshToken,
} from "@/lib/api";

// Login
const response = await login({
  email: "user@example.com",
  password: "password",
});

// Register
const response = await register({
  username: "johndoe",
  email: "user@example.com",
  password: "password",
});
```

### Token Management

- Access tokens are stored in memory (not localStorage for security)
- Refresh tokens are stored in HttpOnly cookies (handled automatically)
- Tokens are automatically refreshed every 10 minutes
- Failed refresh attempts clear the user session

## Database Schema

```prisma
model User {
  id           Int      @id @default(autoincrement())
  username     String   @unique
  email        String   @unique
  password     String
  refreshToken String?
  isAdmin      Boolean  @default(false)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

## Environment Variables

Add these to your `.env` file:

```env
# JWT Configuration
JWT_ACCESS_SECRET=your-access-token-secret-change-in-production
JWT_REFRESH_SECRET=your-refresh-token-secret-change-in-production

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/database

# Node Environment
NODE_ENV=development
PORT=5000
```

## Security Considerations

1. **Never expose secrets**: Keep JWT secrets in environment variables
2. **HTTPS in production**: Always use HTTPS to protect tokens in transit
3. **Short-lived access tokens**: 15-minute expiry limits exposure
4. **HttpOnly cookies**: Prevents XSS attacks on refresh tokens
5. **Password hashing**: bcrypt with 10 salt rounds
6. **Token rotation**: New refresh token issued on each refresh
7. **Database validation**: Refresh tokens validated against database

## Running the Application

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Setup database:**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:5000
   - Auth page: http://localhost:5000/auth
   - Dashboard: http://localhost:5000/dashboard (requires authentication)

## Troubleshooting

### Database Connection Issues

If you see "Can't reach database server", ensure PostgreSQL is running:

```bash
# Start PostgreSQL (macOS)
brew services start postgresql

# Check status
brew services list
```

### Token Issues

- Clear cookies if experiencing authentication issues
- Check browser DevTools > Application > Cookies
- Verify JWT secrets in .env file

### Logging

- Check `logs/error.log` for error details
- Check `logs/combined.log` for all logs
- Console shows detailed logs in development mode

## Future Enhancements

- Email verification
- Password reset functionality
- OAuth integration (Google, GitHub, etc.)
- Two-factor authentication (2FA)
- Role-based access control (RBAC)
- Session management
- Rate limiting
