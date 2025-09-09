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
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
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
// CHECKOUT FLOW TYPES
// ============================================================================

/**
 * Microgreen variety configurations with themes
 */
export interface MicrogreensVariety {
  id: 'mega-mix' | 'brassica-blend' | 'sunnies-snacks';
  name: string;
  theme: 'orange' | 'purple' | 'yellow' | 'green';
  description: string;
  image: string;
  price: number;
  nutritionalHighlights: string[];
}

/**
 * Subscription plan types
 */
export type PlanType = 'starter' | 'pro' | 'elite';

/**
 * Plan configuration for Pro and Elite subscriptions
 */
export interface PlanConfiguration {
  planType: PlanType;
  totalPacks: number;
  varieties: MicrogreensVarietySelection[];
  isValid: boolean;
}

/**
 * Individual variety selection for subscription plans
 */
export interface MicrogreensVarietySelection {
  varietyId: 'mega-mix' | 'brassica-blend' | 'sunnies-snacks';
  quantity: number;
}

/**
 * Enhanced cart item supporting both individual products and configured packages
 */
export interface CheckoutCartItem extends Omit<CartItem, 'product'> {
  id: string;
  type: 'individual' | 'subscription';
  product: FuelFoodsProduct;
  packageConfiguration?: PlanConfiguration;
  subscriptionFrequency?: SubscriptionFrequency;
  unitPrice: number;
  totalPrice: number;
  discountAmount?: number;
  addedAt: string;
}

/**
 * Customer information for checkout
 */
export interface CheckoutCustomerInfo {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  isNewCustomer: boolean;
  marketingOptIn: boolean;
}

/**
 * Shipping information
 */
export interface CheckoutShippingInfo
  extends Omit<Address, 'id' | 'type' | 'isDefault'> {
  deliveryInstructions?: string;
  preferredDeliveryTime?: 'morning' | 'afternoon' | 'evening' | 'anytime';
}

/**
 * Billing information
 */
export interface CheckoutBillingInfo
  extends Omit<Address, 'id' | 'type' | 'isDefault'> {
  sameAsShipping: boolean;
}

/**
 * Payment method types
 */
export type PaymentMethodType =
  | 'credit_card'
  | 'debit_card'
  | 'paypal'
  | 'apple_pay'
  | 'google_pay';

/**
 * Payment information
 */
export interface CheckoutPaymentInfo {
  methodType: PaymentMethodType;
  cardholderName?: string;
  cardNumber?: string; // Should be tokenized in production
  expiryMonth?: string;
  expiryYear?: string;
  cvv?: string; // Should never be stored
  savePaymentMethod: boolean;
  paymentToken?: string; // For saved payment methods
}

/**
 * Discount/coupon application
 */
export interface CheckoutDiscount {
  code: string;
  type: 'percentage' | 'fixed_amount' | 'free_shipping';
  value: number;
  description: string;
  isValid: boolean;
  errorMessage?: string;
  appliedAmount: number;
  minimumOrderAmount?: number;
  expiresAt?: Date;
}

/**
 * Shipping option
 */
export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: number;
  carrierName: string;
  trackingIncluded: boolean;
  isDefault: boolean;
}

/**
 * Tax calculation details
 */
export interface TaxCalculation {
  rate: number;
  amount: number;
  taxableAmount: number;
  jurisdiction: string;
  isTaxExempt: boolean;
  exemptionReason?: string;
}

/**
 * Order pricing breakdown
 */
export interface OrderPricing {
  subtotal: number;
  discountAmount: number;
  discountedSubtotal: number;
  shippingCost: number;
  taxCalculation: TaxCalculation;
  total: number;
  savings?: number;
}

/**
 * Comprehensive checkout data
 */
export interface CheckoutData {
  // Cart and items
  items: CheckoutCartItem[];
  itemCount: number;

  // Customer information
  customerInfo: Partial<CheckoutCustomerInfo>;

  // Addresses
  shippingInfo: Partial<CheckoutShippingInfo>;
  billingInfo: Partial<CheckoutBillingInfo>;

  // Payment
  paymentInfo: Partial<CheckoutPaymentInfo>;

  // Shipping and discounts
  selectedShippingOption?: ShippingOption;
  appliedDiscount?: CheckoutDiscount;

  // Pricing
  pricing: OrderPricing;

  // Validation and state
  isValid: boolean;
  errors: CheckoutValidationErrors;
  currentStep: CheckoutStep;

  // Metadata
  createdAt: string;
  updatedAt: string;
  sessionId: string;
}

/**
 * Checkout validation errors
 */
export interface CheckoutValidationErrors {
  customerInfo: string[];
  shippingInfo: string[];
  billingInfo: string[];
  paymentInfo: string[];
  items: string[];
  discount: string[];
  general: string[];
}

/**
 * Checkout process steps
 */
export type CheckoutStep =
  | 'cart'
  | 'customer_info'
  | 'shipping'
  | 'billing'
  | 'payment'
  | 'review'
  | 'processing'
  | 'complete';

/**
 * Order summary for final review and confirmation
 */
export interface OrderSummary {
  // Items summary
  items: OrderSummaryItem[];
  totalItems: number;

  // Customer and delivery
  customer: CheckoutCustomerInfo;
  shippingAddress: CheckoutShippingInfo;
  billingAddress: CheckoutBillingInfo;
  shippingOption: ShippingOption;

  // Payment
  paymentMethod: {
    type: PaymentMethodType;
    lastFour?: string;
    expiryMonth?: string;
    expiryYear?: string;
  };

  // Pricing breakdown
  pricing: OrderPricing;
  appliedDiscount?: CheckoutDiscount;

  // Subscriptions
  subscriptions: SubscriptionSummary[];

  // Estimated delivery
  estimatedDelivery: {
    earliest: Date;
    latest: Date;
    businessDays: number;
  };

  // Order metadata
  orderNumber?: string;
  createdAt: string;
}

/**
 * Order summary item
 */
export interface OrderSummaryItem {
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  type: 'individual' | 'subscription';
  subscriptionDetails?: {
    frequency: SubscriptionFrequency;
    planType: PlanType;
    varietyBreakdown: {
      varietyName: string;
      quantity: number;
    }[];
  };
}

/**
 * Subscription summary for orders containing subscriptions
 */
export interface SubscriptionSummary {
  planType: PlanType;
  frequency: SubscriptionFrequency;
  nextDeliveryDate: Date;
  varieties: {
    name: string;
    quantity: number;
  }[];
  recurringAmount: number;
  discountApplied?: number;
  commitmentPeriod?: number;
}

/**
 * Available microgreens varieties with all details
 */
export const MICROGREENS_VARIETIES: Record<
  'mega-mix' | 'brassica-blend' | 'sunnies-snacks',
  MicrogreensVariety
> = {
  'mega-mix': {
    id: 'mega-mix',
    name: 'Mega Mix',
    theme: 'orange',
    description:
      'A powerful blend of nutrient-dense microgreens for maximum health benefits',
    image: '/images/mega-mix-product.png',
    price: 15,
    nutritionalHighlights: [
      'High in Vitamin C',
      'Rich in Antioxidants',
      'Complete Amino Acids',
    ],
  },
  'brassica-blend': {
    id: 'brassica-blend',
    name: 'Brassica Blend',
    theme: 'green',
    description:
      'A collection of cruciferous microgreens known for their detox properties',
    image: '/images/brassica-blend-product.png',
    price: 15,
    nutritionalHighlights: [
      'Sulforaphane Rich',
      'Detox Support',
      'Anti-inflammatory',
    ],
  },
  'sunnies-snacks': {
    id: 'sunnies-snacks',
    name: 'Sunnies Snacks',
    theme: 'yellow',
    description:
      'Sweet and crunchy microgreens perfect for snacking and salads',
    image: '/images/sunnies-snacks-product.png',
    price: 15,
    nutritionalHighlights: [
      'High in Protein',
      'Essential Fatty Acids',
      'Natural Sweetness',
    ],
  },
};

/**
 * Plan requirements and configurations
 */
export const PLAN_CONFIGURATIONS: Record<
  PlanType,
  {
    name: string;
    packsRequired: number;
    description: string;
    features: string[];
    pricePerPack: number;
    discountPercentage: number;
  }
> = {
  starter: {
    name: 'Starter Plan',
    packsRequired: 0, // Any quantity
    description: 'Individual packs with flexible quantity',
    features: ['Choose any quantity', 'No commitment', 'Full price per pack'],
    pricePerPack: 15,
    discountPercentage: 0,
  },
  pro: {
    name: 'Pro Plan',
    packsRequired: 3,
    description: 'Weekly subscription with 3 packs, choose your varieties',
    features: ['3 packs per week', 'Choose varieties'],
    pricePerPack: 15,
    discountPercentage: 0,
  },
  elite: {
    name: 'Elite Plan',
    packsRequired: 5,
    description: 'Weekly subscription with 5 packs, choose your varieties',
    features: ['5 packs per week', 'Choose varieties'],
    pricePerPack: 15,
    discountPercentage: 0,
  },
};

// ============================================================================
// VALIDATION HELPER TYPES
// ============================================================================

/**
 * Form validation rules
 */
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

/**
 * Validation schema for checkout forms
 */
export interface CheckoutValidationSchema {
  customerInfo: Record<keyof CheckoutCustomerInfo, ValidationRule>;
  shippingInfo: Record<keyof CheckoutShippingInfo, ValidationRule>;
  billingInfo: Record<keyof CheckoutBillingInfo, ValidationRule>;
  paymentInfo: Record<keyof CheckoutPaymentInfo, ValidationRule>;
}

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
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
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
