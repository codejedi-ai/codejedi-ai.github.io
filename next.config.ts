import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://codejedi-ai.vercel.app/:path*",
      },
    ]
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      { protocol: "https", hostname: "prod-files-secure.s3.*.amazonaws.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "www.notion.so", port: "", pathname: "/**" },
      { protocol: "https", hostname: "blob.v0.dev", port: "", pathname: "/**" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "unsplash.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "cdn.jsdelivr.net", port: "", pathname: "/**" },
      { protocol: "https", hostname: "raw.githubusercontent.com", port: "", pathname: "/**" },
    ],
  },
  typescript: { ignoreBuildErrors: true },
}

export default nextConfig
