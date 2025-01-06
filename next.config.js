const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: false,
  images: {
    domains: ["example.com", 'res.cloudinary.com'],
  },
  i18n,
};