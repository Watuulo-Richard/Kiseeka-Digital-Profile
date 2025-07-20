import { ThemeProvider } from '@/components/frontend/theme-provider';
import { Space_Grotesk } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kiseka Pius | Senior Auditor',
  description:
    'Portfolio of Kiseka Pius, a Senior Auditor at PKF Uganda, specializing in financial auditing, compliance, and risk management.',
  keywords: [
    'Kiseka Pius',
    'Senior Auditor',
    'Financial Auditor',
    'PKF Uganda',
    'Auditing',
    'Compliance',
    'Risk Management',
  ],
  authors: [{ name: 'kiseka Pius' }],
  creator: 'kiseka Pius',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kisekapius.com',
    title: 'kiseka Pius | Senior Auditor',
    description:
      'Portfolio of kiseka Pius, a Senior Auditor at PKF Uganda, specializing in financial auditing, compliance, and risk management.',
    siteName: 'kiseka Pius Portfolio',
    images: [
      {
        url: '/favicon.png',
        width: 512,
        height: 512,
        alt: 'kiseka Pius Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'kiseka Pius | Senior Auditor',
    description:
      'Portfolio of kiseka Pius, a Senior Auditor at PKF Uganda, specializing in financial auditing, compliance, and risk management.',
    creator: '@kisekapius',
    images: ['/favicon.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('http://localhost:3000'),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} antialiased bg-[#fbebe5] dark:bg-black`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
