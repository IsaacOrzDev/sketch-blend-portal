import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import GoogleProvider from '@/components/google-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SketchBlend',
  description: 'This is a demo application',
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
          </GoogleProvider>
        </ThemeProvider>
        <div className="paperOverlay" />
      </body>
    </html>
  );
}
