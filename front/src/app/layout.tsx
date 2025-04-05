import './_styles/global.css';

import { Providers } from './_provider';
import { ThemeProvider } from 'next-themes';

export const metadata = {
  title: 'Личный кабинет',
  description: 'Управление личным кабинетом и кошельком',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          <ThemeProvider defaultTheme="light" storageKey="wallet-theme">
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

