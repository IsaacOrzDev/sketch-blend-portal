import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import GoogleProvider from '@/components/google-provider';
import { Toaster } from '@/components/ui/toaster';
import FullScreenLoader from '@/components/full-screen-loader';
import PageHandler from '@/components/page-handler';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SKETCH BLEND',
  description:
    'A drawing and sharing website that is powered by micro-service architecture in Kubernetes with AWS, and multiple backend languages',
  openGraph: {
    title: 'SKETCH BLEND',
    siteName: 'SKETCH BLEND',
    description:
      'A drawing and sharing website that is powered by micro-service architecture in Kubernetes with AWS, and multiple backend languages',
    type: 'website',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/static/images/og.png`,
        width: 700,
        height: 485,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/static/favicon.png" sizes="32x32" />
        <link
          rel="icon"
          href="/icon.png?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/icon.png?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GoogleProvider>
            {children}
            <Toaster />
            <FullScreenLoader />
          </GoogleProvider>
        </ThemeProvider>
        <div className="paperOverlay select-none" />
        {/* <TouchHandler /> */}
        <PageHandler />
      </body>
    </html>
  );
}
