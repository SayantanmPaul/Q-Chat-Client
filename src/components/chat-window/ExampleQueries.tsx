import {
  BadgeEuroIcon,
  IndianRupeeIcon,
  LandmarkIcon,
  ShoppingCartIcon,
} from 'lucide-react';

const queries = [
  {
    question: 'How can I finance my dream car?',
    icon: (
      <ShoppingCartIcon
        size={16}
        strokeWidth={1.6}
        className="h-3 w-3 lg:h-4 lg:w-4"
      />
    ),
  },
  {
    question: 'Explain me about the benefit of mutual funds',
    icon: (
      <LandmarkIcon
        size={16}
        strokeWidth={1.6}
        className="h-3 w-3 lg:h-4 lg:w-4"
      />
    ),
  },
  {
    question:
      'How should I create and stick to a monthly budget with an irregular income?',
    icon: (
      <BadgeEuroIcon
        size={16}
        strokeWidth={1.6}
        className="h-3 w-3 lg:h-4 lg:w-4"
      />
    ),
  },
  {
    question: 'What is compound interest? Im completely new to finance',
    icon: (
      <IndianRupeeIcon
        size={16}
        strokeWidth={1.6}
        className="h-3 w-3 lg:h-4 lg:w-4"
      />
    ),
  },
];

interface ExampleQueriesProps {
  onSelect: (query: string) => void; // NEW
}

const ExampleQueries = ({ onSelect }: ExampleQueriesProps) => {
  return (
    <div className="flex w-auto flex-col gap-3">
      <h3 className="font-briColage text-xs leading-5 font-bold text-[#CECECE] lg:text-sm lg:leading-10">
        Example of queries →
      </h3>
      {queries.map((queryObj, i) => {
        return (
          <div
            key={i}
            className="w-full max-w-sm overflow-hidden lg:max-w-full"
          >
            <div className="inline-flex w-max flex-col gap-1 lg:gap-2">
              <div
                className="flex items-center gap-2 overflow-ellipsis hover:cursor-pointer"
                onClick={() => onSelect(queryObj.question)}
                role="button"
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ')
                    onSelect(queryObj.question);
                }}
              >
                <span className="flex-shrink-0">{queryObj.icon}</span>
                <p className="font-briColage line-clamp-1 flex-1 truncate overflow-hidden text-sm font-medium text-[#CECECE] lg:text-base lg:font-semibold">
                  {queryObj.question}
                </p>
              </div>
              <div className="w-full border-b-[1px] border-dashed border-[#737373]" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExampleQueries;
