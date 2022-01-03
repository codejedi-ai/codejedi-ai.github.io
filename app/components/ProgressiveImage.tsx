"use client"

import { useState } from "react"
import Image, { ImageProps } from "next/image"

interface ProgressiveImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  fallbackSrc?: string
  containerClassName?: string
}

export default function ProgressiveImage({
  src,
  alt,
  fallbackSrc = "/project-management-team.png",
  className = "",
  containerClassName = "",
  ...props
}: ProgressiveImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {isLoading && (
        <div className="absolute inset-0 shimmer z-10" aria-hidden="true" />
      )}
      <Image
        {...props}
        src={imgSrc || fallbackSrc}
        alt={alt}
        className={`transition-all duration-700 ease-in-out ${
          isLoading ? "scale-105 blur-lg grayscale" : "scale-100 blur-0 grayscale-0"
        } ${className}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImgSrc(fallbackSrc)
          setIsLoading(false)
        }}
      />
    </div>
  )
}
