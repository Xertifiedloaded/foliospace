import { Html, Head, Main, NextScript } from "next/document";

export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        {/* Primary Meta Tags */}
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        
        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="title" content="FolioSpace - Digital Portfolio Builder" />
        <meta name="description" content="Elevate your career with a compelling digital portfolio that showcases your unique skills, achievements, and potential to global opportunities." />
        <meta name="author" content="Makinde Olaitan (Xertifiedloaded)" />
        <meta name="keywords" content="portfolio builder, digital portfolio, career development, professional showcase, resume builder, personal branding, online portfolio" />

        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logo.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logo.svg" />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://foliospace.org.ng" />
        <meta property="og:site_name" content="FolioSpace" />
        <meta property="og:title" content="FolioSpace - Digital Portfolio Builder" />
        <meta property="og:description" content="Elevate your career with a compelling digital portfolio that showcases your unique skills, achievements, and potential to global opportunities." />
        <meta property="og:image" content="/creatify-og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@foliospace" />
        <meta name="twitter:creator" content="@foliospace" />
        <meta name="twitter:title" content="FolioSpace - Digital Portfolio Builder" />
        <meta name="twitter:description" content="Elevate your career with a compelling digital portfolio that showcases your unique skills, achievements, and potential to global opportunities." />
        <meta name="twitter:image" content="/creatify-og-image.jpg" />
        <meta name="application-name" content="FolioSpace" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FolioSpace" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="canonical" href="https://foliospace.org.ng" />
        <link rel="alternate" hrefLang="en" href="https://foliospace.org.ng" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "FolioSpace",
              "url": "https://foliospace.org.ng",
              "description": "Digital Portfolio Builder",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://foliospace.org.ng/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:;" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <noscript>
          <div style={{
            padding: '20px',
            textAlign: 'center',
            backgroundColor: '#f44336',
            color: 'white'
          }}>
            You need to enable JavaScript to run this app.
          </div>
        </noscript>
      </body>
    </Html>
  );
}