import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const PUBLIC_IMAGE_URL = 'https://campus-sync-seven.vercel.app/preview.jpg';

const defaultSEO = {
  title: 'CampusSync - Complete Student Management Platform',
  description: 'Transform your academic journey with CampusSync - the ultimate student management platform featuring timetables, grade tracking, expense management, study tools, and community features.',
  image: PUBLIC_IMAGE_URL,
  type: 'website',
  keywords: 'student management, academic planner, grade tracker, expense tracker, study tools, campus life, education app, student productivity',
  author: 'CampusSync Team',
  url: 'https://campus-sync-seven.vercel.app/preview.jpg'
};

export function SEO({
  title,
  description = defaultSEO.description,
  image = defaultSEO.image,
  url,
  type = defaultSEO.type,
  keywords = defaultSEO.keywords,
  author = defaultSEO.author,
  publishedTime,
  modifiedTime
}: SEOProps) {
  const seoTitle = title ? `${title} | CampusSync` : defaultSEO.title;
  const seoUrl = url || (typeof window !== 'undefined' ? window.location.href : defaultSEO.url);
  const seoImage = image.startsWith('http') ? image : `${defaultSEO.url.replace(/\/$/, '')}/${image.replace(/^\//, '')}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CampusSync",
    "description": description,
    "url": defaultSEO.url,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "CampusSync Team"
    },
    "image": seoImage,
    "screenshot": seoImage
  };

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="theme-color" content="#3B82F6" />

      {/* Canonical */}
      <link rel="canonical" href={seoUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:alt" content={seoTitle} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:site_name" content="CampusSync" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image:secure_url" content={seoImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:image:alt" content={seoTitle} />
      <meta name="twitter:creator" content="@CampusSync" />
      <meta name="twitter:site" content="@CampusSync" />

      {/* General image meta */}
      <meta name="image" content={seoImage} />
      <meta itemProp="name" content={seoTitle} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={seoImage} />

      {/* Article */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>

      {/* Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />

      {/* Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
    </Helmet>
  );
}
