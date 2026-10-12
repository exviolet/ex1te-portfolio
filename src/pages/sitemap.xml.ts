import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/* Hand-written instead of @astrojs/sitemap: four fixed routes plus the
   published cases, the same filter /work uses. */
export const GET: APIRoute = async ({ site }) => {
  const cases = await getCollection('work', ({ data }) => data.published);
  const paths = ['/', '/work', '/about', '/contact', ...cases.map((entry) => `/work/${entry.id.replace(/\.md$/, '')}`)];
  const urls = paths.map((path) => `  <url><loc>${new URL(path, site)}</loc></url>`).join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
