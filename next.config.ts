import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable static export for deployment platforms (commented out to avoid warnings in dev)
  // Note: Uncomment this line for production builds
  // output: 'export',

  // Optimize for static hosting
  trailingSlash: true,

  // Image configuration for static export
  images: {
    unoptimized: process.env.NODE_ENV === 'production',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // TypeScript configuration - allow dev to run with errors
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },

  // ESLint configuration - temporarily allow lint errors during builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Transpile ESM packages that may not be pre-compiled
  transpilePackages: ['@supabase/ssr'],

  // Webpack: use Next.js defaults to avoid mixing client chunks into server runtime
  webpack: (config) => config,

  // Compiler options
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Headers for security (only applied when not using static export)
  ...(!process.env.STATIC_EXPORT && {
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
            // Add CSP that allows Next.js to function properly
            {
              key: 'Content-Security-Policy',
              value:
                process.env.NODE_ENV === 'development'
                  ? "default-src 'self' 'unsafe-eval' 'unsafe-inline'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; media-src 'self' data: blob:; connect-src 'self' https://*.supabase.co https://api.stripe.com ws://localhost:* wss://*.supabase.co;"
                  : "default-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; media-src 'self' data: blob:; connect-src 'self' https://*.supabase.co https://api.stripe.com wss://*.supabase.co; frame-src 'self';",
            },
          ],
        },
      ];
    },
  }),

  // Redirects for SEO (only applied when not using static export)
  ...(!process.env.STATIC_EXPORT && {
    async redirects() {
      return [
        // Catalog PDF friendly routes
        {
          source: '/catalog',
          destination: '/images/FuelFoods%20Catalog%202025%20NEW%20.pdf',
          permanent: true,
        },
        {
          source: '/catalog.pdf',
          destination: '/images/FuelFoods%20Catalog%202025%20NEW%20.pdf',
          permanent: true,
        },
        {
          source: '/FuelFoods-Catalog-2025-NEW.pdf',
          destination: '/images/FuelFoods%20Catalog%202025%20NEW%20.pdf',
          permanent: true,
        },
        {
          source: '/home',
          destination: '/',
          permanent: true,
        },
        {
          source: '/index',
          destination: '/',
          permanent: true,
        },
        // Ensure legacy paths still work
        {
          source: '/about',
          destination: '/about-us',
          permanent: true,
        },
        {
          source: '/contact',
          destination: '/contact-us',
          permanent: true,
        },
        {
          source: '/shop',
          destination: '/configure/starter',
          permanent: true,
        },
      ];
    },
  }),
};

export default nextConfig;
