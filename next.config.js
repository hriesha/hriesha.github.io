/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If deploying to username.github.io, leave basePath empty
  // If deploying to username.github.io/repo-name, set basePath: '/repo-name'
  basePath: '',
}

module.exports = nextConfig
