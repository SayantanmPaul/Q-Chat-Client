import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useQchatStore } from '@/store/qchatStore';
import { IconChevronDown } from '@tabler/icons-react';
import React, { useEffect } from 'react';

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
        <button
          disabled={isLoading}
          className={cn(
            `font-briColage gap-2 rounded-2xl border border-zinc-900/60 bg-[#404040]/40 text-xs duration-300 ease-in-out select-none ${open && 'dark:bg-zinc-900/80'} ${!isLoading && !modelData ? 'cursor-not-allowed text-[#A1A1A1]' : 'cursor-pointer text-gray-300'} flex items-center px-4 py-2 leading-7 outline-0`,
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
        </button>
      </DropdownMenuTrigger>
      {modelData && modelData.length > 0 && (
        <DropdownMenuContent
          align="start"
          sideOffset={12}
          className="flex w-auto max-w-sm flex-col gap-2 rounded-3xl border border-zinc-900/80 bg-[#404040]/40 p-3 text-gray-200 backdrop-blur-sm md:w-auto lg:w-auto"
        >
          {modelData.map((model, _) => (
            <DropdownMenuItem
              disabled={isLoading}
              key={_}
              onClick={() => onModelChange(model)}
              className={cn(
                `flex flex-col items-start gap-1 rounded-2xl px-3 py-2 hover:dark:bg-[#2B2B2B]/40 ${
                  selectedModel?.name === model.name
                    ? 'bg-[#2B2B2B]/40 text-white dark:text-white'
                    : ''
                }`,
              )}
            >
              <span className="flex items-center gap-3">
                <p className="font-briColage text-sm font-medium">
                  {model.name}
                </p>
                {selectedModel?.name === model.name && <ActivePing />}
              </span>
              <p className="font-briColage text-xs font-medium text-[#A1A1A1]">
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
