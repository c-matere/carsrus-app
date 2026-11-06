import React, { useState } from 'react';

interface SkeletonImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export const SkeletonImage: React.FC<SkeletonImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#f5f5f7] ${containerClassName}`}>
      {/* Apple Studio Shimmer Skeleton Layer */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#f0f0f2]">
          {/* Shimmer light sweep */}
          <div className="skeleton-shimmer" />
          
          {/* Subtle placeholder icon / brand emblem */}
          <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center opacity-30">
            <div className="w-2.5 h-2.5 rounded-full bg-black/20 animate-pulse" />
          </div>
        </div>
      )}

      {/* Fallback state if image fails */}
      {hasError && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#f5f5f7] text-[#86868b] text-[12px] p-4 text-center">
          <span>Image preview unavailable</span>
        </div>
      )}

      {/* Actual Image with GPU-accelerated Cross-Fade */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
