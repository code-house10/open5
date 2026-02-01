/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS images to be simple (or be specific to supabase if known, but user might have other sources. '**' is safe for dev, in prod maybe restrict)
        // Better:
        // hostname: 'qkfr...supabase.co' (we don't know the exact hostname without digging)
        // Let's use wildcard strictly for now or try to just enable optimization without "unoptimized: true"
      },
    ],
  },
  trailingSlash: true,
}

module.exports = nextConfig