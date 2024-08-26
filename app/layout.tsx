import Footer from '@/app/components/Footer'
import Navbar from '@/app/components/Navbar'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Inter as FontSans, Syne } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'TofuTracker',
    template: '%s - TofuTracker',
  },
  description: 'Track your favorite Movies, TV Shows, and Anime.',
  twitter: {
    card: 'summary_large_image',
  },
}

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const syne_init = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: '600',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen flex-col font-sans antialiased',
          fontSans.variable,
          syne_init.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color="#7C3AED" showSpinner={false} />
          <Navbar />
          <div className="flex-1">{children}</div>
          <Toaster />
          <Footer />
        </ThemeProvider>
        <Analytics debug={false} mode="development" />
      </body>
    </html>
  )
}
