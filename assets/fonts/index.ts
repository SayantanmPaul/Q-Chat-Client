import localFont from 'next/font/local';

const fontBriColage = localFont({
  src: [
    {
      path: './BricolageGrotesque-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './BricolageGrotesque-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './BricolageGrotesque-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-briColage',
  display: 'swap',
});

const fontDepartureMono = localFont({
  src: './DepartureMono-Regular.woff2',
  variable: '--font-departureMono',
});

const fontJost = localFont({
  src: './Jost-400-Book.woff2',
  variable: '--font-jost',
});

export { fontBriColage, fontDepartureMono, fontJost };
