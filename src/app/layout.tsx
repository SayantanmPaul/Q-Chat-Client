import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { fontBriColage, fontDepartureMono, fontJost } from '../../assets/fonts';
import './globals.css';
import QueryProvider from '@/lib/QueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Head from 'next/head';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title:
    'Qchat(Beta): Your AI-Powered guide to Mutual Funds, FDs, and Tax Saving',
  description:
    'Try Qchat! Get clear, reliable answers on mutual funds, tax-saving, FDs, debt funds, and more',
  keywords: [
    'Qchat AI assistant',
    'Indian mutual funds guide',
    'best mutual funds India',
    'FD rates comparison India',
    'fixed deposit calculator',
    'tax saving investments India',
    'ELSS tax saving funds',
    'debt funds overview',
    'SIP investment tips',
    'NPS vs PPF comparison',
    ' tax deduction under 80C',
    'wealth management chatbot',
    'investment advice AI,',
    'Qchat for Gen Z investors',
  ],
  openGraph: {
    title:
      'Qchat(Beta): Your AI-Powered guide to Mutual Funds, FDs, and Tax Saving',
    description:
      'Try Qchat! Get clear, reliable answers on mutual funds, tax-saving, FDs, debt funds, and more',
    images: [
      'https://github-production-user-asset-6210df.s3.amazonaws.com/103353878/474225409-814c2cc2-6976-456d-aad2-663477e70d3e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250804%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250804T215248Z&X-Amz-Expires=300&X-Amz-Signature=38a9733f9e4e7edeb73c8c6b25a6dfc16be97c6c3438d086b6bdf3bf54b23754&X-Amz-SignedHeaders=host',
    ],
    url: 'https://chat.quantaa.club',
  },
  twitter: {
    title:
      'Qchat(Beta): Your AI-Powered guide to Mutual Funds, FDs, and Tax Saving',
    description:
      'Try Qchat! Get clear, reliable answers on mutual funds, tax-saving, FDs, debt funds, and more',
    images: [
      'https://github-production-user-asset-6210df.s3.amazonaws.com/103353878/474225409-814c2cc2-6976-456d-aad2-663477e70d3e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250804%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250804T215248Z&X-Amz-Expires=300&X-Amz-Signature=38a9733f9e4e7edeb73c8c6b25a6dfc16be97c6c3438d086b6bdf3bf54b23754&X-Amz-SignedHeaders=host',
    ],
    card: 'summary_large_image',
    creator: '@sayantanpaul',
    site: '@teamquantaa',
  },
  appleWebApp: {
    title: 'CVCompass: AI-Powered Resume Review for Hiring Teams & Job Seekers',
    startupImage: [
      'https://github-production-user-asset-6210df.s3.amazonaws.com/103353878/474225409-814c2cc2-6976-456d-aad2-663477e70d3e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250804%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250804T215248Z&X-Amz-Expires=300&X-Amz-Signature=38a9733f9e4e7edeb73c8c6b25a6dfc16be97c6c3438d086b6bdf3bf54b23754&X-Amz-SignedHeaders=host',
    ],
  },
  category: 'productivity',
  authors: [
    { name: 'Team Quantaa', url: 'https://www.quantaa.club' },
    { name: 'Sayantan Paul', url: 'https://www.sayantanpaul.com' },
    { name: 'Revanth Anupoju', url: 'https://revanupoju.framer.website' },
  ],
  creator: 'Team Quantaa',
  themeColor: '#181818',
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
            <Toaster />
            <ReactQueryDevtools initialIsOpen={false} />
          </body>
          <Analytics />
        </html>
      </QueryProvider>
    </>
  );
}
