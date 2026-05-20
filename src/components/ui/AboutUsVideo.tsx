'use client';

type AboutUsVideoProps = {
  className?: string;
  src?: string;
  poster?: string;
};

export default function AboutUsVideo({
  className = 'w-full h-full object-cover object-center',
  poster = '/images/About-Us-tiktok-poster.jpg',
  src = '/images/About-Us-tiktok-1.mp4',
}: AboutUsVideoProps) {
  return (
    <video
      className={className}
      src={src}
      poster={poster}
      controls
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}
