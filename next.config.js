/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
};

module.exports = nextConfig;
