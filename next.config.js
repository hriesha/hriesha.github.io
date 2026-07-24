/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Emit work/index.html rather than work.html so /work/ resolves on GitHub Pages
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // If deploying to username.github.io, leave basePath empty
  // If deploying to username.github.io/repo-name, set basePath: '/repo-name'
  basePath: '',
}

module.exports = nextConfig
