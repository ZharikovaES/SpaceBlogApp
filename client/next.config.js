/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    nasaApiUrl: "https://api.nasa.gov/planetary/apod",
    nasaKey: "so31KZagcGTTFdK1sM0EYvz2pVWbtGBYLSZ5JByM",
    translateApiUrl: "https://translate.googleapis.com/translate_a/single",
  },
  images: {
    domains: ["apod.nasa.gov", "img.youtube.com", "i.vimeocdn.com", "translate.googleapis.com"]
  },
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
      config.resolve.fallback = { fs: false };

    return config
  }
}

module.exports = nextConfig
