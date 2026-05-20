'use client';

import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

type AboutUsVideoProps = {
  className?: string;
  src?: string;
};

export default function AboutUsVideo({
  className = 'w-full h-full object-cover object-center',
  src = '/images/About-Us-tiktok-1.mp4',
}: AboutUsVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const markPlaying = () => setIsPlaying(true);

    const ensurePlayback = async () => {
      if (!video.paused && video.currentTime > 0) {
        setIsPlaying(true);
        return;
      }

      try {
        video.muted = true;
        await video.play();
      } catch {
        setIsPlaying(false);
      }
    };

    video.addEventListener('playing', markPlaying);
    video.addEventListener('timeupdate', markPlaying);

    void ensurePlayback();

    const retryTimer = window.setInterval(() => {
      if (video.paused || video.currentTime === 0) {
        void ensurePlayback();
      } else {
        setIsPlaying(true);
        window.clearInterval(retryTimer);
      }
    }, 1500);

    return () => {
      window.clearInterval(retryTimer);
      video.removeEventListener('playing', markPlaying);
      video.removeEventListener('timeupdate', markPlaying);
    };
  }, [src]);

  const handlePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    try {
      await video.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative h-full w-full bg-gray-900">
      <video
        ref={videoRef}
        className={className}
        src={src}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
      />

      {!isPlaying && (
        <button
          type="button"
          onClick={() => void handlePlay()}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/25 transition hover:bg-black/35"
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
