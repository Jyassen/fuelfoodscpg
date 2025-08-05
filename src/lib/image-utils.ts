import path from 'path';
import fs from 'fs';
import type { 
  WordPressMedia, 
  OptimizedImage, 
  ImageVersion, 
  ImageProcessingMeta 
} from './types';

// ============================================================================
// IMAGE CONSTANTS AND CONFIGURATION
// ============================================================================

export const IMAGE_CONFIG = {
  // Standard image sizes for the website
  sizes: {
    thumbnail: { width: 150, height: 150 },
    small: { width: 300, height: 300 },
    medium: { width: 600, height: 600 },
    large: { width: 1200, height: 1200 },
    hero: { width: 1920, height: 1080 },
  },
  
  // Quality settings for different formats
  quality: {
    webp: 85,
    jpeg: 85,
    png: 95,
    avif: 80,
  },

  // Supported formats in order of preference
  formats: ['avif', 'webp', 'jpeg', 'png'] as const,
  
  // Maximum file size in bytes (2MB)
  maxFileSize: 2 * 1024 * 1024,
} as const;

// ============================================================================
// IMAGE METADATA UTILITIES
// ============================================================================

/**
 * Extract image metadata from file path
 */
export function extractImageMetadata(filePath: string): Partial<WordPressMedia> {
  const fileName = path.basename(filePath);
  const ext = path.extname(fileName).toLowerCase();
  
  try {
    const stats = fs.statSync(filePath);
    
    return {
      filename: fileName,
      path: filePath,
      fileSize: stats.size,
      mimeType: getMimeType(ext),
      // URL will be constructed based on the public path
      url: `/images/${fileName}`,
      // Extract potential alt text from filename
      alt: generateAltTextFromFilename(fileName),
    };
  } catch (error) {
    console.error(`Error extracting metadata for ${filePath}:`, error);
    return {
      filename: fileName,
      path: filePath,
    };
  }
}

/**
 * Get MIME type from file extension
 */
function getMimeType(extension: string): string {
  const mimeTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.svg': 'image/svg+xml',
    '.bmp': 'image/bmp',
    '.tiff': 'image/tiff',
    '.tif': 'image/tiff',
  };
  
  return mimeTypes[extension] || 'application/octet-stream';
}

/**
 * Generate alt text from filename
 */
function generateAltTextFromFilename(filename: string): string {
  const nameWithoutExt = path.parse(filename).name;
  
  return nameWithoutExt
    .replace(/[-_]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, l => l.toUpperCase())
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Get all images from the content directory
 */
export function getAllContentImages(): WordPressMedia[] {
  const imagesDir = path.join(process.cwd(), '../../content/images');
  
  if (!fs.existsSync(imagesDir)) {
    console.warn(`Images directory not found: ${imagesDir}`);
    return [];
  }

  try {
    const files = fs.readdirSync(imagesDir);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'];
    
    return files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
      })
      .map((file, index) => {
        const filePath = path.join(imagesDir, file);
        const metadata = extractImageMetadata(filePath);
        
        return {
          original_id: String(index + 1),
          title: generateAltTextFromFilename(file),
          filename: file,
          path: filePath,
          date: new Date().toISOString(),
          ...metadata,
        };
      })
      .sort((a, b) => a.filename.localeCompare(b.filename));
  } catch (error) {
    console.error('Error reading images directory:', error);
    return [];
  }
}

// ============================================================================
// IMAGE OPTIMIZATION UTILITIES
// ============================================================================

/**
 * Create optimized image metadata (for future image processing)
 */
export function createOptimizedImageMetadata(
  originalImage: WordPressMedia,
  processingMeta?: ImageProcessingMeta
): OptimizedImage {
  const baseUrl = `/images/optimized/${path.parse(originalImage.filename).name}`;
  
  // Generate different size versions
  const optimizedVersions: ImageVersion[] = Object.entries(IMAGE_CONFIG.sizes).map(
    ([sizeName, dimensions]) => ({
      size: sizeName as ImageVersion['size'],
      width: dimensions.width,
      height: dimensions.height,
      url: `${baseUrl}-${sizeName}.webp`,
      format: 'webp',
      quality: IMAGE_CONFIG.quality.webp,
      fileSize: Math.floor((originalImage.fileSize || 0) * 0.6), // Estimated
    })
  );

  return {
    id: originalImage.original_id,
    url: originalImage.url || '',
    alt: originalImage.alt || originalImage.title,
    width: originalImage.width || 800,
    height: originalImage.height || 600,
    isPrimary: false,
    originalPath: originalImage.path,
    optimizedVersions,
    compressionRatio: processingMeta?.compressionRatio || 0.6,
    dominantColors: extractDominantColors(originalImage.filename),
    blurDataURL: generateBlurDataURL(),
    seoOptimized: true,
  };
}

/**
 * Extract dominant colors from image filename (placeholder implementation)
 */
function extractDominantColors(filename: string): string[] {
  // In a real implementation, this would analyze the actual image
  // For now, return colors based on filename patterns
  const colors: Record<string, string[]> = {
    green: ['#4ade80', '#22c55e', '#16a34a'],
    beet: ['#dc2626', '#991b1b', '#7f1d1d'],
    broccoli: ['#15803d', '#166534', '#14532d'],
    sunflower: ['#fbbf24', '#f59e0b', '#d97706'],
    radish: ['#e11d48', '#be185d', '#9d174d'],
  };

  const lowerFilename = filename.toLowerCase();
  
  for (const [key, colorArray] of Object.entries(colors)) {
    if (lowerFilename.includes(key)) {
      return colorArray;
    }
  }

  // Default green theme for microgreens
  return colors.green;
}

/**
 * Generate blur data URL placeholder
 */
function generateBlurDataURL(): string {
  // Simple blur placeholder - in production, this would be generated from the actual image
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmM2Y0ZjYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlNWU3ZWIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==';
}

// ============================================================================
// PRODUCT IMAGE UTILITIES
// ============================================================================

/**
 * Get product images by variant name
 */
export function getProductImages(variantName: string): OptimizedImage[] {
  const allImages = getAllContentImages();
  const productImages = allImages.filter(image => 
    image.filename.toLowerCase().includes(variantName.toLowerCase())
  );

  return productImages.map(image => createOptimizedImageMetadata(image));
}

/**
 * Get hero/banner images
 */
export function getHeroImages(): OptimizedImage[] {
  const allImages = getAllContentImages();
  const heroKeywords = ['hero', 'banner', 'home', 'main', 'header'];
  
  const heroImages = allImages.filter(image => 
    heroKeywords.some(keyword => 
      image.filename.toLowerCase().includes(keyword)
    )
  );

  return heroImages.map(image => createOptimizedImageMetadata(image));
}

/**
 * Get images by category
 */
export function getImagesByCategory(category: string): OptimizedImage[] {
  const allImages = getAllContentImages();
  const categoryKeywords = getCategoryKeywords(category);
  
  const categoryImages = allImages.filter(image => 
    categoryKeywords.some(keyword => 
      image.filename.toLowerCase().includes(keyword.toLowerCase())
    )
  );

  return categoryImages.map(image => createOptimizedImageMetadata(image));
}

/**
 * Get category keywords for image filtering
 */
function getCategoryKeywords(category: string): string[] {
  const keywordMap: Record<string, string[]> = {
    microgreens: ['mega', 'brassica', 'green', 'medley', 'mix', 'blend', 'microgreen'],
    'pet-products': ['tummies', 'cat', 'grass', 'pet'],
    lifestyle: ['community', 'fresh', 'delivery', 'healthy', 'organic'],
    about: ['about', 'team', 'story', 'mission'],
    contact: ['contact', 'location', 'address'],
    packaging: ['pack', 'package', 'product-img', 'popup'],
  };

  return keywordMap[category] || [];
}

// ============================================================================
// IMAGE PROCESSING UTILITIES
// ============================================================================

/**
 * Validate image file
 */
export function validateImage(filePath: string): {
  isValid: boolean;
  errors: string[];
  metadata?: WordPressMedia;
} {
  const errors: string[] = [];
  
  if (!fs.existsSync(filePath)) {
    errors.push('File does not exist');
    return { isValid: false, errors };
  }

  try {
    const stats = fs.statSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const supportedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'];

    if (!supportedExtensions.includes(ext)) {
      errors.push(`Unsupported file format: ${ext}`);
    }

    if (stats.size > IMAGE_CONFIG.maxFileSize) {
      errors.push(`File size (${formatFileSize(stats.size)}) exceeds maximum (${formatFileSize(IMAGE_CONFIG.maxFileSize)})`);
    }

    if (stats.size === 0) {
      errors.push('File is empty');
    }

    const metadata = extractImageMetadata(filePath);

    return {
      isValid: errors.length === 0,
      errors,
      metadata: metadata as WordPressMedia,
    };
  } catch (error) {
    errors.push(`Error reading file: ${error}`);
    return { isValid: false, errors };
  }
}

/**
 * Format file size for display
 */
function formatFileSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Generate responsive image srcSet string
 */
export function generateSrcSet(optimizedImage: OptimizedImage): string {
  return optimizedImage.optimizedVersions
    .map(version => `${version.url} ${version.width}w`)
    .join(', ');
}

/**
 * Generate sizes attribute for responsive images
 */
export function generateSizesAttribute(breakpoints?: Record<string, string>): string {
  const defaultBreakpoints = {
    '(max-width: 640px)': '100vw',
    '(max-width: 768px)': '50vw',
    '(max-width: 1024px)': '33vw',
    '(max-width: 1280px)': '25vw',
  };

  const sizes = breakpoints || defaultBreakpoints;
  const sizeStrings = Object.entries(sizes).map(([query, size]) => `${query} ${size}`);
  sizeStrings.push('20vw'); // Default size

  return sizeStrings.join(', ');
}

// ============================================================================
// IMAGE ANALYSIS UTILITIES
// ============================================================================

/**
 * Analyze all content images and provide statistics
 */
export function analyzeContentImages() {
  const images = getAllContentImages();
  
  const stats = {
    totalImages: images.length,
    totalSize: images.reduce((sum, img) => sum + (img.fileSize || 0), 0),
    averageSize: 0,
    byFormat: {} as Record<string, number>,
    byCategory: {} as Record<string, number>,
    largestImages: [] as WordPressMedia[],
    potentialOptimizations: [] as string[],
  };

  stats.averageSize = Math.round(stats.totalSize / images.length);

  // Group by format
  images.forEach(image => {
    const ext = path.extname(image.filename).toLowerCase();
    stats.byFormat[ext] = (stats.byFormat[ext] || 0) + 1;
  });

  // Find largest images
  stats.largestImages = images
    .filter(img => img.fileSize)
    .sort((a, b) => (b.fileSize || 0) - (a.fileSize || 0))
    .slice(0, 10);

  // Identify potential optimizations
  if (stats.byFormat['.png'] > stats.byFormat['.webp'] || 0) {
    stats.potentialOptimizations.push('Convert PNG images to WebP format');
  }

  if (stats.largestImages.some(img => (img.fileSize || 0) > 500000)) {
    stats.potentialOptimizations.push('Compress large images (>500KB)');
  }

  const oldFormats = ['.jpg', '.jpeg', '.png'].reduce((sum, ext) => sum + (stats.byFormat[ext] || 0), 0);
  const modernFormats = ['.webp', '.avif'].reduce((sum, ext) => sum + (stats.byFormat[ext] || 0), 0);
  
  if (oldFormats > modernFormats) {
    stats.potentialOptimizations.push('Use modern image formats (WebP, AVIF)');
  }

  return {
    ...stats,
    totalSizeFormatted: formatFileSize(stats.totalSize),
    averageSizeFormatted: formatFileSize(stats.averageSize),
  };
}