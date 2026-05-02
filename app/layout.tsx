import type { Metadata } from 'next'
import { Geist, Geist_Mono, Cormorant_Garamond, Pinyon_Script } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _cormorantGaramond = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", weight: ["400", "600", "700"] });
const _pinyonScript = Pinyon_Script({ subsets: ["latin"], weight: "400", variable: "--font-display" });

export const metadata: Metadata = {
  title: 'Golden Legacy Gala Dinner - Banjarmasin',
  description: 'You are invited to the Golden Legacy Gala Dinner - A journey that brings us closer on May 19, 2026 at Galaxy Hotel, Banjarmasin',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/bg-gold-logo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/bg-gold-logo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/bg-gold-logo-refined.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/bg-gold-logo-refined.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_cormorantGaramond.variable} ${_pinyonScript.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
