# FuelFoods CPG - Next.js Website

> Modern e-commerce website for FuelFoods, migrated from WordPress to Next.js with full TypeScript support and modern UI components.

## 🌱 About FuelFoods

FuelFoods is a premium microgreens and health food company delivering fresh, nutrient-dense superfoods directly to customers. Our products include specialized microgreen blends, pet grass, and subscription services focused on health and wellness.

## 🚀 Migration Overview

This project represents a complete migration from WordPress to a modern Next.js application, preserving all content while upgrading to cutting-edge web technologies.

### Migrated Content
- **19 WordPress pages** → Dynamic Next.js routes
- **202+ images** → Optimized Next.js Image components
- **Complete product catalog** → Modern e-commerce functionality
- **E-commerce flow** → Cart, checkout, account management
- **SEO optimization** → Meta tags, structured data, social sharing

## 🛠 Technology Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript for full type safety
- **Styling**: Tailwind CSS v4 with custom theming
- **UI Components**: shadcn/ui component library
- **Images**: Next.js Image optimization
- **Deployment**: Optimized for Vercel/Netlify

## 📁 Project Structure

```
fuelfoodscpg/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (products)/         # Product pages group
│   │   │   ├── mega-mix/
│   │   │   ├── brassica-blend/
│   │   │   ├── green-medley/
│   │   │   └── tummies-pet-grass/
│   │   ├── about-us/
│   │   ├── shop/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── my-account/
│   │   └── contact-us/
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # shadcn/ui components
│   │   └── layout/             # Layout components
│   └── lib/                    # Utilities and types
│       ├── types/              # TypeScript definitions
│       ├── constants.ts        # App configuration
│       ├── content-parser.ts   # Content management
│       ├── product-utils.ts    # Product data handling
│       └── search.ts           # Search functionality
├── public/
│   └── images/                 # 202+ migrated WordPress images
├── vercel.json                 # Deployment configuration
└── .env.example               # Environment variables template
```

## 🏪 Core Features

### Product Catalog
- **Mega Mix** - Premium microgreens blend
- **Brassica Blend** - Cruciferous powerhouse
- **Green Medley** - Mild & sweet blend
- **Tummies Pet Grass** - Fresh cat grass

### E-commerce Functionality
- Product browsing and filtering
- Shopping cart management
- Checkout process
- User account dashboard
- Subscription management

### Advanced Features
- Full-text search across content
- Responsive image optimization
- SEO-optimized pages
- Type-safe development
- Performance monitoring

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jyassen/fuelfoodscpg.git
   cd fuelfoodscpg
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📋 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues automatically
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier

## 🎨 Styling & Design

### Design System
- **Primary Colors**: Fresh greens (#22c55e) for health/nature theme
- **Secondary Colors**: Warm creams (#fef3c7) for organic feel
- **Typography**: Modern, readable fonts optimized for e-commerce
- **Components**: Consistent UI library with shadcn/ui

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interfaces
- Fast loading on all devices

## 🔍 SEO & Performance

### SEO Features
- Meta tags and Open Graph optimization
- Structured data markup
- XML sitemap generation
- Robots.txt configuration
- Image alt text and captions

### Performance Optimizations
- Next.js Image optimization
- Static generation for product pages
- Code splitting and lazy loading
- Optimized bundle sizes
- CDN-ready assets

## 🛒 E-commerce Integration

### Subscription Tiers
- **Starter Pack** - Individual purchases ($15/pack)
- **Family Plan** - 3 packs monthly ($45/month, 10% savings)
- **Enthusiast** - 5 packs monthly ($75/month, 17% savings)
- **Commercial** - Custom bulk orders

### Payment & Shipping
- Stripe integration ready
- Multiple payment methods
- Subscription management
- Delivery tracking
- Customer support integration

## 🌍 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

### Netlify
1. Connect repository in Netlify dashboard
2. Set build command: `npm run build`
3. Set publish directory: `.next`

### Environment Variables
```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=FuelFoods Store

# E-commerce
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 📊 Content Management

### WordPress Migration Details
- **Original Site**: https://fuelfoods.store
- **Migrated Pages**: 19 pages including products, policies, e-commerce
- **Media Assets**: 202+ images, videos, and documents
- **Content Types**: Products, marketing pages, legal pages

### Content Structure
- All content preserved with original metadata
- SEO data migrated from Yoast
- Image galleries and product photos optimized
- Internal links updated to new structure

## 🔧 Development

### Code Quality
- TypeScript strict mode enabled
- ESLint with React and Next.js rules
- Prettier for consistent formatting
- Husky for git hooks
- Path aliases for clean imports

### Testing
- Type checking with TypeScript
- Linting on commit
- Build verification
- Performance monitoring

## 📈 Analytics & Monitoring

### Tracking Setup
- Google Analytics 4 ready
- Facebook Pixel integration
- E-commerce event tracking
- Performance monitoring
- Error reporting

## 🆘 Support & Maintenance

### Common Issues
- Image optimization troubleshooting
- Build error resolution
- Deployment configuration
- Environment setup

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Vercel Deployment](https://vercel.com/docs)

## 📜 License

This project is proprietary to FuelFoods CPG. All rights reserved.

---

## 🎯 Migration Success Metrics

✅ **100% Content Migrated** - All WordPress pages and media  
✅ **Modern Technology Stack** - Next.js 15, TypeScript, Tailwind  
✅ **Performance Optimized** - Fast loading, SEO ready  
✅ **Mobile Responsive** - Works perfectly on all devices  
✅ **E-commerce Ready** - Cart, checkout, subscriptions  
✅ **Developer Friendly** - Type safe, well documented  
✅ **Production Ready** - Deployed and optimized  

**Build Date**: August 2025  
**Migration Status**: Complete ✅  
**Repository**: https://github.com/Jyassen/fuelfoodscpg.git