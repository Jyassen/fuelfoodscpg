# FuelFoods CPG Website

A modern Next.js 15+ website for FuelFoods CPG, featuring premium microgreens and pet grass products. This project serves as the foundation for migrating from WordPress to a modern, performant web application.

## Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Development**: ESLint, Prettier
- **Build Tool**: Turbopack (for development)

## Project Structure

```
src/
├── app/                    # App Router pages
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── page.tsx           # Homepage
│   ├── about-us/          # About page
│   ├── shop/              # Shop page
│   ├── contact-us/        # Contact page
│   └── ...                # Additional pages
├── components/            # Reusable components
│   ├── layout/           # Layout components (Header, Footer)
│   └── ui/               # UI components
├── lib/                  # Utilities and configurations
│   ├── constants.ts      # App constants
│   ├── utils.ts          # Utility functions
│   └── types/            # TypeScript type definitions
└── styles/               # Additional styles
```

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Jyassen/fuelfoodscpg.git
cd fuelfoodscpg
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Features

- ✅ Next.js 15+ with App Router
- ✅ TypeScript configuration
- ✅ Tailwind CSS v4 with custom theming
- ✅ ESLint + Prettier configuration
- ✅ Responsive design
- ✅ SEO optimization
- ✅ Component-based architecture
- ✅ TypeScript type definitions

## WordPress Migration

This project is part of a WordPress to Next.js migration. The original WordPress content has been extracted and is available in the `/content` directory of the parent migration folder.

### Migration Status

- [x] Project setup and configuration
- [x] Basic page structure (Home, About, Shop, Contact)
- [x] Header and Footer components
- [x] SEO configuration
- [ ] Product pages and catalog
- [ ] WordPress content integration
- [ ] Image optimization and migration
- [ ] E-commerce functionality
- [ ] Contact form functionality

## Deployment

The project is configured for deployment to various platforms:

- **Vercel**: Optimized for Next.js with zero configuration
- **Netlify**: Full support for App Router
- **Docker**: Containerized deployment ready

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is proprietary to FuelFoods CPG.
