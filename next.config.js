/** @type {import('next').NextConfig} */
module.exports = {

  typescript: {
    ignoreBuildErrors: true,
  },

  trailingSlash: true,
  reactStrictMode: true,

  // eslint-disable-next-line @typescript-eslint/require-await
  async headers() {
    return [
      {
        source: '/:path*/',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },

  images: {
    domains: ['cdn.pixabay.com'],
  },
};
