/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ['avatars.githubusercontent.com'],
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/heart',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
