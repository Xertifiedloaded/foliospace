import { Html, Head, Main, NextScript } from "next/document";

export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        {/* Global Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <link rel="icon" href="/favicon.ico" />

        {/* Default Meta Tags */}
        <meta name="title" content="Creatify - Digital Portfolio Builder" />
        <meta name="description" content="Elevate your career with a compelling digital portfolio that showcases your unique skills, achievements, and potential to global opportunities." />
        <meta name="author" content="Creatify Team" />

        {/* Open Graph Meta Tags (used by social media for sharing) */}
        <meta property="og:title" content="Creatify - Digital Portfolio Builder" />
        <meta property="og:description" content="Elevate your career with a compelling digital portfolio that showcases your unique skills, achievements, and potential to global opportunities." />
        <meta property="og:image" content="/creatify-og-image.jpg" />
        {/* <meta property="og:url" content="https://www.creatifyapp.com" /> */}

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:title" content="Creatify - Digital Portfolio Builder" />
        <meta name="twitter:description" content="Elevate your career with a compelling digital portfolio that showcases your unique skills, achievements, and potential to global opportunities." />
        <meta name="twitter:image" content="/creatify-og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
