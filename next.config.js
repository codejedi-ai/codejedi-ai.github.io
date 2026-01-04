/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' to enable SSR
  // trailingSlash: true, // Not needed for SSR
  images: {
    // unoptimized: true // Not needed for SSR, Next.js can optimize images
  },
  experimental: {
    // Enable any experimental features if needed
  }
}

export default nextConfig