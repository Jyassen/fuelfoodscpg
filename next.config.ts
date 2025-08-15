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

  // ESLint configuration - allow dev to run with lint errors
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },

  // Experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Webpack optimization
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
    }

    return config;
  },

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
            // Add CSP that allows Next.js development
            {
              key: 'Content-Security-Policy',
              value: process.env.NODE_ENV === 'development' 
                ? "default-src 'self' 'unsafe-eval' 'unsafe-inline'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:;"
                : "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self';"
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
      ];
    },
  }),
};

export default nextConfig;
