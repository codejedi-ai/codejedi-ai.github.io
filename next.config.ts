import type { NextConfig } from "next"

const isGithubPagesBuild = process.env.GITHUB_PAGES === "true"

const nextConfig: NextConfig = {
  // Don't apply trailing slash to API routes to avoid CORS redirect issues
  trailingSlash: false,
  ...(isGithubPagesBuild ? { output: "export" as const } : {}),
  async rewrites() {
    // Only apply rewrites if NOT building for static export (GitHub Pages)
    if (isGithubPagesBuild) {
      return []
    }

    return [
      {
        // Redirect all non-API paths to the live site for preview/fallback
        source: "/:path((?!api/).*)",
        destination: "https://codejedi-ai.vercel.app/:path",
      },
    ]
  },
  images: {
    unoptimized: isGithubPagesBuild,
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
