import React from 'react';
import { PlaceholdersAndVanishTextarea } from '../ui/PlaceholdersAndVanishTextarea';

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
    <div className="min-h-[120px] p-4">
      <PlaceholdersAndVanishTextarea
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default SearchPanel;
