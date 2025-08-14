/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

export default {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isProd ? '/aurova' : '',
}
