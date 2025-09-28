import Image from 'next/image';

export const Branding = ({ onClickFn }: { onClickFn: () => void }) => {
  return (
    <button
      onClick={onClickFn}
      className="flex cursor-pointer items-center-safe space-x-1 px-1 lg:space-x-2"
    >
      <Image
        src="/logo/Q.svg"
        alt="Qchat"
        width={32}
        height={32}
        draggable={false}
        className="h-6 w-6 object-cover lg:h-7 lg:w-7"
      />
      <p className="font-briColage text-2xl leading-10 font-medium lg:text-[28px] lg:font-semibold">
        chat
      </p>
    </button>
  );
};
