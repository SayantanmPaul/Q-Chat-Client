import Image from 'next/image';
import { TextShimmer } from '../motion-primitives/text-shimmer';

export const ResponseLoader = () => {
  return (
    <span className="flex items-center gap-3 select-none">
      <Image
        src="/logo/Q.svg"
        alt="Qchat"
        width={14}
        height={14}
        draggable={false}
        className="h-4.5 w-4"
      />
      <TextShimmer
        className="font-briColage text-sm font-semibold"
        duration={1}
      >
        Just a sec...
      </TextShimmer>
    </span>
  );
};
