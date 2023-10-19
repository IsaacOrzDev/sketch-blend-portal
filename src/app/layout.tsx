import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import GoogleProvider from '@/components/google-provider';
import { Toaster } from '@/components/ui/toaster';
import FullScreenLoader from '@/components/full-screen-loader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SKETCH BLEND',
  description:
    'A drawing and sharing portal that is powered by micro-service architecture in Kubernetes with AWS, and multiple backend lanaguages linked with Grpc',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
      </body>
    </html>
  );
}
