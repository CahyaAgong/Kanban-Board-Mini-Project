/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/v1',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/v1',
        basePath: false,
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
