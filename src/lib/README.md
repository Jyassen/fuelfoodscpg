# FuelFoods CPG Library Documentation

This library provides comprehensive TypeScript types and utilities for the FuelFoods CPG website migration from WordPress to Next.js.

## 📁 File Structure

```
src/lib/
├── types/
│   └── index.ts           # All TypeScript interfaces and types
├── constants.ts           # Product data, pricing, and site configuration
├── content-parser.ts      # WordPress content parsing utilities
├── image-utils.ts         # Image optimization and processing
├── search.ts             # Content search and indexing
├── product-utils.ts      # Product data management utilities
├── utils.ts              # Base utility functions
├── index.ts              # Main export file
└── README.md             # This documentation
```

## 🎯 Core Features

### 1. WordPress Content Migration

- **Frontmatter Parsing**: Extract metadata from WordPress markdown files
- **Content Processing**: Convert markdown to HTML with SEO optimization
- **Image Management**: Handle 200+ WordPress images with optimization
- **Search Indexing**: Full-text search across all content

### 2. FuelFoods Product System

- **5 Product Variants**: Mega Mix, Brassica Blend, Green Medley, Sunnies Snacks, Pet Grass
- **14 Microgreen Types**: Individual microgreen nutrition and growing data
- **Subscription Plans**: 4 tiers with automatic pricing calculations
- **Package Sizes**: Multiple size options per product

### 3. Advanced Features

- **SEO Optimization**: Structured data, Open Graph, Twitter Cards
- **Image Processing**: Responsive images with WebP/AVIF support
- **Search Engine**: Fuzzy search with scoring and suggestions
- **Type Safety**: Comprehensive TypeScript coverage

## 🚀 Quick Start

### Basic Usage

```typescript
import {
  getAllProducts,
  searchContent,
  parseWordPressPage,
  initializeFuelFoodsApp,
} from '@/lib';

// Initialize the library
initializeFuelFoodsApp();

// Get all products
const products = getAllProducts();

// Search content
const results = searchContent('microgreens');

// Parse WordPress content
const page = parseWordPressPage('/path/to/page.md');
```

### Product Management

```typescript
import {
  getProductBySlug,
  getFeaturedProducts,
  calculateSubscriptionSavings,
  compareProducts,
} from '@/lib';

// Get specific product
const megaMix = getProductBySlug('mega-mix');

// Get featured products for homepage
const featured = getFeaturedProducts();

// Calculate subscription savings
const savings = calculateSubscriptionSavings(24.99, 21.24, 'weekly', 12);

// Compare multiple products
const comparison = compareProducts(['mega-mix', 'brassica-blend']);
```

### Content and Search

```typescript
import {
  getAllWordPressPages,
  searchByCategory,
  getSearchSuggestions,
  buildContentSearchIndex,
} from '@/lib';

// Get all WordPress pages
const pages = getAllWordPressPages();

// Search by category
const microgreenContent = searchByCategory('microgreens', 'nutrition');

// Get search suggestions
const suggestions = getSearchSuggestions('micro');

// Build search index
const searchIndex = buildContentSearchIndex();
```

### Image Processing

```typescript
import {
  getAllContentImages,
  getProductImages,
  generateSrcSet,
  analyzeContentImages,
} from '@/lib';

// Get all images
const images = getAllContentImages();

// Get product-specific images
const megaMixImages = getProductImages('mega-mix');

// Generate responsive image srcSet
const srcSet = generateSrcSet(megaMixImages[0]);

// Analyze image usage
const analysis = analyzeContentImages();
```

## 📊 Data Structure

### Product Variants

| Variant            | Description               | Microgreens | Price Range     |
| ------------------ | ------------------------- | ----------- | --------------- |
| **Mega Mix**       | Signature blend           | 6 types     | $24.99 - $39.99 |
| **Brassica Blend** | Cancer-fighting compounds | 6 types     | $26.99 - $42.99 |
| **Green Medley**   | Mild, kid-friendly        | 4 types     | $22.99 - $36.99 |
| **Sunnies Snacks** | Pure sunflower greens     | 1 type      | $19.99 - $31.99 |
| **Pet Grass**      | Live cat grass            | 1 type      | $18.99 - $29.99 |

### Subscription Plans

| Plan           | Discount | Min Products | Features               |
| -------------- | -------- | ------------ | ---------------------- |
| **Starter**    | 10%      | 1-2          | Basic delivery         |
| **Family**     | 15%      | 2-4          | Free shipping, popular |
| **Enthusiast** | 20%      | 4-8          | Early access           |
| **Commercial** | 25%      | 10+          | Dedicated support      |

### Microgreen Nutrition

Each microgreen type includes:

- **Nutritional Profile**: Vitamins, minerals, antioxidants
- **Flavor Profile**: Taste description and intensity
- **Growing Info**: Time, difficulty, care instructions
- **Visual Data**: Color, texture, appearance

## 🛠️ API Reference

### Core Functions

#### `initializeFuelFoodsApp()`

Initializes all library systems including search indexing.

```typescript
const result = initializeFuelFoodsApp();
// Returns: { success: boolean, message: string }
```

#### `getSiteData()`

Comprehensive site data for layouts and homepage.

```typescript
const siteData = getSiteData();
// Returns: { config, navigation, products, images, content, testimonials }
```

#### `getProductCatalogData(options)`

Product catalog with filtering and search.

```typescript
const catalog = getProductCatalogData({
  category: 'microgreens',
  search: 'vitamin c',
  featured: true,
});
```

### Product Functions

#### `getAllProducts(): FuelFoodsProduct[]`

Returns all products with full data.

#### `getProductBySlug(slug: string): FuelFoodsProduct | null`

Get specific product by slug or ID.

#### `getFeaturedProducts(): FuelFoodsProduct[]`

Get featured/popular products (max 4).

#### `compareProducts(productIds: string[])`

Compare multiple products side by side.

#### `calculateSubscriptionSavings(originalPrice, subscriptionPrice, frequency, months)`

Calculate total savings with subscription.

### Content Functions

#### `parseWordPressPage(filePath: string): WordPressPage`

Parse WordPress markdown file with frontmatter.

#### `getAllWordPressPages(): WordPressPage[]`

Get all WordPress pages sorted by date.

#### `markdownToHtml(markdown: string): Promise<string>`

Convert markdown content to HTML.

#### `generateExcerpt(content: string, maxLength?: number): string`

Generate excerpt from content.

### Search Functions

#### `searchContent(query: string, options?): SearchResult[]`

Full-text search across all content.

#### `searchProducts(query: string): SearchResult[]`

Product-specific search.

#### `getSearchSuggestions(partialQuery: string, limit?: number): string[]`

Get search suggestions for autocomplete.

#### `searchByNutrition(nutrients: string[]): SearchResult[]`

Search products by nutritional content.

### Image Functions

#### `getAllContentImages(): WordPressMedia[]`

Get all images from WordPress migration.

#### `getProductImages(variantName: string): OptimizedImage[]`

Get images for specific product variant.

#### `generateSrcSet(optimizedImage: OptimizedImage): string`

Generate responsive image srcSet attribute.

#### `analyzeContentImages()`

Analyze image usage and optimization opportunities.

## 🔧 Configuration

### Constants Customization

Update `/src/lib/constants.ts` to modify:

- **Product Data**: Prices, descriptions, nutritional info
- **Subscription Plans**: Tiers, discounts, benefits
- **Site Configuration**: Navigation, footer, SEO defaults
- **Business Information**: Contact details, hours, social media

### Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://fuelfoodscpg.com
```

### Image Optimization

Configure image processing in `IMAGE_CONFIG`:

```typescript
export const IMAGE_CONFIG = {
  sizes: {
    thumbnail: { width: 150, height: 150 },
    small: { width: 300, height: 300 },
    medium: { width: 600, height: 600 },
    large: { width: 1200, height: 1200 },
  },
  quality: {
    webp: 85,
    jpeg: 85,
    png: 95,
  },
};
```

## 📈 Performance Features

### Search Optimization

- **Indexed Search**: Pre-built search index for fast queries
- **Fuzzy Matching**: Tolerant of typos and partial matches
- **Weighted Results**: Relevance scoring with boosting
- **Cached Suggestions**: Fast autocomplete responses

### Image Optimization

- **Multiple Formats**: WebP, AVIF, JPEG fallbacks
- **Responsive Sizing**: 5 different sizes per image
- **Lazy Loading**: Blur placeholders and lazy loading
- **Compression Analysis**: Track optimization opportunities

### Content Processing

- **Markdown Caching**: Processed content caching
- **Reading Time**: Automatic calculation
- **SEO Extraction**: Automated meta tag generation
- **Heading Hierarchy**: Table of contents generation

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: Ensure all dependencies are installed
2. **Content Not Loading**: Check WordPress content paths
3. **Images Not Found**: Verify image file paths and permissions
4. **Search Not Working**: Run `initializeSearchIndex()`

### Debug Functions

```typescript
import { getUtilityStatus, getContentStatistics } from '@/lib';

// Check system status
const status = getUtilityStatus();
console.log('System Status:', status);

// Content statistics
const stats = getContentStatistics();
console.log('Content Stats:', stats);
```

## 📝 Contributing

### Adding New Products

1. Update `MICROGREENS_PRODUCTS` in `constants.ts`
2. Add product images to `/content/images/`
3. Update product types if needed
4. Rebuild search index

### Adding New Microgreen Types

1. Add to `MICROGREEN_TYPES` in `constants.ts`
2. Include nutritional and growing information
3. Add corresponding images
4. Update product variants that include the new type

### Extending Search

1. Modify `SEARCH_CONFIG` for different weights
2. Add new search categories in `searchByCategory`
3. Extend keyword extraction logic
4. Add new boost factors for relevance

## 🎯 Migration Checklist

- [x] WordPress content parsing (19 pages)
- [x] Image asset management (202 images)
- [x] Product data structure (5 variants, 14 types)
- [x] Subscription system (4 plans)
- [x] Search functionality
- [x] SEO optimization
- [x] TypeScript type safety
- [x] Performance optimization
- [x] Documentation

## 📚 Additional Resources

- [WordPress Migration Guide](../../../README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Built for FuelFoods CPG** - Premium microgreens delivered fresh to your door. 🌱
