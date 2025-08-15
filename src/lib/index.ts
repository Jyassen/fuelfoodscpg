// Main exports for FuelFoods CPG utilities and types
// This file provides a convenient single import point for all lib functionality

// ============================================================================
// TYPE EXPORTS
// ============================================================================

// WordPress and content types
export type {
  WordPressFrontmatter,
  WordPressPage,
  WordPressMedia,
  ParsedContent,
  ContentHeading,
  SearchIndexEntry,
  SearchResult,
  SearchMatch,
} from './types';

// FuelFoods product types
export type {
  FuelFoodsProduct,
  MicrogreensVariant,
  MicrogreenType,
  NutritionalInfo,
  GrowingInfo,
  PackageSize,
  FuelFoodsCategory,
} from './types';

// Subscription and pricing types
export type {
  SubscriptionOption,
  SubscriptionFrequency,
  SubscriptionTier,
  Subscription,
} from './types';

// Image and media types
export type {
  OptimizedImage,
  ImageVersion,
  ImageProcessingMeta,
} from './types';

// SEO and metadata types
export type {
  SEOMetadata,
  OpenGraphData,
  TwitterCardData,
  StructuredData,
} from './types';

// Base types (existing)
export type {
  Product,
  ProductImage,
  ProductDimensions,
  ProductAttribute,
  Category,
  CartItem,
  Customer,
  Address,
  Order,
  OrderItem,
  OrderStatus,
  Page,
  BlogPost,
  ApiResponse,
  PaginationParams,
  ContentFilters,
} from './types';

// ============================================================================
// UTILITY FUNCTION EXPORTS
// ============================================================================

// Content parsing utilities
export {
  CONTENT_PATHS,
  parseMarkdownFile,
  parseWordPressPage,
  getAllWordPressPages,
  getWordPressPageBySlug,
  markdownToHtml,
  extractHeadings,
  generateExcerpt,
  calculateReadingTime,
  createSearchIndexEntry,
  buildContentSearchIndex,
  getContentStatistics,
} from './content-parser';

// Image utilities
export {
  IMAGE_CONFIG,
  extractImageMetadata,
  getAllContentImages,
  createOptimizedImageMetadata,
  getProductImages,
  getHeroImages,
  getImagesByCategory,
  validateImage,
  generateSrcSet,
  generateSizesAttribute,
  analyzeContentImages,
} from './image-utils';

// Search utilities
export {
  SEARCH_CONFIG,
  initializeSearchIndex,
  getSearchIndex,
  addToSearchIndex,
  removeFromSearchIndex,
  searchContent,
  searchProducts,
  searchPages,
  getSearchSuggestions,
  searchByNutrition,
  searchByCategory,
  getPopularSearchTerms,
  getSearchAnalytics,
} from './search';

// Product utilities
export {
  getAllProducts,
  getProductBySlug,
  getProductsByCategory,
  getFeaturedProducts,
  getProductsByMicrogreenType,
  getBestSubscriptionDeal,
  calculateSubscriptionSavings,
  compareProducts,
  checkProductAvailability,
  formatPrice,
  calculatePricePerOz,
  getProductUrl,
  generateProductSchema,
} from './product-utils';

// Base utilities (existing)
export { cn, formatCurrency, formatDate, slugify } from './utils';

// ============================================================================
// CONSTANT EXPORTS
// ============================================================================

// Site configuration
export {
  SITE_CONFIG,
  NAVIGATION_ITEMS,
  FOOTER_LINKS,
  SEO_DEFAULTS,
  BUSINESS_INFO,
} from './constants';

// Product data
export {
  MICROGREENS_PRODUCTS,
  PRODUCT_CATEGORIES,
  MICROGREEN_TYPES,
  SUBSCRIPTION_PLANS,
  PRICING,
  IMAGE_PATHS,
  HERO_IMAGES,
  DELIVERY_INFO,
  NUTRITION_FACTS,
  TESTIMONIALS,
  GROWING_INSTRUCTIONS,
} from './constants';

// Application constants
export {
  ORDER_STATUSES,
  CURRENCY,
  DEFAULT_PAGINATION_LIMIT,
} from './constants';

// ============================================================================
// CONVENIENCE FUNCTIONS
// ============================================================================

/**
 * Initialize all FuelFoods utilities
 * Call this function when the app starts to prepare all systems
 */
export function initializeFuelFoodsApp() {
  try {
    // Initialize search index
    const { initializeSearchIndex } = require('./search');
    initializeSearchIndex();

    console.log('✅ FuelFoods CPG utilities initialized successfully');

    return {
      success: true,
      message: 'All systems ready',
    };
  } catch (error) {
    console.error('❌ Failed to initialize FuelFoods utilities:', error);

    return {
      success: false,
      message: 'Initialization failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get comprehensive site data for homepage/layout
 */
export function getSiteData() {
  const { getAllProducts, getFeaturedProducts } = require('./product-utils');
  const { getHeroImages } = require('./image-utils');
  const { getContentStatistics } = require('./content-parser');
  const {
    SITE_CONFIG,
    NAVIGATION_ITEMS,
    TESTIMONIALS,
  } = require('./constants');

  return {
    config: SITE_CONFIG,
    navigation: NAVIGATION_ITEMS,
    products: {
      all: getAllProducts(),
      featured: getFeaturedProducts(),
      total: getAllProducts().length,
    },
    images: {
      hero: getHeroImages(),
    },
    content: getContentStatistics(),
    testimonials: TESTIMONIALS,
  };
}

/**
 * Get product catalog data with filtering and search
 */
export function getProductCatalogData(
  options: {
    category?: string;
    search?: string;
    featured?: boolean;
  } = {}
) {
  const {
    getAllProducts,
    getProductsByCategory,
    getFeaturedProducts,
  } = require('./product-utils');
  const { searchProducts } = require('./search');

  let products = getAllProducts();

  if (options.category) {
    products = getProductsByCategory(options.category);
  }

  if (options.search) {
    const searchResults = searchProducts(options.search);
    products = searchResults
      .map((result: any) => result.entry)
      .filter(Boolean) as any[];
  }

  if (options.featured) {
    products = getFeaturedProducts();
  }

  const { PRODUCT_CATEGORIES, SUBSCRIPTION_PLANS } = require('./constants');

  return {
    products,
    categories: Object.values(PRODUCT_CATEGORIES),
    subscriptionPlans: SUBSCRIPTION_PLANS,
    total: products.length,
  };
}

/**
 * Development helper: Get all available utilities and their status
 */
export function getUtilityStatus() {
  const { getSearchAnalytics } = require('./search');
  const { analyzeContentImages } = require('./image-utils');
  const { getContentStatistics } = require('./content-parser');
  const { getAllProducts } = require('./product-utils');
  const { MICROGREENS_PRODUCTS, MICROGREEN_TYPES } = require('./constants');

  return {
    timestamp: new Date().toISOString(),
    utilities: {
      contentParser: {
        status: 'active',
        ...getContentStatistics(),
      },
      imageUtils: {
        status: 'active',
        ...analyzeContentImages(),
      },
      search: {
        status: 'active',
        ...getSearchAnalytics(),
      },
      products: {
        status: 'active',
        totalProducts: getAllProducts().length,
        variants: Object.keys(MICROGREENS_PRODUCTS).length,
        microgreenTypes: Object.keys(MICROGREEN_TYPES).length,
      },
    },
    health: 'All systems operational',
  };
}
