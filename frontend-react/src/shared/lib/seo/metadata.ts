import type { Metadata } from 'next';

const APP_NAME =
  process.env.NEXT_PUBLIC_APP_NAME?.trim() ?? 'Boilerplate';

const DEFAULT_DESCRIPTION =
  'Fullstack boilerplate for admin panels and SaaS applications.';

function getSiteUrl(): URL {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  return new URL(value ?? 'http://localhost:3000');
}

export const siteUrl = getSiteUrl();

export const rootMetadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: APP_NAME,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: APP_NAME,
    title: APP_NAME,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: false,
    follow: false,
  },
};

type PageMetadataOptions = {
  title: string;
  description?: string;
};

export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${APP_NAME}`,
      description,
    },
  };
}
