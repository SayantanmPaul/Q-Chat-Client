import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { IconChevronDown } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu';

const modelData = [
  {
    name: 'FinGPT-forecaster-7b',
    description: 'Fast, lightweight & realtime market data',
  },
  {
    name: 'InvestLM-mistral-AWQ',
    description: 'Powerful, large model for complex challenges',
  },
];

const ModelSelectionDropDown = () => {
  const [selectdModel, setSelectedModel] = React.useState(modelData[0]);
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
          {selectdModel.name}
          <IconChevronDown stroke={2} className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={20}
        className="flex w-sm flex-col gap-2 border border-zinc-700/60 p-2 text-gray-200"
      >
        <DropdownMenuArrow></DropdownMenuArrow>
        {modelData.map((model, _) => (
          <DropdownMenuItem
            key={_}
            onClick={() => setSelectedModel(model)}
            className="flex flex-col items-start gap-2"
          >
            <p className="font-briColage text-sm font-medium">{model.name}</p>
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
