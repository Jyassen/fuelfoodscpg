'use client';

import { useEffect, useRef, useState } from 'react';

type AboutUsVideoProps = {
  className?: string;
  poster?: string;
  src?: string;
};

export default function AboutUsVideo({
  className = 'w-full h-full object-cover object-center',
  poster = '/images/About-Us-tiktok-poster.jpg',
  src = '/images/About-Us-tiktok-1.mp4',
}: AboutUsVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        // Autoplay can fail on some browsers; poster remains visible.
      }
    };

    if (video.readyState >= 2) {
      void tryPlay();
      return;
    }

    video.addEventListener('canplay', tryPlay, { once: true });
    return () => video.removeEventListener('canplay', tryPlay);
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="h-full w-full bg-gray-900">
      <video
        ref={videoRef}
        className={className}
        poster={poster}
        src={shouldLoad ? src : undefined}
        autoPlay
        muted
        loop
        playsInline
        preload={shouldLoad ? 'auto' : 'none'}
      />
    </div>
  );
}
