import {
  BadgeEuroIcon,
  IndianRupeeIcon,
  LandmarkIcon,
  ShoppingCartIcon,
} from 'lucide-react';

const queries = [
  {
    question: 'How can I finance my dream car?',
    icon: <ShoppingCartIcon size={16} strokeWidth={1.6} className="h-4 w-4" />,
  },
  {
    question: 'Explain me about the benefit of mutual funds',
    icon: <LandmarkIcon size={16} strokeWidth={1.6} className="h-4 w-4" />,
  },
  {
    question:
      'How should I create and stick to a monthly budget with an irregular income?',
    icon: <BadgeEuroIcon size={16} strokeWidth={1.6} className="h-4 w-4" />,
  },
  {
    question: 'What is compound interest? Im completely new to finance',
    icon: <IndianRupeeIcon size={16} strokeWidth={1.6} className="h-4 w-4" />,
  },
];

const ExampleQueries = () => {
  return (
    <div className="flex w-auto flex-col gap-3">
      <h3 className="font-briColage text-sm leading-10 font-semibold text-[#CECECE]">
        Example of queries →
      </h3>
      {queries.map((queryObj, i) => {
        return (
          <div key={i} className="flex w-auto flex-col">
            <div className="inline-flex w-auto flex-col gap-1 overflow-ellipsis lg:w-max lg:gap-2">
              <div className="flex items-center gap-2 overflow-ellipsis hover:cursor-pointer">
                <span className="flex-shrink-0">{queryObj.icon}</span>
                <p className="font-briColage flex-1 truncate overflow-hidden text-sm font-medium text-[#CECECE] lg:text-base lg:font-semibold">
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
