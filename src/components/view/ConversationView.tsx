'use client';
import SearchPanel from '../chat-window/SearchPanel';

const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col justify-center gap-2 border-r border-neutral-200 bg-[#0D0D0D] dark:border-neutral-700 dark:bg-[#0D0D0D]">
        <SearchPanel />
      </div>
    </div>
  );
};

export default Dashboard;

// bg-primary group dark:bg-primary z-50 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg p-4 transition duration-200 disabled:bg-gray-100 dark:disabled:bg-zinc-800

{
  /* <motion.svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2.5"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="h-6 w-6 text-black group-disabled:text-gray-300"
>
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <motion.path
    d="M5 12l14 0"
    initial={{
      strokeDasharray: '50%',
      strokeDashoffset: '50%',
    }}
    animate={{
      strokeDashoffset: value ? 0 : '50%',
    }}
    transition={{
      duration: 0.3,
      ease: 'linear',
    }}
  />
  <path d="M13 18l6 -6" />
  <path d="M13 6l6 6" />
</motion.svg>; */
}
