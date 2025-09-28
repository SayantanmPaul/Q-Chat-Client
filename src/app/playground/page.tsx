'use client';

import BrandButton from '@/components/ui/BrandButton';
import { PlusIcon } from 'lucide-react';

const page = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <BrandButton
        text="Start new chat"
        width={64}
        height={40}
        shortcutKey="⌘ + N"
        icon={<PlusIcon size={16} strokeWidth={2.8} />}
      />
    </div>
  );
};

export default page;
