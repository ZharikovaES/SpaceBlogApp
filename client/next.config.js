/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    nasaApiUrl: "https://api.nasa.gov/planetary/apod",
    nasaKey: "so31KZagcGTTFdK1sM0EYvz2pVWbtGBYLSZ5JByM"
  },
  images: {
    domains: ["apod.nasa.gov"]
  }
}

module.exports = nextConfig
