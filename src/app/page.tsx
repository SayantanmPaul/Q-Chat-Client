'use client';
import ChatHistoryList from '@/components/chat-window/ChatHistoryList';
import NewChatButton from '@/components/chat-window/NewChatButton';
import { Sidebar, SidebarBody } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';
import { IconLayoutSidebarRightExpand } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={cn(
        'mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800',
        'h-screen', // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col gap-8 overflow-x-hidden overflow-y-auto">
            <div className="flex h-min flex-col gap-8 px-2">
              <div className="flex items-center justify-between">
                {open ? <Logo /> : <LogoIcon open={open} setOpen={setOpen} />}
                {open && <CloseSidebarButton setOpen={setOpen} />}
              </div>
              <NewChatButton open={open} />
            </div>
            <AnimatePresence>{open && <ChatHistoryList />}</AnimatePresence>
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal"
    >
      <Image
        src="../logo/Q.svg"
        className="h-9 w-9"
        width={60}
        height={60}
        alt="Q"
        draggable={false}
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-briColage text-3xl font-medium whitespace-pre text-black dark:text-white"
      >
        chat
      </motion.span>
    </a>
  );
};

const LogoIcon = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen?: (open: boolean) => void;
}) => {
  return (
    <button
      onClick={() => setOpen?.(!open)}
      className="relative z-20 flex cursor-pointer items-center space-x-2 py-1"
    >
      <Image
        src="../logo/Q.svg"
        className="h-9 w-9"
        width={60}
        height={60}
        alt="Q"
        draggable={false}
      />
    </button>
  );
};

const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-2 border-r border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="flex gap-2">
          {[...new Array(4)].map((i, idx) => (
            <div
              key={'first-array-demo-1' + idx}
              className="h-20 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
            ></div>
          ))}
        </div>
        <div className="flex flex-1 gap-2">
          {[...new Array(2)].map((i, idx) => (
            <div
              key={'second-array-demo-1' + idx}
              className="h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CloseSidebarButton = ({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Button
      onClick={() => setOpen(!open)}
      variant="ghost"
      className="hover:dark:bg-popover z-10 w-fit"
    >
      <IconLayoutSidebarRightExpand stroke={2} size={25} />
    </Button>
  );
};
