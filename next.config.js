/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    if (process.env.VERCEL) {
      return []
    }
    return [
      {
        source: '/api/py/:path*',
        destination: 'http://127.0.0.1:8000/api/py/:path*',
      },
    ]
  },
}

module.exports = nextConfig
