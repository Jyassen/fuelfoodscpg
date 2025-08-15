import type {
  FuelFoodsProduct,
  PackageSize,
  SubscriptionOption,
  MicrogreensVariant,
  MicrogreenType,
  OptimizedImage,
} from './types';
import {
  MICROGREENS_PRODUCTS,
  MICROGREEN_TYPES,
  SUBSCRIPTION_PLANS,
  PRICING,
} from './constants';
import { getProductImages } from './image-utils';

// ============================================================================
// PRODUCT DATA UTILITIES
// ============================================================================

/**
 * Get all FuelFoods products
 */
export function getAllProducts(): FuelFoodsProduct[] {
  return Object.values(MICROGREENS_PRODUCTS).map(productData =>
    transformToFuelFoodsProduct(productData)
  );
}

/**
 * Get product by slug/ID
 */
export function getProductBySlug(slug: string): FuelFoodsProduct | null {
  const productData = Object.values(MICROGREENS_PRODUCTS).find(
    product => product.slug === slug || product.id === slug
  );

  if (!productData) return null;

  return transformToFuelFoodsProduct(productData);
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: string): FuelFoodsProduct[] {
  const allProducts = getAllProducts();

  return allProducts.filter(product =>
    product.categories.some(
      cat => cat.slug === category || cat.type === category
    )
  );
}

/**
 * Get featured/popular products
 */
export function getFeaturedProducts(): FuelFoodsProduct[] {
  const allProducts = getAllProducts();

  // Prioritize products with popular package sizes or specific variants
  return allProducts
    .filter(
      product =>
        product.packageSizes.some(size => size.isPopular) ||
        ['mega-mix', 'brassica-blend'].includes(product.variant)
    )
    .slice(0, 4);
}

/**
 * Search products by microgreen types
 */
export function getProductsByMicrogreenType(
  types: MicrogreenType[]
): FuelFoodsProduct[] {
  const allProducts = getAllProducts();

  return allProducts.filter(product =>
    types.some(type => product.microgreenTypes.includes(type))
  );
}

// ============================================================================
// PRODUCT TRANSFORMATION UTILITIES
// ============================================================================

/**
 * Transform constants data to FuelFoodsProduct interface
 */
function transformToFuelFoodsProduct(productData: any): FuelFoodsProduct {
  const images = getProductImages(productData.id);
  const primaryImage =
    images.find(img =>
      img.url.includes(productData.images.primary.replace(/\.[^/.]+$/, ''))
    ) || images[0];

  return {
    id: productData.id,
    name: productData.name,
    slug: productData.slug,
    description: productData.description,
    shortDescription: productData.shortDescription,
    variant: productData.id as MicrogreensVariant,
    microgreenTypes: productData.microgreenTypes,

    // Transform package sizes to full product structure
    price: productData.packageSizes[0]?.price || 0,
    salePrice: calculateSubscriptionPrice(
      productData.packageSizes[0]?.price || 0
    ),

    images: images,

    categories: [
      {
        id: 'microgreens',
        name: 'Microgreens',
        slug: 'microgreens',
        type: 'microgreens' as const,
        nutritionalFocus: productData.nutritionalHighlights || [],
      },
    ],

    inStock: true, // Assume in stock
    sku: `FF-${productData.id.toUpperCase()}`,
    weight: parseWeight(productData.packageSizes[0]?.weight),

    packageSizes: productData.packageSizes.map(
      (pkg: any): PackageSize => ({
        id: `${productData.id}-${pkg.size}`,
        name: pkg.size,
        quantity: pkg.quantity,
        price: pkg.price,
        salePrice: calculateSubscriptionPrice(pkg.price),
        weight: parseWeight(pkg.weight),
        dimensions: { length: 8, width: 6, height: 2, unit: 'in' },
        isPopular: pkg.isPopular || false,
      })
    ),

    subscriptionOptions: generateSubscriptionOptions(productData),

    nutritionalInfo: {
      vitamins: extractNutritionalInfo(productData.microgreenTypes, 'vitamins'),
      minerals: extractNutritionalInfo(productData.microgreenTypes, 'minerals'),
      antioxidants: extractNutritionalInfo(
        productData.microgreenTypes,
        'antioxidants'
      ),
      protein: calculateProteinContent(productData.microgreenTypes),
      fiber: '2-4g per serving',
      calories: 15,
      servingSize: '1 oz (28g)',
    },

    growingInfo: {
      growthTime: '7-14 days',
      difficulty: 'easy',
      lightRequirement: 'medium',
      wateringFrequency: 'Daily misting',
      harvestTips: [
        'Harvest when first true leaves appear',
        'Cut just above soil level',
        'Use sharp, clean scissors',
        'Rinse gently before eating',
      ],
    },

    freshnessDuration: '7-10 days refrigerated',

    attributes: [
      { name: 'Organic', value: 'Yes', visible: true },
      { name: 'Locally Grown', value: 'Yes', visible: true },
      { name: 'Harvest to Delivery', value: '24-48 hours', visible: true },
    ],

    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

// ============================================================================
// PRICING AND SUBSCRIPTION UTILITIES
// ============================================================================

/**
 * Calculate subscription price with discount
 */
function calculateSubscriptionPrice(
  basePrice: number,
  discount: number = 15
): number {
  return Math.round(basePrice * (1 - discount / 100) * 100) / 100;
}

/**
 * Generate subscription options for a product
 */
function generateSubscriptionOptions(productData: any): SubscriptionOption[] {
  const basePrice = productData.packageSizes[0]?.price || 0;
  const subscriptionDiscount = productData.subscriptionDiscount || 15;

  return Object.entries(PRICING.SUBSCRIPTION_DISCOUNTS).map(
    ([frequency, discount]) => ({
      id: `${productData.id}-${frequency}`,
      frequency: frequency as SubscriptionOption['frequency'],
      tier: 'family', // Default tier
      discount: Math.max(discount, subscriptionDiscount),
      price: calculateSubscriptionPrice(
        basePrice,
        Math.max(discount, subscriptionDiscount)
      ),
      originalPrice: basePrice,
      benefits: [
        `${Math.max(discount, subscriptionDiscount)}% off regular price`,
        'Free shipping on all orders',
        'Flexible delivery schedule',
        'Cancel anytime',
      ],
    })
  );
}

/**
 * Calculate best subscription deal
 */
export function getBestSubscriptionDeal(
  product: FuelFoodsProduct
): SubscriptionOption | null {
  if (product.subscriptionOptions.length === 0) return null;

  return product.subscriptionOptions.reduce((best, current) =>
    current.discount > best.discount ? current : best
  );
}

/**
 * Calculate total savings with subscription
 */
export function calculateSubscriptionSavings(
  originalPrice: number,
  subscriptionPrice: number,
  frequency: string,
  months: number = 12
): { totalSavings: number; savingsPerOrder: number; ordersPerYear: number } {
  const frequencyMap = {
    weekly: 52,
    'bi-weekly': 26,
    monthly: 12,
    'bi-monthly': 6,
  };

  const ordersPerYear =
    frequencyMap[frequency as keyof typeof frequencyMap] || 12;
  const actualOrders = Math.round((ordersPerYear * months) / 12);
  const savingsPerOrder = originalPrice - subscriptionPrice;
  const totalSavings = savingsPerOrder * actualOrders;

  return {
    totalSavings: Math.round(totalSavings * 100) / 100,
    savingsPerOrder: Math.round(savingsPerOrder * 100) / 100,
    ordersPerYear: actualOrders,
  };
}

// ============================================================================
// NUTRITIONAL INFORMATION UTILITIES
// ============================================================================

/**
 * Extract nutritional information for microgreen types
 */
function extractNutritionalInfo(
  microgreenTypes: MicrogreenType[],
  category: 'vitamins' | 'minerals' | 'antioxidants'
): string[] {
  const nutrients = new Set<string>();

  microgreenTypes.forEach(type => {
    const microgreenData =
      MICROGREEN_TYPES[
        type.toUpperCase().replace('-', '_') as keyof typeof MICROGREEN_TYPES
      ];
    if (microgreenData?.nutrients) {
      microgreenData.nutrients.forEach(nutrient => nutrients.add(nutrient));
    }
  });

  // Categorize nutrients (simplified logic)
  const vitaminKeywords = ['Vitamin', 'Folate', 'Beta'];
  const mineralKeywords = ['Calcium', 'Iron', 'Magnesium', 'Potassium'];
  const antioxidantKeywords = [
    'Sulforaphane',
    'Anthocyanins',
    'Rutin',
    'Betaine',
  ];

  const categoryKeywords = {
    vitamins: vitaminKeywords,
    minerals: mineralKeywords,
    antioxidants: antioxidantKeywords,
  };

  return Array.from(nutrients).filter(nutrient =>
    categoryKeywords[category].some(keyword => nutrient.includes(keyword))
  );
}

/**
 * Calculate protein content based on microgreen types
 */
function calculateProteinContent(microgreenTypes: MicrogreenType[]): string {
  const highProteinTypes = ['peas', 'sunflowers', 'buckwheat'];
  const hasHighProtein = microgreenTypes.some(type =>
    highProteinTypes.includes(type)
  );

  return hasHighProtein ? '3-5g per serving' : '2-3g per serving';
}

// ============================================================================
// PRODUCT COMPARISON UTILITIES
// ============================================================================

/**
 * Compare multiple products
 */
export function compareProducts(productIds: string[]) {
  const products = productIds
    .map(id => getProductBySlug(id))
    .filter(Boolean) as FuelFoodsProduct[];

  return {
    products,
    comparison: {
      priceRange: {
        min: Math.min(...products.map(p => p.price)),
        max: Math.max(...products.map(p => p.price)),
      },
      microgreenTypes: {
        all: Array.from(new Set(products.flatMap(p => p.microgreenTypes))),
        common:
          products[0]?.microgreenTypes.filter(type =>
            products.every(p => p.microgreenTypes.includes(type))
          ) || [],
      },
      nutritionalHighlights: {
        vitamins: Array.from(
          new Set(products.flatMap(p => p.nutritionalInfo.vitamins))
        ),
        minerals: Array.from(
          new Set(products.flatMap(p => p.nutritionalInfo.minerals))
        ),
        antioxidants: Array.from(
          new Set(products.flatMap(p => p.nutritionalInfo.antioxidants))
        ),
      },
      bestFor: products.map(product => ({
        id: product.id,
        name: product.name,
        bestFor: generateBestForRecommendation(product),
      })),
    },
  };
}

/**
 * Generate "best for" recommendation
 */
function generateBestForRecommendation(product: FuelFoodsProduct): string[] {
  const recommendations: string[] = [];

  if (product.variant === 'mega-mix') {
    recommendations.push(
      'First-time buyers',
      'Variety seekers',
      'General nutrition'
    );
  } else if (product.variant === 'brassica-blend') {
    recommendations.push(
      'Cancer prevention',
      'Anti-inflammatory diet',
      'Detox support'
    );
  } else if (product.variant === 'green-medley') {
    recommendations.push(
      'Kids and families',
      'Mild flavor preference',
      'Smoothie ingredients'
    );
  } else if (product.variant === 'sunnies-snacks') {
    recommendations.push('High protein needs', 'Snacking', 'Texture lovers');
  } else if (product.variant === 'tummies-pet-grass') {
    recommendations.push(
      'Cat owners',
      'Pet digestive health',
      'Natural pet treats'
    );
  }

  return recommendations;
}

// ============================================================================
// INVENTORY AND AVAILABILITY UTILITIES
// ============================================================================

/**
 * Check product availability
 */
export function checkProductAvailability(
  productId: string,
  quantity: number = 1
): {
  available: boolean;
  stock: number;
  estimatedRestockDate?: Date;
  alternativeProducts?: FuelFoodsProduct[];
} {
  // Simplified availability check - in real implementation, this would check actual inventory
  const product = getProductBySlug(productId);

  if (!product) {
    return { available: false, stock: 0 };
  }

  // Mock inventory logic
  const mockStock = Math.floor(Math.random() * 100) + 50; // 50-150 units
  const available = mockStock >= quantity;

  let alternativeProducts: FuelFoodsProduct[] = [];
  if (!available) {
    // Suggest similar products
    alternativeProducts = getAllProducts()
      .filter(
        p =>
          p.id !== productId &&
          p.microgreenTypes.some(type => product.microgreenTypes.includes(type))
      )
      .slice(0, 3);
  }

  return {
    available,
    stock: mockStock,
    estimatedRestockDate: available
      ? undefined
      : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    alternativeProducts:
      alternativeProducts.length > 0 ? alternativeProducts : undefined,
  };
}

// ============================================================================
// UTILITY HELPER FUNCTIONS
// ============================================================================

/**
 * Parse weight string to number (in oz)
 */
function parseWeight(weightStr: string): number {
  if (!weightStr) return 0;

  const match = weightStr.match(/(\d+(?:\.\d+)?)\s*(oz|lb|g|kg)?/i);
  if (!match) return 0;

  const value = parseFloat(match[1]);
  const unit = (match[2] || 'oz').toLowerCase();

  // Convert to oz
  switch (unit) {
    case 'lb':
      return value * 16;
    case 'g':
      return value * 0.035274;
    case 'kg':
      return value * 35.274;
    default:
      return value; // assume oz
  }
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

/**
 * Calculate price per oz
 */
export function calculatePricePerOz(price: number, weight: number): string {
  if (weight === 0) return 'N/A';
  const pricePerOz = price / weight;
  return formatPrice(pricePerOz) + '/oz';
}

/**
 * Generate product URL
 */
export function getProductUrl(product: FuelFoodsProduct): string {
  return `/products/${product.slug}`;
}

/**
 * Generate product schema markup for SEO
 */
export function generateProductSchema(product: FuelFoodsProduct) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map(img => img.url),
    brand: {
      '@type': 'Brand',
      name: 'FuelFoods CPG',
    },
    category: 'Microgreens',
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'FuelFoods CPG',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
    },
    nutrition: {
      '@type': 'NutritionInformation',
      calories: product.nutritionalInfo.calories?.toString(),
      proteinContent: product.nutritionalInfo.protein,
      fiberContent: product.nutritionalInfo.fiber,
      servingSize: product.nutritionalInfo.servingSize,
    },
  };
}
