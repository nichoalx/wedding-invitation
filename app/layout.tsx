import type { Metadata } from 'next'
import { Geist, Cormorant_Garamond, Great_Vibes } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})
const _greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'BG Gold Gala Dinner',
  description: 'You are invited to an exclusive gala dinner hosted by BG Gold',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/bg-gold-logo.png', media: '(prefers-color-scheme: light)' },
      { url: '/bg-gold-logo.png', media: '(prefers-color-scheme: dark)' },
      { url: '/bg-gold-logo-refined.png', type: 'image/svg+xml' },
    ],
    apple: '/bg-gold-logo-refined.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${_cormorant.variable} ${_greatVibes.variable}`}>
      <head>
        {/* Preload intro assets so they're ready before JS hydrates */}
        <link rel="preload" href="/gold-feather.webp" as="image" />
        <link rel="preload" href="/bg-gold-logo-refined.png" as="image" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
