import type { MetadataRoute } from 'next';

import { siteUrl } from '@/shared/lib/seo/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl.origin}/login`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
