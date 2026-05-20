'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

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
  const [isVisible, setIsVisible] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);

  const attemptPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return false;

    video.defaultMuted = true;
    video.muted = true;

    try {
      await video.play();
      setNeedsTap(false);
      return true;
    } catch {
      setNeedsTap(true);
      return false;
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px', threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const video = videoRef.current;
    if (!video) return;

    const handleReady = () => {
      void attemptPlay();
    };

    video.addEventListener('loadeddata', handleReady);
    video.addEventListener('canplay', handleReady);

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      void attemptPlay();
    } else {
      video.load();
    }

    return () => {
      video.removeEventListener('loadeddata', handleReady);
      video.removeEventListener('canplay', handleReady);
    };
  }, [isVisible, src, attemptPlay]);

  const handleManualPlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    await attemptPlay();
  };

  return (
    <div ref={containerRef} className="relative h-full w-full bg-gray-900">
      <video
        ref={videoRef}
        className={className}
        poster={poster}
        src={isVisible ? src : undefined}
        muted
        loop
        playsInline
        autoPlay
        preload={isVisible ? 'auto' : 'none'}
        onPlay={() => setNeedsTap(false)}
      />

      {needsTap && (
        <button
          type="button"
          onClick={() => void handleManualPlay()}
          className="absolute inset-0 flex items-center justify-center bg-black/30 transition hover:bg-black/40"
          aria-label="Play video"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
            <Play className="ml-1 h-8 w-8 text-gray-900" fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  );
}
