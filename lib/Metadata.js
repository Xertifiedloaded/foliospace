
export function generateMetadata({ 
    title, 
    description, 
    image, 
    path = '',
    type = 'website'
  }) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://foliospace.org.ng'
    const fullUrl = `${baseUrl}${path}`
    const imageUrl = image || `${baseUrl}/default-og.jpg`
  
    return {
      metadataBase: new URL(baseUrl),
      title: {
        default: title,
        template: `%s | FolioSpace`
      },
      description,
      keywords: generateKeywords(title, description),
      openGraph: {
        title,
        description,
        url: fullUrl,
        siteName: 'FolioSpace',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        locale: 'en_US',
        type,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      alternates: {
        canonical: fullUrl,
      }
    }
  }
  
  function generateKeywords(title, description) {
    const combined = `${title} ${description}`.toLowerCase()
    const words = combined.split(' ')
    return [...new Set(words)].filter(word => word.length > 3)
  }