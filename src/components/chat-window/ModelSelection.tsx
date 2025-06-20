import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { IconChevronDown } from '@tabler/icons-react';
import React from 'react';
import { Button } from '../ui/button';

const ModelSelectionDropDown = ({
  modelData,
  isLoading = false,
  selectedModel,
  onModelChange,
}: {
  modelData: { name: string; description: string }[];
  isLoading?: boolean;
  selectedModel: { name: string; description: string } | null;
  onModelChange: (model: { name: string; description: string }) => void;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            `font-departureMono cursor-pointer gap-2 rounded-lg border border-zinc-700/60 text-xs text-gray-300 duration-300 ease-in-out select-none hover:dark:bg-zinc-900/80 ${open && 'dark:bg-zinc-900/80'}`,
          )}
        >
          {isLoading ? (
            <Skeleton className="h-4 w-24" />
          ) : (
            <span className="font-briColage text-sm font-medium">
              {selectedModel?.name}
            </span>
          )}
          <IconChevronDown stroke={2} className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={20}
        className="flex w-80 max-w-sm flex-col gap-2 rounded-xl border border-neutral-700 p-2 text-gray-200 backdrop-blur-md md:w-auto lg:w-auto dark:bg-neutral-900/60"
      >
        {modelData &&
          modelData.map((model, _) => (
            <DropdownMenuItem
              disabled={isLoading}
              key={_}
              onClick={() => onModelChange(model)}
              className={cn(
                `flex flex-col items-start gap-2 rounded-lg hover:dark:bg-neutral-900/60 ${
                  selectedModel?.name === model.name && 'dark:bg-neutral-900/80'
                }`,
              )}
            >
              <span className="flex items-center gap-2">
                <p className="font-briColage text-sm font-medium">
                  {model.name}
                </p>
                {selectedModel?.name === model.name && <ActivePing />}
              </span>
              <p className="font-departureMono text-xs font-medium text-gray-400">
                {model.description}
              </p>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModelSelectionDropDown;

const ActivePing = () => {
  return (
    <span className="relative flex size-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
    </span>
  );
};
