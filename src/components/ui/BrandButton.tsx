import React from 'react';
import { Button } from './button';
import { AnimatePresence, motion } from 'motion/react';
import { useQchatStore } from '@/store/qchatStore';

interface BrandButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: number;
  height?: number;
  text: string;
  category?: 'primary' | 'secondary';
  shortcutKey?: string;
  position?: 'left' | 'right' | 'center';
  boldText?: boolean;
  partOfSidebar?: boolean;
  icon?: React.JSX.Element | React.ReactNode;
}

const BrandButton = ({
  width,
  height = 10,
  text,
  category = 'primary',
  shortcutKey,
  position = 'center',
  icon,
  boldText,
  partOfSidebar,
  ...props
}: BrandButtonProps) => {
  const { isSidebarOpen } = useQchatStore();

  const heightClass = height ? `h-${height}` : 'h-fit';
  const widthClass = width ? `w-[${width}px]` : 'w-full';

  return (
    <Button
      className={` ${heightClass} ${widthClass} font-briColage bg-gradient-to-br ${category === 'primary' ? 'bg-gradient-to-br from-[#3DDBB0] to-[#89E06C] text-[#262626]' : 'bg-[#404040]/40 text-[#8A8A8A] hover:bg-[#404040]/80'} ${position === 'left' ? 'justify-start' : position === 'right' ? 'justify-end' : ''} flex cursor-pointer items-center rounded-3xl px-0 font-semibold transition-all hover:opacity-90`}
      {...props}
    >
      {shortcutKey ? (
        <div
          className={`flex w-full items-center justify-between gap-2 pr-[10px] pl-3`}
        >
          <span className={`flex items-center gap-2`}>
            {icon}
            <AnimatePresence mode="sync">
              {partOfSidebar && isSidebarOpen && (
                <motion.p
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    delay: 0.1,
                    duration: 0.3,
                    ease: 'anticipate',
                  }}
                  className={`text-sm leading-10 ${boldText ? 'font-semibold' : 'font-medium lg:font-semibold'}`}
                >
                  {text}
                </motion.p>
              )}
            </AnimatePresence>
          </span>
          {isSidebarOpen && (
            <span className="font-briColage flex items-center justify-center rounded-full bg-[#787878]/20 px-2 py-[2px] text-sm leading-5 font-medium text-[#262626]/50">
              {shortcutKey}
            </span>
          )}
        </div>
      ) : (
        <span
          className={`flex items-center gap-3 ${isSidebarOpen && icon ? 'pl-3' : !isSidebarOpen && icon ? 'pl-3' : 'pl-0'}`}
        >
          {icon}
          {partOfSidebar && isSidebarOpen ? (
            <AnimatePresence mode="sync">
              <motion.p
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.3,
                  ease: 'anticipate',
                }}
                className={`text-sm leading-10 ${boldText ? 'font-semibold' : 'font-medium'} ${isSidebarOpen ? 'visible' : 'invisible'}`}
              >
                {text}
              </motion.p>
            </AnimatePresence>
          ) : (
            <p
              className={`text-xs leading-10 lg:text-sm ${boldText ? 'font-semibold' : 'font-medium'} font-briColage`}
            >
              {text}
            </p>
          )}
        </span>
      )}
    </Button>
  );
};

export default BrandButton;
