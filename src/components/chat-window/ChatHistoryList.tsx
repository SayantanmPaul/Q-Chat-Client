import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import {
  IconPin,
  IconShare,
  IconEdit,
  IconTrash,
  IconDots,
} from '@tabler/icons-react';
import React from 'react';
import { Button } from '../ui/button';
import { motion } from 'motion/react';

const ChatHistoryList = () => {
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
      <h3 className="font-departureMono overflow-hidden px-2 text-xs font-semibold text-ellipsis whitespace-nowrap uppercase">
        chat history
      </h3>
      <div className="flex flex-col gap-1">
        {Array.from({ length: 3 }).map((_, index) => (
          <ChatHistoryItem key={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default ChatHistoryList;

const ChatHistoryItem = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div
      className={cn(
        `group flex w-full items-center justify-between gap-2 rounded-md py-1 pr-2 pl-4 transition-colors hover:dark:bg-[#161616] ${isMenuOpen ? 'dark:bg-[#161616]' : 'bg-transparent'}`,
      )}
    >
      <Button
        variant="ghost"
        className="font-jost flex-1 truncate px-0 text-left font-normal hover:dark:bg-transparent"
      >
        <span className="block w-full truncate overflow-hidden text-ellipsis whitespace-nowrap">
          Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quas, natus!
        </span>
      </Button>
      <div
        className={cn(
          `${isMenuOpen ? 'visible' : 'invisible group-hover:visible'}`,
        )}
      >
        <ChatHistoryItemMenu open={isMenuOpen} setOpen={setIsMenuOpen} />
      </div>
    </div>
  );
};

const ChatHistoryItemMenu = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:dark:bg-transparent"
        >
          <IconDots stroke={2} className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 font-mono font-medium" align="start">
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
