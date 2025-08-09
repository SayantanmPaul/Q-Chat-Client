import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { IconChevronDown } from '@tabler/icons-react';
import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { useQchatStore } from '@/store/qchatStore';

const ModelSelectionDropDown = ({
  modelData,
  isLoading = false,
  selectedModel,
  onModelChange,
}: {
  modelData?: { name: string; description?: string }[] | null;
  isLoading?: boolean;
  selectedModel: { name: string; description?: string } | null;
  onModelChange: (model: { name: string; description?: string }) => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const { setSelectedModel } = useQchatStore();

  useEffect(() => {
    if (modelData) {
      setSelectedModel(modelData[0]);
    }
  }, [modelData, setSelectedModel]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          disabled={isLoading}
          className={cn(
            `font-departureMono gap-2 rounded-lg border border-neutral-700/40 text-xs duration-300 ease-in-out select-none hover:dark:bg-zinc-900/80 ${open && 'dark:bg-zinc-900/80'} ${!isLoading && !modelData ? 'cursor-not-allowed text-gray-500 hover:text-gray-500' : 'cursor-pointer text-gray-300'}`,
          )}
        >
          {isLoading ? (
            <Skeleton className="h-4 w-24" />
          ) : selectedModel ? (
            <>
              <span className="font-briColage text-sm font-medium">
                {selectedModel.name}
              </span>
              <IconChevronDown stroke={2} className="h-4 w-4" />
            </>
          ) : (
            <>
              <span className="font-briColage w-32 text-start text-sm font-medium">
                Select a model
              </span>
              <IconChevronDown stroke={2} className="h-4 w-4" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      {modelData && modelData.length > 0 && (
        <DropdownMenuContent
          align="start"
          sideOffset={20}
          className="flex w-80 max-w-sm flex-col gap-2 rounded-lg border border-neutral-700/40 p-2 text-gray-200 backdrop-blur-sm md:w-auto lg:w-auto dark:bg-neutral-900/60"
        >
          {modelData.map((model, _) => (
            <DropdownMenuItem
              disabled={isLoading}
              key={_}
              onClick={() => onModelChange(model)}
              className={cn(
                `hover:dark:bg-primary/5 flex flex-col items-start gap-2 rounded-sm ${
                  selectedModel?.name === model.name
                    ? 'dark:bg-primary/5 bg-blue-800 text-white dark:text-white'
                    : ''
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
      )}
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
