import { TextShimmer } from '../motion-primitives/text-shimmer';

export const ResponseLoader = () => {
  return (
    <TextShimmer
      className="font-departureMono text-xs font-medium tracking-tighter"
      duration={1}
    >
      Generating response...
    </TextShimmer>
  );
};
