type AboutUsVideoProps = {
  className?: string;
};

export default function AboutUsVideo({
  className = 'w-full h-full object-cover object-center',
}: AboutUsVideoProps) {
  return (
    <video
      suppressHydrationWarning
      className={className}
      src="/images/About-Us-tiktok-1.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}
