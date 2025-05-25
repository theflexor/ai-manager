import './_styles/global.css';

import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Providers } from './_provider';
import type React from 'react';
import { ThemeProvider } from '@/shared/providers/theme-provider';
import { Toaster } from '@/shared/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Subscription Manager',
  description: 'Manage your AI subscriptions and groups',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

