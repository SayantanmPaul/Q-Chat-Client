'use client';
import SearchPanel from '../chat-window/SearchPanel';

const Dashboard = () => {
  return (
    <div className="relative flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col justify-center gap-2 border-r border-neutral-200 bg-[#0D0D0D] dark:border-neutral-700 dark:bg-[#0D0D0D]">
        <SearchPanel />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <Disclaimer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const Disclaimer = () => {
  return (
    <p className="font-departureMono w-full text-xs font-medium tracking-tighter text-nowrap text-neutral-400">
      AI-generated, for reference only.
    </p>
  );
};
