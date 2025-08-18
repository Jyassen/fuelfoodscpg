// Application constants for FuelFoods CPG

export const SITE_CONFIG = {
  name: 'fuelfoods.store',
  tagline: 'Fuel Your Life with Fresh Microgreens',
  description:
    'Premium microgreens and pet grass delivered fresh to your door. Packed with nutrients, grown locally, and delivered within 48 hours of harvest.',
  longDescription:
    'FuelFoods CPG specializes in growing and delivering the freshest, most nutritious microgreens directly to your door. Our microgreens are packed with vitamins, minerals, and antioxidants - containing up to 40 times more nutrients than their mature counterparts. From our signature Mega Mix to specialized blends like Brassica Blend, we offer a variety of flavors and nutritional profiles to suit every taste and dietary need.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fuelfoods.store',
  imagesBaseUrl:
    process.env.NEXT_PUBLIC_IMAGES_BASE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://fuelfoods.store',
  ogImage: '/images/Hero_Image.png',
  logo: '/images/logo.png',
  favicon: '/images/logo.png',
  links: {
    github: 'https://github.com/Jyassen/fuelfoodscpg',
  },
  features: [
    'Fresh microgreens delivered within 48 hours',
    'Up to 40x more nutrients than mature vegetables',
    'Locally grown and sustainably harvested',
    'Flexible subscription plans available',
    'Perfect for restaurants, families, and health enthusiasts',
  ],
};

export const NAVIGATION_ITEMS = [
  {
    title: 'HOME',
    href: '/',
    description: 'Welcome to FuelFoods',
  },
  {
    title: 'ABOUT',
    href: '/about-us',
    description: 'Learn about FuelFoods',
  },
  {
    title: 'CULINARY',
    href: 'https://culinary.fuelfoods.store/',
    description: 'Recipes and cooking tips',
  },
  {
    title: 'CONTACT US',
    href: '/contact-us',
    description: 'Get in touch with us',
  },
  {
    title: 'LOGIN',
    href: '/login',
    description: 'Access your account',
  },
  {
    title: 'My Account',
    href: '/account',
    description: 'Manage your account',
  },
];

export const FOOTER_LINKS = {
  company: [
    {
      title: 'About Us',
      href: '/about-us',
      description: 'Learn about our mission and story',
    },
    {
      title: 'Contact',
      href: '/contact-us',
      description: 'Get in touch with our team',
    },
    {
      title: 'Shipping Policy',
      href: '/shipping-policy',
      description: 'Our shipping and delivery terms',
    },
    {
      title: 'Privacy Policy',
      href: '/privacy-policy',
      description: 'How we protect your information',
    },
    {
      title: 'Terms of Service',
      href: '/terms-of-service',
      description: 'Our terms and conditions',
    },
    {
      title: 'Refund Policy',
      href: '/refund-policy',
      description: 'Our refund and return policy',
    },
  ],
  products: [
    {
      title: 'Mega Mix',
      href: '/products/mega-mix',
      description: 'Our signature microgreens blend',
    },
    {
      title: 'Brassica Blend',
      href: '/products/brassica-blend',
      description: 'Nutrient-dense brassica microgreens',
    },
    {
      title: 'Green Medley',
      href: '/products/green-medley',
      description: 'Mild and versatile greens',
    },
    {
      title: 'Pet Grass',
      href: '/products/tummies-pet-grass',
      description: 'Fresh cat grass for pets',
    },
  ],
  support: [
    {
      title: 'Subscription',
      href: '/subscription',
      description: 'Manage your delivery schedule',
    },
    {
      title: 'Shipping Info',
      href: '/shipping',
      description: 'Delivery options and timing',
    },
    {
      title: 'Growing Guide',
      href: '/growing-guide',
      description: 'Tips for growing microgreens',
    },
    {
      title: 'Nutrition Facts',
      href: '/nutrition',
      description: 'Health benefits of microgreens',
    },
  ],
};

// ============================================================================
// FUELFOODS PRODUCT DATA
// ============================================================================

export const MICROGREENS_PRODUCTS = {
  MEGA_MIX: {
    id: 'mega-mix',
    name: 'Mega Mix',
    slug: 'mega-mix',
    shortDescription: 'Our signature blend of premium microgreens',
    description:
      'A carefully curated mix of the most nutritious and flavorful microgreens including broccoli, kale, arugula, and more. Perfect for salads, smoothies, and garnishing.',
    microgreenTypes: [
      'broccoli',
      'kale',
      'arugula',
      'red-cabbage',
      'mustard',
      'radish',
    ],
    nutritionalHighlights: [
      'High in Vitamin C and K',
      'Rich in antioxidants',
      'Contains sulforaphane',
      'High protein content',
    ],
    packageSizes: [
      { size: '3-pack', quantity: 3, price: 24.99, weight: '6 oz' },
      {
        size: '5-pack',
        quantity: 5,
        price: 39.99,
        weight: '10 oz',
        isPopular: true,
      },
    ],
    images: {
      primary: 'Mega-Mix-Product-Pg.png',
      gallery: [
        'Mega-Mix-Product-Pg-2.png',
        'Mega-Product-img.png',
        'Mega-popup2.png',
      ],
    },
    subscriptionDiscount: 15, // 15% off for subscriptions
  },

  BRASSICA_BLEND: {
    id: 'brassica-blend',
    name: 'Brassica Blend',
    slug: 'brassica-blend',
    shortDescription: 'Nutrient-dense brassica microgreens blend',
    description:
      'A powerhouse blend of brassica family microgreens including broccoli, kale, cabbage, and mustard. Known for their high sulforaphane content and cancer-fighting properties.',
    microgreenTypes: [
      'broccoli',
      'kale',
      'red-cabbage',
      'mustard',
      'kohlrabi',
      'pak-choi',
    ],
    nutritionalHighlights: [
      'Highest sulforaphane content',
      'Cancer-fighting compounds',
      'Vitamin K powerhouse',
      'Anti-inflammatory properties',
    ],
    packageSizes: [
      { size: '3-pack', quantity: 3, price: 26.99, weight: '6 oz' },
      {
        size: '5-pack',
        quantity: 5,
        price: 42.99,
        weight: '10 oz',
        isPopular: true,
      },
    ],
    images: {
      primary: 'Brassica-Blend-Product-Pg.png',
      gallery: [
        'Brassica-Blend-Product-Pg-2.png',
        'Brassica-Product-img.png',
        'Brasspopup2.png',
      ],
    },
    subscriptionDiscount: 15,
  },

  GREEN_MEDLEY: {
    id: 'green-medley',
    name: 'Green Medley',
    slug: 'green-medley',
    shortDescription: 'Mild and versatile green microgreens',
    description:
      'A gentle introduction to microgreens with mild, sweet flavors. Perfect for beginners and children. Includes peas, sunflowers, and other mild greens.',
    microgreenTypes: ['peas', 'sunflowers', 'buckwheat', 'mizuna'],
    nutritionalHighlights: [
      'High protein from peas',
      'Vitamin E from sunflowers',
      'Mild, sweet flavor',
      'Kid-friendly nutrition',
    ],
    packageSizes: [
      { size: '3-pack', quantity: 3, price: 22.99, weight: '6 oz' },
      {
        size: '5-pack',
        quantity: 5,
        price: 36.99,
        weight: '10 oz',
        isPopular: true,
      },
    ],
    images: {
      primary: 'Green-Medley-Product-Pg.png',
      gallery: ['green-med-Product-pg-img.png'],
    },
    subscriptionDiscount: 15,
  },

  SUNNIES_SNACKS: {
    id: 'sunnies-snacks',
    name: 'Sunnies Snacks',
    slug: 'sunnies-snacks',
    shortDescription: 'Pure sunflower microgreens',
    description:
      'Crunchy, nutty sunflower microgreens that are perfect for snacking. High in protein and vitamin E, with a satisfying crunch and mild nutty flavor.',
    microgreenTypes: ['sunflowers'],
    nutritionalHighlights: [
      'Highest protein content',
      'Rich in Vitamin E',
      'Crunchy texture',
      'Nutty flavor profile',
    ],
    packageSizes: [
      { size: '3-pack', quantity: 3, price: 19.99, weight: '6 oz' },
      {
        size: '5-pack',
        quantity: 5,
        price: 31.99,
        weight: '10 oz',
        isPopular: true,
      },
    ],
    images: {
      primary: 'Sunnies-Product-img.jpg',
      gallery: ['Sunnies-Snacks.png.png', 'Sunniespopup2.png'],
    },
    subscriptionDiscount: 15,
  },

  TUMMIES_PET_GRASS: {
    id: 'tummies-pet-grass',
    name: 'Tummies Pet Grass',
    slug: 'tummies-pet-grass',
    shortDescription: 'Fresh cat grass for healthy digestion',
    description:
      'Live cat grass pots that provide natural digestive aid for cats and small pets. Easy to grow and maintain, providing fresh grass for weeks.',
    microgreenTypes: ['cat-grass'],
    benefits: [
      'Aids digestion',
      'Natural hairball remedy',
      'Safe for cats and small pets',
      'Long-lasting live plants',
    ],
    packageSizes: [
      { size: '3-pack', quantity: 3, price: 18.99, weight: '3 lbs' },
      {
        size: '5-pack',
        quantity: 5,
        price: 29.99,
        weight: '5 lbs',
        isPopular: true,
      },
    ],
    images: {
      primary: 'Live-Cat-Grass.jpg',
      gallery: ['3-live-cat-grass-pots-1536x1075-1.jpg'],
    },
    subscriptionDiscount: 20, // Higher discount for pet products
  },
} as const;

export const PRODUCT_CATEGORIES = {
  MICROGREENS: 'microgreens',
  PET_GRASS: 'pet-grass',
  BUNDLES: 'bundles',
};

export const MICROGREEN_TYPES = {
  // Brassica family
  ARUGULA: {
    name: 'Arugula',
    family: 'brassica',
    flavor: 'peppery, nutty',
    color: 'dark green',
    nutrients: ['Vitamin K', 'Calcium', 'Iron'],
    image: 'Arugula.png',
  },
  BROCCOLI: {
    name: 'Broccoli',
    family: 'brassica',
    flavor: 'mild, fresh',
    color: 'bright green',
    nutrients: ['Sulforaphane', 'Vitamin C', 'Folate'],
    image: 'Broccoli.png',
  },
  KALE: {
    name: 'Kale',
    family: 'brassica',
    flavor: 'earthy, slightly bitter',
    color: 'dark green',
    nutrients: ['Vitamin K', 'Vitamin A', 'Calcium'],
    image: 'Kale-Trio.png',
  },
  RED_CABBAGE: {
    name: 'Red Cabbage',
    family: 'brassica',
    flavor: 'mild, sweet',
    color: 'purple-red',
    nutrients: ['Anthocyanins', 'Vitamin C', 'Vitamin K'],
    image: 'Red-Cabbage.png',
  },
  MUSTARD: {
    name: 'Mustard',
    family: 'brassica',
    flavor: 'spicy, pungent',
    color: 'green with purple stems',
    nutrients: ['Vitamin K', 'Folate', 'Vitamin A'],
    image: 'Mustard.png',
  },
  KOHLRABI: {
    name: 'Kohlrabi',
    family: 'brassica',
    flavor: 'mild, sweet',
    color: 'light green',
    nutrients: ['Vitamin C', 'Fiber', 'Potassium'],
    image: 'Kohlrabi.png',
  },
  PAK_CHOI: {
    name: 'Pak Choi',
    family: 'brassica',
    flavor: 'mild, slightly spicy',
    color: 'light green',
    nutrients: ['Vitamin A', 'Vitamin C', 'Calcium'],
    image: 'Pak-Choi.png',
  },

  // Other families
  PEAS: {
    name: 'Peas',
    family: 'legume',
    flavor: 'sweet, fresh',
    color: 'bright green',
    nutrients: ['Protein', 'Vitamin C', 'Folate'],
    image: 'Peas.png',
  },
  SUNFLOWERS: {
    name: 'Sunflowers',
    family: 'asteraceae',
    flavor: 'nutty, crunchy',
    color: 'green with yellow accents',
    nutrients: ['Protein', 'Vitamin E', 'Magnesium'],
    image: 'Sunflowers.png',
  },
  RADISH: {
    name: 'Radish',
    family: 'brassica',
    flavor: 'spicy, peppery',
    color: 'green with purple stems',
    nutrients: ['Vitamin C', 'Folate', 'Potassium'],
    image: 'Radish.png',
  },
  BEET: {
    name: 'Beet',
    family: 'amaranthaceae',
    flavor: 'earthy, sweet',
    color: 'red stems, green leaves',
    nutrients: ['Folate', 'Nitrates', 'Betaine'],
    image: 'Beet.png',
  },
  MIZUNA: {
    name: 'Mizuna',
    family: 'brassica',
    flavor: 'mild, slightly peppery',
    color: 'feathery green',
    nutrients: ['Vitamin A', 'Vitamin C', 'Folate'],
    image: 'Mizuna.png',
  },
  BUCKWHEAT: {
    name: 'Buckwheat',
    family: 'polygonaceae',
    flavor: 'tangy, lemony',
    color: 'light green with pink stems',
    nutrients: ['Protein', 'Rutin', 'Magnesium'],
    image: 'Buckwheat.png',
  },
  DAIKON: {
    name: 'Daikon',
    family: 'brassica',
    flavor: 'spicy, pungent',
    color: 'white stems, green leaves',
    nutrients: ['Vitamin C', 'Folate', 'Potassium'],
    image: 'Daikon.png',
  },
} as const;

// ============================================================================
// SUBSCRIPTION PLANS
// ============================================================================

export const SUBSCRIPTION_PLANS = {
  STARTER: {
    id: 'starter',
    name: 'Starter Plan',
    description: 'Perfect for trying microgreens',
    minProducts: 1,
    maxProducts: 2,
    discount: 10, // 10% off
    frequencies: ['bi-weekly', 'monthly'],
    benefits: [
      '10% off all orders',
      'Free shipping on orders over $35',
      'Flexible delivery schedule',
      'Cancel anytime',
    ],
  },
  FAMILY: {
    id: 'family',
    name: 'Family Plan',
    description: 'Great for families who love fresh greens',
    minProducts: 2,
    maxProducts: 4,
    discount: 15, // 15% off
    frequencies: ['weekly', 'bi-weekly', 'monthly'],
    benefits: [
      '15% off all orders',
      'Free shipping on all orders',
      'Priority customer support',
      'Flexible delivery schedule',
      'Mix and match products',
      'Cancel anytime',
    ],
    isPopular: true,
  },
  ENTHUSIAST: {
    id: 'enthusiast',
    name: 'Enthusiast Plan',
    description: 'For serious microgreen lovers',
    minProducts: 4,
    maxProducts: 8,
    discount: 20, // 20% off
    frequencies: ['weekly', 'bi-weekly'],
    benefits: [
      '20% off all orders',
      'Free shipping on all orders',
      'Priority customer support',
      'Early access to new products',
      'Exclusive recipes and tips',
      'Flexible delivery schedule',
      'Cancel anytime',
    ],
  },
  COMMERCIAL: {
    id: 'commercial',
    name: 'Commercial Plan',
    description: 'Bulk orders for restaurants and businesses',
    minProducts: 10,
    maxProducts: null, // No limit
    discount: 25, // 25% off
    frequencies: ['weekly', 'bi-weekly'],
    benefits: [
      '25% off all orders',
      'Free shipping on all orders',
      'Dedicated account manager',
      'Custom delivery schedule',
      'Invoice billing available',
      'Volume discounts',
      'Priority fulfillment',
    ],
    requiresApproval: true,
  },
} as const;

// ============================================================================
// PRICING AND SHIPPING
// ============================================================================

export const PRICING = {
  FREE_SHIPPING_THRESHOLD: 35.0,
  STANDARD_SHIPPING: 8.99,
  EXPRESS_SHIPPING: 15.99,
  TAX_RATE: 0.08, // 8% default tax rate
  SUBSCRIPTION_DISCOUNTS: {
    weekly: 20,
    'bi-weekly': 15,
    monthly: 10,
    'bi-monthly': 10,
  },
} as const;

// ============================================================================
// IMAGE PATHS AND MEDIA
// ============================================================================

export const IMAGE_PATHS = {
  PRODUCTS: '/images/products',
  MICROGREENS: '/images/microgreens',
  LIFESTYLE: '/images/lifestyle',
  ICONS: '/images/icons',
  HERO: '/images/hero',
  LOGOS: '/images/logos',
} as const;

export const HERO_IMAGES = [
  {
    src: 'Hero_Image.png',
    alt: 'Fresh microgreens delivered to your door',
    title: 'Premium Microgreens Delivered Fresh',
    subtitle: 'Nutrient-dense, locally grown microgreens for healthy living',
  },
  {
    src: 'Updated-Hero-Image.png',
    alt: 'Variety of colorful microgreens',
    title: 'Discover the Power of Microgreens',
    subtitle: 'Packed with vitamins, minerals, and antioxidants',
  },
  {
    src: 'Fresh-Greens-Delivered-Weekly-Image.png',
    alt: 'Weekly microgreens delivery',
    title: 'Fresh Greens Delivered Weekly',
    subtitle: 'Never run out of nutrition with our subscription service',
  },
] as const;

export const ORDER_STATUSES = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
} as const;

export const CURRENCY = 'USD';

export const DEFAULT_PAGINATION_LIMIT = 12;

// ============================================================================
// DELIVERY AND FRESHNESS
// ============================================================================

export const DELIVERY_INFO = {
  FRESHNESS_GUARANTEE: '7-10 days refrigerated',
  HARVEST_TO_DELIVERY: '24-48 hours',
  DELIVERY_DAYS: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  CUTOFF_TIME: '11:59 PM Sunday', // Orders placed after this ship the following week
  DELIVERY_AREAS: [
    // Update with actual delivery areas
    'Greater Metro Area',
    'Surrounding Counties',
  ],
  PACKAGING: {
    material: 'Eco-friendly clamshells',
    recyclable: true,
    compostable: false,
    insulation: 'Biodegradable insulation packs',
  },
} as const;

// ============================================================================
// NUTRITIONAL INFORMATION
// ============================================================================

export const NUTRITION_FACTS = {
  MICROGREENS_VS_MATURE: {
    nutrientDensity: '4-40x higher than mature plants',
    vitamins: 'Up to 40x more vitamin C',
    antioxidants: '5-10x more antioxidants',
    minerals: '2-5x more minerals',
  },
  SERVING_SIZE: '1 oz (28g)',
  STORAGE_TEMP: '35-40°F (2-4°C)',
  SHELF_LIFE: '7-10 days refrigerated',
} as const;

// ============================================================================
// TESTIMONIALS AND SOCIAL PROOF
// ============================================================================

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Health Coach',
    content:
      'FuelFoods microgreens have transformed my nutrition routine. The freshness and flavor are unmatched!',
    rating: 5,
    image: 'testimonial-1.jpg',
  },
  {
    id: 2,
    name: 'Chef Michael Torres',
    role: 'Restaurant Owner',
    content:
      'We use FuelFoods microgreens in all our signature dishes. Our customers love the vibrant flavors and colors.',
    rating: 5,
    image: 'testimonial-2.jpg',
  },
  {
    id: 3,
    name: 'Lisa Chen',
    role: 'Busy Mom',
    content:
      'The subscription service is perfect for our family. Fresh, nutritious greens delivered right to our door!',
    rating: 5,
    image: 'testimonial-3.jpg',
  },
] as const;

// ============================================================================
// SEO AND METADATA DEFAULTS
// ============================================================================

export const SEO_DEFAULTS = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  keywords: [
    'microgreens',
    'fresh vegetables',
    'organic greens',
    'healthy eating',
    'nutrition',
    'superfood',
    'vitamins',
    'antioxidants',
    'local delivery',
    'subscription',
    'meal prep',
    'healthy lifestyle',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.imagesBaseUrl}${SITE_CONFIG.ogImage}`,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [`${SITE_CONFIG.imagesBaseUrl}${SITE_CONFIG.ogImage}`],
  },
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.imagesBaseUrl}${SITE_CONFIG.logo}`,
    sameAs: [
      // Add social media URLs when available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
  },
};

// ============================================================================
// GROWING AND CARE INSTRUCTIONS
// ============================================================================

export const GROWING_INSTRUCTIONS = {
  GENERAL: [
    'Keep microgreens refrigerated at 35-40°F',
    'Store in original packaging until ready to use',
    'Rinse gently before consuming',
    'Use within 7-10 days for best quality',
    'Do not freeze microgreens',
  ],
  PET_GRASS: [
    'Place in bright, indirect sunlight',
    'Water lightly every 2-3 days',
    'Trim regularly to encourage growth',
    'Replace when grass becomes yellow or sparse',
    'Safe for cats, dogs, and small pets',
  ],
} as const;

// ============================================================================
// BUSINESS INFORMATION
// ============================================================================

export const BUSINESS_INFO = {
  name: 'FuelFoods CPG',
  legalName: 'FuelFoods LLC',
  email: 'hello@fuelfoodscpg.com',
  phone: '(555) 123-4567', // Update with actual phone
  address: {
    street: '123 Farm Lane', // Update with actual address
    city: 'Your City',
    state: 'Your State',
    zip: '12345',
    country: 'United States',
  },
  hours: {
    monday: '9:00 AM - 5:00 PM',
    tuesday: '9:00 AM - 5:00 PM',
    wednesday: '9:00 AM - 5:00 PM',
    thursday: '9:00 AM - 5:00 PM',
    friday: '9:00 AM - 5:00 PM',
    saturday: 'Closed',
    sunday: 'Closed',
  },
  socialMedia: {
    // Add when available
    instagram: '',
    facebook: '',
    twitter: '',
    tiktok: '',
  },
} as const;
