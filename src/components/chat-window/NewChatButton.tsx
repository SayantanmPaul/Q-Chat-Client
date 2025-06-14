import React from 'react';
import { Button } from '../ui/button';
import { IconPlus } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

const NewChatButton = ({ open }: { open: boolean }) => {
  return (
    <Button
      className={cn(
        'flex flex-row items-center justify-center gap-2 rounded-full text-neutral-800',
      )}
    >
      <IconPlus stroke={2.4} size={16} />
      {open && (
        <p className={cn('font-jost font-semibold tracking-wider')}>
          Start new chat
        </p>
      )}
    </Button>
  );
};

export default NewChatButton;
