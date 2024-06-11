import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { Syne } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/ui/theme-provider'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: 'Tofutracker - Homepage',
  description: 'Track your favorite movies and TV shows.',
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
          <Navbar />
          <div className="flex-1">{children}</div>
          <Toaster />
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
