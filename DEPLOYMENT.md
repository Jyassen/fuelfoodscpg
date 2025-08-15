# FuelFoods CPG - Deployment Guide

This guide covers deploying the FuelFoods Next.js application to various hosting platforms including Vercel and Netlify.

## 🚀 Quick Deploy

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Jyassen/fuelfoodscpg)

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Jyassen/fuelfoodscpg)

## 📋 Prerequisites

- Node.js 18+ installed locally
- Git repository access
- Account on chosen hosting platform (Vercel/Netlify)
- Custom domain (optional but recommended)

## 🛠 Environment Setup

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/Jyassen/fuelfoodscpg.git
cd fuelfoodscpg
npm install
```

### 2. Environment Variables

Copy the environment template and configure for your deployment:

```bash
cp .env.example .env.local
```

**Required Environment Variables for Production:**

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://fuelfoodscpg.com
NEXT_PUBLIC_SITE_NAME="FuelFoods CPG"

# Metadata and SEO
NEXT_PUBLIC_META_TITLE="FuelFoods CPG - Premium Microgreens Delivered Fresh"
NEXT_PUBLIC_META_DESCRIPTION="Premium microgreens and pet grass delivered fresh to your door."
NEXT_PUBLIC_IMAGES_BASE_URL=https://fuelfoodscpg.com

# Build Optimization
NEXT_TELEMETRY_DISABLED=1
```

### 3. Test Local Build

```bash
npm run build
npm run start
```

Visit `http://localhost:3000` to verify the production build works correctly.

## 🌟 Vercel Deployment

### Automatic Deployment (Recommended)

1. **Connect Repository:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Import Project"
   - Connect your GitHub/GitLab account
   - Select the `fuelfoodscpg` repository

2. **Configure Project:**
   - Framework Preset: **Next.js**
   - Root Directory: `./` (leave default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

3. **Environment Variables:**
   - Add all required environment variables from your `.env.local`
   - Set `NEXT_PUBLIC_SITE_URL` to your production domain

4. **Deploy:**
   - Click "Deploy"
   - Your site will be available at `https://your-project.vercel.app`

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name: fuelfoodscpg
# - In which directory is your code located? ./
```

### Custom Domain Setup

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

### Production Environment Variables

Set these in Vercel Dashboard → Project → Settings → Environment Variables:

```
NEXT_PUBLIC_SITE_URL = https://fuelfoodscpg.com
NEXT_PUBLIC_IMAGES_BASE_URL = https://fuelfoodscpg.com
NEXT_TELEMETRY_DISABLED = 1
```

## 🎯 Netlify Deployment

### Automatic Deployment

1. **Connect Repository:**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "New site from Git"
   - Connect to GitHub and select repository

2. **Build Settings:**
   - Branch to deploy: `main`
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Environment Variables:**
   - Go to Site settings → Environment variables
   - Add all required variables

### Manual Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=.next
```

### Netlify Configuration

The project includes `netlify.toml` with optimized settings:

- **Build Command:** `npm run build`
- **Headers:** Security and caching headers
- **Redirects:** SEO-friendly URL redirects
- **Functions:** Ready for serverless functions

### Custom Domain on Netlify

1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS records as instructed
4. Enable HTTPS (automatic via Let's Encrypt)

## 🔧 Build Optimization

### Next.js Configuration

The `next.config.ts` is optimized for static deployment:

```typescript
const nextConfig: NextConfig = {
  output: 'export', // Enable static export
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};
```

### Performance Optimizations

- **Image Optimization:** All images optimized and WebP ready
- **Code Splitting:** Automatic with Next.js
- **Tree Shaking:** Unused code eliminated
- **Compression:** Gzip/Brotli enabled via hosting platform
- **Caching:** Optimized cache headers configured

## 🔒 Security Headers

Both platforms include security headers:

- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

## 📊 Monitoring and Analytics

### Performance Monitoring

- **Vercel:** Built-in analytics and Core Web Vitals
- **Netlify:** Built-in analytics available

### Error Tracking (Optional)

Add error tracking service:

```bash
npm install @sentry/nextjs
```

Configure in `next.config.ts` and add environment variables.

## 🚨 Troubleshooting

### Common Issues

1. **Build Fails:**

   ```bash
   # Check for TypeScript errors
   npm run type-check

   # Check for ESLint errors
   npm run lint
   ```

2. **Images Not Loading:**
   - Verify image paths in `/public/images/`
   - Check `NEXT_PUBLIC_IMAGES_BASE_URL` environment variable

3. **Environment Variables Not Working:**
   - Variables must start with `NEXT_PUBLIC_` for client-side access
   - Restart development server after changes
   - Check deployment platform environment variable settings

### Build Commands Reference

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server (for testing)
npm run start

# Linting
npm run lint
npm run lint:fix

# Type checking
npm run type-check

# Format code
npm run format
```

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run lint
      - run: npm run type-check
```

## 📈 Post-Deployment Checklist

- [ ] Site loads correctly at production URL
- [ ] All pages and navigation work
- [ ] Images load properly
- [ ] Forms function correctly (contact form)
- [ ] Meta tags and social sharing work
- [ ] Site is mobile responsive
- [ ] Core Web Vitals are optimal
- [ ] SSL certificate is active
- [ ] Custom domain redirects properly
- [ ] 404 page displays correctly
- [ ] Search engines can crawl site

## 🆘 Support

- **Vercel:** [Documentation](https://vercel.com/docs)
- **Netlify:** [Documentation](https://docs.netlify.com/)
- **Next.js:** [Documentation](https://nextjs.org/docs)

For project-specific issues, check the main [README.md](./README.md) or open an issue in the repository.

---

**Last Updated:** January 2025
**Node.js Version:** 18+
**Next.js Version:** 15.4.5
