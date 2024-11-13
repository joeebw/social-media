import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

const ImageWithSkeleton = ({
  src,
  alt,
  className = "",
  containerClassName = "",
}: ImageWithSkeletonProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`relative ${containerClassName}`}>
      {!imageLoaded && (
        <Skeleton className="absolute inset-0 bg-gray-200 rounded-lg" />
      )}

      <img
        src={src}
        alt={alt}
        className={`${className} ${
          imageLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};

export default ImageWithSkeleton;
