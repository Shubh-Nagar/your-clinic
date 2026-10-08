"use client";

import { useState, type CSSProperties } from "react";
import { ImageIcon } from "lucide-react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  label?: string;
  style?: CSSProperties;
};

// Plain <img> with a branded fallback. Lets the template look clean even
// before real clinic photos are dropped into /public/images.
export default function SmartImage({ src, alt, className = "", label, style }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-brand-tint text-brand-dark/60 ${className}`}
        role="img"
        aria-label={alt}
      >
        <ImageIcon className="h-7 w-7" />
        <span className="px-3 text-center text-xs font-medium">{label ?? alt}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
      style={style}
    />
  );
}
