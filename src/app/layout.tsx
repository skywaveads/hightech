import type { Metadata } from "next";
import "./globals.css";
import { Cairo } from "next/font/google";
import { companyInfo, companyDescription } from "@/data/company";
import Script from "next/script";
import ClientLayout from "@/components/layout/ClientLayout";
import { GA_TRACKING_ID, GTM_ID } from "@/lib/analytics";

const cairo = Cairo({ 
  subsets: ["latin", "arabic"],
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hightech-eg.net'),
  title: {
    default: `${companyInfo.companyNameAr} | أجهزة كتر بلوتر وماكينات القص احترافية`,
    template: `%s | ${companyInfo.companyNameAr}`,
  },
  description: companyDescription.medium,
  keywords: [
    ...companyInfo.mainKeywords,
    'كتر بلوتر مصر',
    'ماكينات القص السعودية',
    'أجهزة الطباعة الرقمية',
    'فينيل لاصق عالي الجودة',
    'طباعة التيشرتات',
    'لافتات إعلانية',
    'تقطيع الفينيل',
    'ماكينات الطباعة الحديثة',
    'معدات الإعلان',
    'طباعة احترافية'
  ],
  authors: [{ name: companyInfo.companyName }],
  creator: companyInfo.companyName,
  publisher: companyInfo.companyName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'ar-EG': '/',
      'ar-SA': '/',
      'ar': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    url: '/',
    title: `${companyInfo.companyNameAr} | أجهزة كتر بلوتر وماكينات القص احترافية`,
    description: companyDescription.medium,
    siteName: companyInfo.companyName,
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: companyInfo.companyNameAr,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${companyInfo.companyNameAr} | أجهزة كتر بلوتر وماكينات القص`,
    description: companyDescription.medium,
    images: ['/images/logo.png'],
    creator: '@hightechadv',
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'Business',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': companyInfo.companyNameAr,
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#2563eb',
    'theme-color': '#2563eb',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Prepare JSON-LD for Organization
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "Store"],
    "name": companyInfo.companyName,
    "alternateName": companyInfo.companyNameAr,
    "url": companyInfo.website,
    "logo": {
      "@type": "ImageObject",
      "url": `${companyInfo.website}/images/logo.png`,
      "width": 200,
      "height": 45
    },
    "image": `${companyInfo.website}/images/logo.png`,
    "description": companyDescription.medium,
    "foundingDate": companyInfo.foundedYear,
    "slogan": "أجهزة كتر بلوتر وماكينات القص الاحترافية",
    "knowsAbout": [
      "كتر بلوتر",
      "ماكينات القص",
      "طباعة الفينيل",
      "اللافتات الإعلانية",
      "طباعة التيشرتات",
      "معدات الطباعة الرقمية"
    ],
    "serviceArea": {
      "@type": "Place",
      "name": "مصر والسعودية وليبيا"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Egypt"
      },
      {
        "@type": "Country", 
        "name": "Saudi Arabia"
      },
      {
        "@type": "Country",
        "name": "Libya"
      }
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": companyInfo.phones[0],
        "contactType": "customer service",
        "availableLanguage": ["Arabic", "English"],
        "areaServed": ["EG", "SA", "LY"],
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      },
      {
        "@type": "ContactPoint",
        "telephone": companyInfo.phones[1] || companyInfo.phones[0],
        "contactType": "sales",
        "availableLanguage": ["Arabic", "English"]
      }
    ],
    "sameAs": [
      "https://www.facebook.com/hightechadv",
      "https://www.youtube.com/@Hightechadv"
    ],
    "address": companyInfo.branches.map(branch => ({
      "@type": "PostalAddress",
      "addressLocality": branch.city,
      "addressCountry": "Egypt",
      "streetAddress": branch.address,
      "telephone": branch.phone
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "كتالوج منتجات هاي تك",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "كتر بلوتر احترافي 60 سم",
            "category": "ماكينات القص"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Product",
            "name": "كتر بلوتر كبير الحجم 120 سم",
            "category": "ماكينات القص"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product", 
            "name": "فينيل لاصق عالي الجودة",
            "category": "مواد الطباعة"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // Website JSON-LD
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": companyInfo.companyNameAr,
    "url": companyInfo.website,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${companyInfo.website}/products?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": companyInfo.companyName,
      "logo": {
        "@type": "ImageObject",
        "url": `${companyInfo.website}/images/logo.png`
      }
    }
  };
  
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <Script 
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
        
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="ga-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'wait_for_update': 500,
              });
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
                anonymize_ip: true,
                allow_google_signals: false,
                allow_ad_personalization_signals: false,
              });
            `,
          }}
        />
        
        {/* Meta Pixel Code */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1227908358974591');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=1227908358974591&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className="font-sans">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
