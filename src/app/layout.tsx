import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { fontBriColage, fontDepartureMono, fontJost } from '../../assets/fonts';
import './globals.css';
import QueryProvider from '@/lib/QueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Head from 'next/head';

export const metadata: Metadata = {
  title:
    'Qchat: Your AI Assistant for Indian Mutual Funds, FDs, and Tax Saving',
  description:
    'Get clear, reliable answers on mutual funds, tax-saving, FDs, debt funds, and more',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        <link
          rel="preload"
          as="image"
          href="/images/Glow.svg"
          type="image/svg+xml"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/logo/Q.svg"
          type="image/svg+xml"
          fetchPriority="high"
        />
      </Head>
      <QueryProvider>
        <html lang="en" suppressHydrationWarning={true}>
          <body
            className={cn(
              `dark antialiased ${fontBriColage.variable} ${fontDepartureMono.variable} ${fontJost.variable}`,
            )}
          >
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </body>
          <Analytics />
        </html>
      </QueryProvider>
    </>
  );
}
