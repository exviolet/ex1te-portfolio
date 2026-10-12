import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://bakytzhan.pages.dev',
  output: 'static',
  trailingSlash: 'never',
  // `work/tapytap.html`, not `work/tapytap/index.html`: Cloudflare Pages
  // redirects a directory index to its trailing-slash URL, which would fight
  // `trailingSlash: 'never'` and the canonical links.
  build: { format: 'file' },
});
