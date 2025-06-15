import React from 'react';
import { PlaceholdersAndVanishTextarea } from '../ui/PlaceholdersAndVanishTextarea';
import Image from 'next/image';

const SearchPanel = () => {
  const placeholders = [
    'What are the rules of Fight Club?',
    'You do not talk about Fight Club.',
    'If someone says "Stop" or goes limp, taps out, the fight is over.',
    'Only two guys to a fight.',
    'One fight at a time.',
    'No shirts, no shoes.',
    'Fights will go on as long as they have to.',
    'If this is your first time at Fight Club, you have to fight.',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitted');
  };

  return (
    <div className="flex min-h-[120px] flex-col gap-8 p-4">
      <Header />
      <PlaceholdersAndVanishTextarea
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default SearchPanel;

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 select-none lg:gap-5">
      <Logo />
      <h2 className="font-briColage text-sm font-medium lg:text-lg lg:font-semibold dark:text-[#EFEFEF]">
        Qurious about finance? Start here!
      </h2>
    </div>
  );
};

const Logo = () => {
  return (
    <span className="relative z-20 flex items-center space-x-2">
      <Image
        src="../logo/Q.svg"
        className="h-10 w-10 lg:h-12 lg:w-12"
        width={60}
        height={60}
        alt="Q"
        draggable={false}
      />
      <span className="font-briColage text-3xl font-medium whitespace-pre text-black lg:text-4xl dark:text-[#EFEFEF]">
        chat
      </span>
    </span>
  );
};
