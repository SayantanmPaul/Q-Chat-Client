import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface LanguageOption {
  language: string;
  flag: string;
}

interface LanguageSelectorProps {
  selectedLanguage: LanguageOption;
  availableLanguages?: LanguageOption[];
  onLanguageChange?: (language: LanguageOption) => void;
}

const LanguageSelector = ({
  selectedLanguage,
  availableLanguages = [],
  onLanguageChange,
}: LanguageSelectorProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="flex h-auto w-auto gap-[10px] rounded-full bg-[#404040]/40 p-1.5 hover:bg-[#2B2B2B]/60 lg:px-3 lg:py-2">
          <Image
            src={selectedLanguage.flag}
            alt={selectedLanguage.language}
            width={28}
            height={28}
            className="h-7 w-7 rounded-full object-cover"
          />
          <p className="font-briColage hidden text-sm leading-5 font-semibold text-[#BAC0CC] lg:block">
            {selectedLanguage.language}
          </p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="flex w-auto max-w-xs flex-col gap-2 rounded-3xl border border-zinc-900/40 bg-[#404040]/40 p-3 text-gray-200 backdrop-blur-sm"
      >
        {availableLanguages && availableLanguages.length > 0 ? (
          availableLanguages.map(option => (
            <DropdownMenuItem
              key={option.language}
              onClick={() => {
                if (onLanguageChange) {
                  onLanguageChange(option);
                }
              }}
              className={cn(
                `flex flex-col items-start gap-1 rounded-2xl px-3 py-2 hover:dark:bg-[#2B2B2B]/40 ${
                  option.language === selectedLanguage.language
                    ? 'bg-[#2B2B2B]/40 text-white dark:text-white'
                    : ''
                }`,
              )}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={option.flag}
                  alt={option.language}
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-full object-cover"
                />
                <p className="font-briColage text-sm leading-5 font-semibold text-[#BAC0CC]">
                  {option.language}
                </p>
              </div>
            </DropdownMenuItem>
          ))
        ) : (
          <span className="font-briColage px-2 text-sm leading-5 font-medium text-[#BAC0CC]">
            Coming in next release 🔥
          </span>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
