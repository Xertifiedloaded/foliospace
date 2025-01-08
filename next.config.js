const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: false,
  images: {
    domains: ["example.com", 'res.cloudinary.com'],
  },
  i18n,
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'http://localhost:3000, http://localhost:3001, https://www.foliospace.org.ng, https://foliospace.vercel.app' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
    ];
  },
};