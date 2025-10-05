import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import {
  IconDots,
  IconEdit,
  IconPin,
  IconShare,
  IconTrash,
} from '@tabler/icons-react';
import React from 'react';
import { useQchatStore } from '@/store/qchatStore';

const demoHistroy = [
  'New Income tax impact analysis report for 2025',
  'Usd reserves and current impact on economy growth',
  'Investment with low risk and high return markets',
  'Travel insurance suggestions and tips for Europe trip',
];

const textLevels = [
  'text-[#D9D9D9]',
  'text-[#D9D9D9]/80',
  'text-[#D9D9D9]/60',
  'text-[#D9D9D9]/40',
];

const ChatHistoryList = () => {
  const { isUserAuthenticated } = useQchatStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        delay: 0.1,
        duration: 0.2,
        ease: 'anticipate',
      }}
      className={cn('flex flex-col gap-3')}
    >
      <h3 className="font-departureMono overflow-hidden px-2 text-sm leading-4 font-semibold whitespace-nowrap text-[#A1A1A1] uppercase">
        chat history
      </h3>
      <div
        className={`flex flex-col gap-1 py-2 ${!isUserAuthenticated && 'cursor-not-allowed rounded-2xl bg-[#404040]/40'}`}
      >
        {demoHistroy.map((title, index) => (
          <ChatHistoryItem
            key={index}
            title={title}
            textColorLevel={textLevels[index % textLevels.length]}
          />
        ))}
      </div>
      {!isUserAuthenticated && <AskUserToLogin />}
    </motion.div>
  );
};

export default ChatHistoryList;

const ChatHistoryItem = ({
  title,
  textColorLevel,
}: {
  title: string;
  textColorLevel?: string;
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { isUserAuthenticated } = useQchatStore();

  return (
    <div
      className={cn(
        `group flex w-full items-center justify-between rounded-md py-1 pr-2 pl-4 transition-colors ${isMenuOpen ? 'dark:bg-[#161616]' : 'bg-transparent'}`,
      )}
    >
      <Button
        disabled={!isUserAuthenticated}
        variant="ghost"
        className={cn(
          'font-briColage flex-1 truncate px-0 text-left font-normal hover:dark:bg-transparent',
          textColorLevel,
          !isUserAuthenticated && 'select-none',
        )}
      >
        <span className="block w-full truncate overflow-hidden whitespace-nowrap">
          {title}
        </span>
      </Button>
      <div
        className={cn(
          `${isMenuOpen ? 'visible' : 'invisible group-hover:visible'}`,
        )}
      >
        <ChatHistoryItemMenu
          open={isMenuOpen}
          setOpen={setIsMenuOpen}
          disabled={!isUserAuthenticated}
        />
      </div>
    </div>
  );
};

const ChatHistoryItemMenu = ({
  open,
  setOpen,
  disabled,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled?: boolean;
}) => {
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Button
          variant="ghost"
          size="icon"
          className="hover:dark:bg-transparent"
        >
          <IconDots stroke={2.8} className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={12}
        className="w-48 font-mono font-medium"
        align="start"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center gap-2">
            <IconPin className="h-3 w-3" stroke={1.5} />
            Pin
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <IconShare className="h-3 w-3" stroke={1.5} />
            Share
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <IconEdit className="h-3 w-3" stroke={1.5} />
            Rename
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center gap-2 text-red-500 hover:dark:text-red-500">
            <IconTrash
              className="h-3 w-3 text-red-500 hover:dark:text-red-500"
              stroke={1.5}
            />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AskUserToLogin = () => {
  const {
    isSignInDrawerOpen,
    setIsSignInDrawerOpen,
    isMobileView,
    setIsSidebarOpen,
  } = useQchatStore();

  return (
    <span className="font-briColage px-1 text-sm font-medium text-[#BAC0CC] lg:text-nowrap">
      To access the chat history please{' '}
      <br className="hidden md:block lg:block" />
      <button
        className="cursor-pointer text-[#7DDF77] underline"
        onClick={() => {
          if (isMobileView) setIsSidebarOpen(false);
          setIsSignInDrawerOpen(!isSignInDrawerOpen);
        }}
      >
        log in/ sign up
      </button>{' '}
      with our app.
    </span>
  );
};
