/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  // Configuración permitida sin características experimentales
  reactStrictMode: true,
  webpack: (config) => {
    // Configuración adicional de Webpack si es necesario
    return config;
  },
};
