import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"], 
  weight: ['400', '500', '600', '700'], 
  variable: '--font-mono',
  display: 'swap'
});

// const geistMono = DM_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
//   weight: ['400'], // Add the required weight(s) here
// });

export const metadata: Metadata = {
  title: 'Kiseeka Pius | Senior Auditor',
  description:
    'Portfolio of Kiseeka Pius, a Senior Auditor specializing in JavaScript, TypeScript, React.js, Node.js, Laravel, and AWS.',
  keywords: [
    'Kiseeka Pius',
    'Software Engineer',
    'Full Stack Developer',
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'AWS',
  ],
  authors: [{ name: 'Kiseeka Pius' }],
  creator: 'Kiseeka Pius',
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
    url: 'https://nihalmaskey.com',
    title: 'Kiseeka Pius | Senior Software Engineer',
    description:
      'Portfolio of Kiseeka Pius, a Senior Software Engineer specializing in JavaScript, TypeScript, React.js, Node.js, Laravel, and AWS.',
    siteName: 'Kiseeka Pius Portfolio',
    images: [
      {
        url: '/favicon.png',
        width: 512,
        height: 512,
        alt: 'Kiseeka Pius Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kiseeka Pius | Senior Software Engineer',
    description:
      'Portfolio of Kiseeka Pius, a Senior Software Engineer specializing in JavaScript, TypeScript, React.js, Node.js, Laravel, and AWS.',
    creator: '@kiseekapius',
    images: ['/favicon.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('http://localhost:3000'), // Add this to fix the warning
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
