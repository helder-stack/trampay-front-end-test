/** @type {import('next').NextConfig} */
/** @type {import('dotenv').config()} */

const nextConfig = {
  reactStrictMode: false,
  env: {
    API_URL: process.env.API_URL
  },
}

module.exports = nextConfig
