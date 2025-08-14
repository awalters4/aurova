/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const basePath = isProd ? '/aurova' : ''   // <-- set to '' or '/repo'

export default {
  output: 'export',          // static export
  images: { unoptimized: true },
  trailingSlash: true,       // avoids 404 on refresh (Pages serves /folder/index.html)
  basePath,                  // keep '' for root sites
  assetPrefix: basePath || undefined,
}
