// Common types for the FuelFoods CPG application

// ============================================================================
// WORDPRESS CONTENT TYPES
// ============================================================================

/**
 * WordPress frontmatter structure from the migrated content
 */
export interface WordPressFrontmatter {
  title: string;
  date: string;
  slug: string;
  status: 'publish' | 'draft' | 'private';
  author: string;
  modified: string;
  wp_page_template: string;
  type: 'page' | 'post';
  yoast_wpseo_content_score?: string;
  yoast_wpseo_estimated_reading_time_minutes?: string;
}

/**
 * Parsed WordPress page with content
 */
export interface WordPressPage {
  frontmatter: WordPressFrontmatter;
  content: string;
  rawContent: string;
  filePath: string;
  excerpt?: string;
}

/**
 * WordPress media item from conversion summary
 */
export interface WordPressMedia {
  original_id: string;
  title: string;
  filename: string;
  path: string;
  date: string;
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
  fileSize?: number;
  mimeType?: string;
}

// ============================================================================
// FUELFOODS PRODUCT TYPES
// ============================================================================

/**
 * FuelFoods microgreens product variants
 */
export type MicrogreensVariant =
  | 'mega-mix'
  | 'brassica-blend'
  | 'green-medley'
  | 'sunnies-snacks'
  | 'tummies-pet-grass';

/**
 * Individual microgreen types found in blends
 */
export type MicrogreenType =
  | 'arugula'
  | 'beet'
  | 'broccoli'
  | 'buckwheat'
  | 'daikon'
  | 'kale'
  | 'kohlrabi'
  | 'mizuna'
  | 'mustard'
  | 'pak-choi'
  | 'peas'
  | 'radish'
  | 'red-cabbage'
  | 'sunflowers';

/**
 * Nutritional information for microgreens
 */
export interface NutritionalInfo {
  vitamins: string[];
  minerals: string[];
  antioxidants: string[];
  protein?: string;
  fiber?: string;
  calories?: number;
  servingSize?: string;
}

/**
 * Growing information for microgreens
 */
export interface GrowingInfo {
  growthTime: string; // e.g., "7-14 days"
  difficulty: 'easy' | 'medium' | 'hard';
  lightRequirement: 'low' | 'medium' | 'high';
  wateringFrequency: string;
  harvestTips?: string[];
}

/**
 * FuelFoods specific product interface extending base Product
 */
export interface FuelFoodsProduct extends Omit<Product, 'categories'> {
  variant: MicrogreensVariant;
  microgreenTypes: MicrogreenType[];
  nutritionalInfo: NutritionalInfo;
  growingInfo?: GrowingInfo;
  subscriptionOptions: SubscriptionOption[];
  packageSizes: PackageSize[];
  freshnessDuration: string; // e.g., "7-10 days refrigerated"
  categories: FuelFoodsCategory[];
}

/**
 * Package size options (3-pack, 5-pack, etc.)
 */
export interface PackageSize {
  id: string;
  name: string; // e.g., "3-Pack", "5-Pack"
  quantity: number;
  price: number;
  salePrice?: number;
  weight: number; // in oz
  dimensions: ProductDimensions;
  isPopular?: boolean;
}

/**
 * FuelFoods specific categories
 */
export interface FuelFoodsCategory extends Category {
  type: 'microgreens' | 'pet-products' | 'bundles' | 'accessories';
  nutritionalFocus?: string[]; // e.g., ["high-protein", "vitamin-rich"]
}

// ============================================================================
// SUBSCRIPTION TYPES
// ============================================================================

/**
 * Subscription frequency options
 */
export type SubscriptionFrequency =
  | 'weekly'
  | 'bi-weekly'
  | 'monthly'
  | 'bi-monthly';

/**
 * Subscription tier levels
 */
export type SubscriptionTier =
  | 'starter'
  | 'family'
  | 'enthusiast'
  | 'commercial';

/**
 * Subscription option for products
 */
export interface SubscriptionOption {
  id: string;
  frequency: SubscriptionFrequency;
  tier: SubscriptionTier;
  discount: number; // percentage discount
  minCommitment?: number; // minimum weeks/months
  benefits: string[];
  price: number;
  originalPrice: number;
}

/**
 * Active subscription for a customer
 */
export interface Subscription {
  id: string;
  customerId: string;
  productId: string;
  option: SubscriptionOption;
  status: 'active' | 'paused' | 'cancelled' | 'expired';
  nextDelivery: Date;
  deliveryAddress: Address;
  paymentMethodId: string;
  startDate: Date;
  pausedUntil?: Date;
  cancelledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// MEDIA AND IMAGE TYPES
// ============================================================================

/**
 * Enhanced image interface with optimization data
 */
export interface OptimizedImage extends ProductImage {
  originalPath: string;
  optimizedVersions: ImageVersion[];
  compressionRatio?: number;
  dominantColors?: string[];
  blurDataURL?: string;
  seoOptimized: boolean;
}

/**
 * Different versions of an optimized image
 */
export interface ImageVersion {
  size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original';
  width: number;
  height: number;
  url: string;
  format: 'webp' | 'jpeg' | 'png' | 'avif';
  quality: number;
  fileSize: number;
}

/**
 * Image processing metadata
 */
export interface ImageProcessingMeta {
  processedAt: Date;
  originalSize: number;
  optimizedSize: number;
  compressionRatio: number;
  processingTime: number;
  errors?: string[];
}

// ============================================================================
// SEO AND METADATA TYPES
// ============================================================================

/**
 * Comprehensive SEO metadata for pages and products
 */
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  robots?:
    | 'index,follow'
    | 'noindex,nofollow'
    | 'index,nofollow'
    | 'noindex,follow';
  openGraph: OpenGraphData;
  twitter: TwitterCardData;
  structuredData?: StructuredData;
  readingTime?: number;
  contentScore?: number;
}

/**
 * Open Graph metadata
 */
export interface OpenGraphData {
  title: string;
  description: string;
  type: 'website' | 'product' | 'article';
  url: string;
  image: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  siteName: string;
  locale: string;
}

/**
 * Twitter Card metadata
 */
export interface TwitterCardData {
  card: 'summary' | 'summary_large_image' | 'app' | 'player';
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  creator?: string;
  site?: string;
}

/**
 * Structured data for rich snippets
 */
export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

// ============================================================================
// ENHANCED EXISTING TYPES
// ============================================================================

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  salePrice?: number;
  images: ProductImage[];
  categories: Category[];
  inStock: boolean;
  sku: string;
  weight?: number;
  dimensions?: ProductDimensions;
  attributes: ProductAttribute[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  isPrimary: boolean;
}

export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
  unit: 'in' | 'cm';
}

export interface ProductAttribute {
  name: string;
  value: string;
  visible: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: Address[];
  createdAt: Date;
}

export interface Address {
  id: string;
  type: 'billing' | 'shipping';
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  billingAddress: Address;
  shippingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  total: number;
}

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
  };
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Filter parameters for content queries
 */
export interface ContentFilters {
  status?: string[];
  categories?: string[];
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  search?: string;
}

/**
 * Enhanced page interface with WordPress migration data and SEO
 */
export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: OptimizedImage;
  seo: SEOMetadata;
  status: 'published' | 'draft' | 'private';
  template?: string;
  parentId?: string;
  menuOrder?: number;
  isHomePage?: boolean;
  createdAt: Date;
  updatedAt: Date;
  // WordPress migration fields
  originalId?: string;
  wordPressData?: WordPressFrontmatter;
}

/**
 * Enhanced blog post interface with SEO and WordPress data
 */
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: OptimizedImage;
  author: string;
  categories: Category[];
  tags: string[];
  seo: SEOMetadata;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  // WordPress migration fields
  originalId?: string;
  wordPressData?: WordPressFrontmatter;
  readingTime?: number;
}

// ============================================================================
// CONTENT PARSING TYPES
// ============================================================================

/**
 * Content parsing result
 */
export interface ParsedContent<T = any> {
  frontmatter: T;
  content: string;
  excerpt?: string;
  readingTime?: number;
  wordCount?: number;
  headings?: ContentHeading[];
}

/**
 * Content heading for table of contents
 */
export interface ContentHeading {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  slug: string;
  children?: ContentHeading[];
}

/**
 * Content search index entry
 */
export interface SearchIndexEntry {
  id: string;
  type: 'page' | 'post' | 'product';
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  keywords: string[];
  url: string;
  lastModified: Date;
  searchWeight: number;
}

/**
 * Search result with scoring
 */
export interface SearchResult {
  entry: SearchIndexEntry;
  score: number;
  matches: SearchMatch[];
}

/**
 * Individual search match within content
 */
export interface SearchMatch {
  field: 'title' | 'excerpt' | 'content' | 'keywords';
  text: string;
  startIndex: number;
  endIndex: number;
  context: string;
}
