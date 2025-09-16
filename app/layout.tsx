import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "ĐÈN SÀI GÒN - Đèn LED Chính Hãng, Giá Tốt Nhất",
  description:
    "Chuyên cung cấp đèn LED âm trần, đèn chùm, đèn trang trí chính hãng. Bảo hành 2 năm, giao hàng toàn quốc. Hotline: 0853892898",
  keywords: "đèn LED, đèn âm trần, đèn chùm, đèn trang trí, đèn LED Sài Gòn, đèn chiếu sáng, quạt trần",
  authors: [{ name: "ĐÈN SÀI GÒN" }],
  creator: "ĐÈN SÀI GÒN",
  publisher: "ĐÈN SÀI GÒN",
  robots: "index, follow",
  alternates: {
    canonical: "https://densaigon.com",
  },
  openGraph: {
    title: "ĐÈN SÀI GÒN - Đèn LED Chính Hãng",
    description: "Chuyên cung cấp đèn LED âm trần, đèn chùm, đèn trang trí chính hãng",
    type: "website",
    locale: "vi_VN",
    url: "https://densaigon.com",
    siteName: "ĐÈN SÀI GÒN",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ĐÈN SÀI GÒN - Đèn LED Chính Hãng",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ĐÈN SÀI GÒN - Đèn LED Chính Hãng",
    description: "Chuyên cung cấp đèn LED âm trần, đèn chùm, đèn trang trí chính hãng",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  other: {
    "facebook-domain-verification": "your-facebook-domain-verification",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "ĐÈN SÀI GÒN",
              description: "Chuyên cung cấp đèn LED âm trần, đèn chùm, đèn trang trí chính hãng",
              url: "https://densaigon.com",
              telephone: "+84853892898",
              address: {
                "@type": "PostalAddress",
                addressLocality: "TP. Hồ Chí Minh",
                addressCountry: "VN",
              },
              openingHours: "Mo-Su 08:00-20:00",
              priceRange: "$$",
              image: "https://densaigon.com/og-image.jpg",
              sameAs: ["https://www.facebook.com/densaigon", "https://zalo.me/densaigon"],
            }),
          }}
        />
      </head>
      <body>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
