/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
  images: {
    domains: ["images.unsplash.com", "xsgames.co"],
  },
};

module.exports = nextConfig;
