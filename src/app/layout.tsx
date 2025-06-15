import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { fontBriColage, fontDepartureMono, fontJost } from '../../assets/fonts';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'Q-Chat',
  description: 'Quantaa financial support partner',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          `dark antialiased ${fontBriColage.variable} ${fontDepartureMono.variable} ${fontJost.variable}`,
        )}
      >
        {children}
      </body>
      <Analytics />
    </html>
  );
}
