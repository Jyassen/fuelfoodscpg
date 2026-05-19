'use client';

import Image, { type ImageProps } from 'next/image';

type OptimizedImageProps = Omit<ImageProps, 'alt'> & {
  alt: string;
};

/**
 * Thin wrapper around next/image with sensible defaults for marketing pages.
 * Keeps layout stable (no CLS) while enabling responsive WebP/AVIF delivery.
 */
export default function OptimizedImage({
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  ...props
}: OptimizedImageProps) {
  return <Image sizes={sizes} quality={quality} {...props} />;
}
