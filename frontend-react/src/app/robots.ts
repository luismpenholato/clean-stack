import type { MetadataRoute } from 'next';

import { siteUrl } from '@/shared/lib/seo/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
    sitemap: `${siteUrl.origin}/sitemap.xml`,
  };
}
