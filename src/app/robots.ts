// This file dynamically generates the robots.txt for your Next.js app.
// Adjust the rules below to control how search engines crawl your site.
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '*',
      disallow: ['/api/*, /admin/*'],
    },
    sitemap: 'https://chat.quantaa.club/sitemap.xml',
  };
}
