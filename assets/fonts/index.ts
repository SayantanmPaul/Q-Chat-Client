import localFont from 'next/font/local';

const fontBriColage = localFont({
  src: './BricolageGrotesque-SemiBold.woff2',
  variable: '--font-briColage',
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
