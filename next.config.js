/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
    serverActions: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "cloudflare-ipfs.com",
      "avatars.githubusercontent.com",
    ],
  },
  webpack(config) {
    config.infrastructureLogging = { debug: /PackFileCache/ };
    return config;
  },
};

module.exports = nextConfig;
