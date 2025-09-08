# FuelFoods CPG Authentication System - Installation Guide

## Overview

This guide will help you install and configure the comprehensive authentication system for FuelFoods CPG, including NextAuth.js, Prisma, and Stripe integration.

## Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database (or SQLite for development)
- Stripe account with API keys
- Email service provider (SendGrid, Resend, etc.) - optional

## Installation Steps

### 1. Install Required Dependencies

```bash
# Authentication and session management
npm install next-auth @auth/prisma-adapter

# Database ORM and client
npm install prisma @prisma/client

# Password hashing and validation
npm install bcryptjs zod
npm install -D @types/bcryptjs

# Additional utilities (if not already installed)
npm install jose # JWT handling (included with NextAuth.js)
```

### 2. Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/fuelfoodscpg"
# For development with SQLite:
# DATABASE_URL="file:./dev.db"

# NextAuth.js Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-here"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
FACEBOOK_CLIENT_ID="your-facebook-app-id"
FACEBOOK_CLIENT_SECRET="your-facebook-app-secret"

# Email Service (Optional)
EMAIL_SERVER="smtp://username:password@smtp.sendgrid.net:587"
EMAIL_FROM="noreply@fuelfoodscpg.com"

# Stripe (Existing)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Stripe Price IDs (Existing)
STRIPE_PRICE_STARTER="price_..."
STRIPE_PRICE_PRO="price_..."
STRIPE_PRICE_ELITE="price_..."
```

### 3. Database Setup

Initialize and configure Prisma:

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Optional: Open Prisma Studio to view data
npx prisma studio
```

### 4. Stripe Configuration

#### Update Stripe Webhook Endpoints

In your Stripe Dashboard, configure webhooks to include these events:
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `customer.updated`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

Webhook URL: `https://yourdomain.com/api/stripe/webhook`

#### Create Subscription Products (if not already done)

```javascript
// Example Stripe product creation (run once)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create products and prices
const products = [
  {
    name: 'Starter Plan',
    description: 'Individual microgreens packs',
  },
  {
    name: 'Pro Plan',
    description: 'Weekly 3-pack subscription',
  },
  {
    name: 'Elite Plan',
    description: 'Weekly 5-pack subscription',
  }
];

// Create recurring prices for each product
```

### 5. OAuth Provider Setup (Optional)

#### Google OAuth Setup:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

#### Facebook OAuth Setup:
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Configure OAuth redirect URIs

### 6. Email Service Setup (Optional)

Choose an email service provider:

#### SendGrid:
```bash
npm install @sendgrid/mail
```

#### Resend:
```bash
npm install resend
```

### 7. Build and Deploy

```bash
# Build the application
npm run build

# Start production server
npm start

# Or for development
npm run dev
```

## Configuration Files

### 1. TypeScript Configuration

Ensure your `tsconfig.json` includes the new paths:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 2. Next.js Configuration

Add to your `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  // Ensure images from external sources work
  images: {
    domains: ['lh3.googleusercontent.com', 'platform-lookaside.fbsbx.com'],
  },
};

module.exports = nextConfig;
```

### 3. Middleware Configuration

The middleware is already configured to protect routes. Customize the protected routes in `src/middleware.ts`:

```typescript
const protectedRoutes = [
  '/my-account',
  '/checkout',
  '/api/user',
];
```

## Security Considerations

### 1. Environment Variables

- Never commit `.env.local` to version control
- Use different secrets for development and production
- Rotate secrets regularly

### 2. Database Security

- Use connection pooling in production
- Enable SSL for database connections
- Regular database backups

### 3. Session Security

- Use secure cookies in production (HTTPS only)
- Set appropriate session expiration times
- Implement proper CSRF protection

## Testing

### 1. Authentication Flow Testing

Test the complete authentication flow:

```bash
# Run tests (when implemented)
npm test

# Or test manually:
# 1. Register new account
# 2. Verify email (if enabled)
# 3. Login with credentials
# 4. Test OAuth login
# 5. Test password reset
# 6. Test account dashboard
# 7. Test subscription management
```

### 2. Stripe Integration Testing

Use Stripe's test mode and webhook testing:

```bash
# Install Stripe CLI
stripe login

# Forward webhooks to local development
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Test checkout flow with test cards
```

## Common Issues and Solutions

### 1. Database Connection Issues

```bash
# Check connection
npx prisma db pull

# Reset database
npx prisma migrate reset

# Generate client after schema changes
npx prisma generate
```

### 2. NextAuth.js Session Issues

- Clear browser cookies
- Check `NEXTAUTH_URL` matches your domain
- Verify `NEXTAUTH_SECRET` is set

### 3. Stripe Webhook Issues

- Verify webhook secret matches
- Check webhook endpoint is accessible
- Review webhook event logs in Stripe dashboard

### 4. OAuth Issues

- Verify redirect URIs match exactly
- Check OAuth app is approved/live
- Ensure correct client ID/secret

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Stripe webhooks configured
- [ ] OAuth providers configured
- [ ] Email service configured
- [ ] SSL/TLS certificates installed
- [ ] Security headers configured
- [ ] Error monitoring setup
- [ ] Backup strategy implemented

## Monitoring and Maintenance

### 1. Log Monitoring

Monitor authentication events:
- Failed login attempts
- New user registrations
- Password reset requests
- OAuth authentication failures

### 2. Database Monitoring

- Connection pool status
- Query performance
- Storage usage
- Backup verification

### 3. Stripe Monitoring

- Webhook delivery status
- Failed payment events
- Subscription lifecycle events
- Customer creation/updates

## Support

For issues with this authentication system:

1. Check the console for error messages
2. Review the authentication architecture document
3. Verify environment variables are correctly set
4. Test with Stripe's test mode first
5. Check database connectivity and migrations

## Next Steps

After installation:

1. Customize the dashboard components
2. Implement additional user profile fields
3. Add email notification templates
4. Implement advanced subscription management
5. Add admin dashboard functionality
6. Set up monitoring and analytics