import './globals.css'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import '@/styles/globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '@/context/AuthContext'
import MainLayout from '@/components/layout/MainLayout'

const fontSans = FontSans({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'SmartCar - Închirieri Auto Moderne',
  description: 'Închiriază mașina perfectă pentru tine cu SmartCar. Proces rapid, prețuri competitive și o flotă modernă.',
  keywords: 'închiriere mașini, vânzare mașini, automobile, rent a car, buy car, SmartCar',
  authors: [{ name: 'SmartCar Team' }],
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: 'https://smartcar.ro',
    title: 'SmartCar - Închiriere și Vânzare Mașini',
    description: 'Platformă profesională pentru închirierea și vânzarea de automobile. Găsește mașina perfectă pentru nevoile tale.',
    siteName: 'SmartCar',
  },
}

export const viewport = {
  themeColor: '#3563E9',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <MainLayout>{children}</MainLayout>
            <Toaster position="top-center" />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
