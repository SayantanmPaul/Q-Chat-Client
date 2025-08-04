import { Message, SearchInfo } from '@/types/message-type';
import { ResponseLoader } from '../ui/loader';
import { TextShimmer } from '../motion-primitives/text-shimmer';
import { BookOpenTextIcon, GlobeIcon } from 'lucide-react';
import { useQchatStore } from '@/store/qchatStore';
import { useEffect } from 'react';

const SearchStages = ({ searchInfo }: { searchInfo: SearchInfo | null }) => {
  if (!searchInfo || !searchInfo.stages || searchInfo.stages.length === 0)
    return null;

  return (
    <div className="relative mt-1 mb-3 pl-4">
      {/* Search Process UI */}
      <div className="flex flex-col space-y-4 text-sm text-gray-700">
        {/* Searching Stage */}
        {searchInfo.stages.includes('searching') && (
          <div className="relative">
            <span className="absolute top-0 -left-4 z-10 text-white">
              <GlobeIcon size={18} />
            </span>
            {/* Connecting line to next item if reading exists */}
            {searchInfo.stages.includes('reading') && (
              <div className="absolute top-4 -left-[8px] h-[calc(100%+0.2rem)] w-[1.8px] bg-gradient-to-b from-[#689B8A]/20 to-[#239BA7]"></div>
            )}

            <div className="flex flex-col">
              <span className="mb-2 ml-2 font-medium text-slate-300">
                Searching the web
              </span>

              {/* Search Query */}
              <div className="mt-1 flex flex-wrap gap-2 pl-2">
                <div className="inline-flex items-center rounded-xl border-2 px-3 py-1.5 text-xs font-medium dark:border-neutral-700/10 dark:bg-[#121212]">
                  <svg
                    className="mr-1.5 h-3 w-3 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  <TextShimmer>{searchInfo.query}</TextShimmer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reading Stage */}
        {searchInfo.stages.includes('reading') && (
          <div className="relative">
            {/* Green dot */}
            {/* <div className="absolute top-1 -left-3 z-10 h-2.5 w-2.5 rounded-full bg-teal-400 shadow-sm"></div> */}
            <span className="absolute top-1 -left-4 z-10 text-white">
              <BookOpenTextIcon size={18} />
            </span>
            <div className="flex flex-col">
              <span className="mb-2 ml-2 font-medium text-slate-300">
                Reading
              </span>
              {searchInfo.stages.includes('reading') && (
                <div className="absolute top-6 -left-[8px] h-[calc(80%+1rem)] w-[1.5px] bg-gradient-to-b from-[#239BA7]/50 to-[#00c684]"></div>
              )}

              {/* Search Results */}
              {searchInfo.urls && searchInfo.urls.length > 0 && (
                <div className="space-y-1 pl-2">
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(searchInfo.urls) ? (
                      searchInfo.urls.map((url, index) => (
                        <a
                          key={index}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-briColage max-w-40 truncate rounded-full border px-3 py-1.5 text-[10px] text-zinc-400 transition-all duration-300 ease-in-out hover:bg-gray-50 hover:underline lg:max-w-48 dark:border-neutral-700/10 dark:bg-[#2a2929]"
                        >
                          {typeof url === 'string'
                            ? url
                            : JSON.stringify(url).substring(0, 30)}
                        </a>
                      ))
                    ) : (
                      <div className="text-muted-foreground max-w-36 truncate rounded-full border px-3 py-1.5 text-xs transition-all duration-200 hover:bg-gray-50 lg:max-w-48 dark:border-neutral-700/10 dark:bg-[#2a2929]">
                        {typeof searchInfo.urls === 'string'
                          ? (searchInfo.urls as string).substring(0, 30)
                          : JSON.stringify(searchInfo.urls).substring(0, 30)}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Writing Stage */}
        {searchInfo.stages.includes('writing') && (
          <div className="relative">
            {/* Green dot with subtle glow effect */}
            <div className="absolute top-1 -left-3 z-10 h-2.5 w-2.5 rounded-full bg-teal-400 shadow-sm"></div>
            <span className="pl-2 font-medium text-slate-300">
              Writing answer
            </span>
          </div>
        )}

        {/* Error Message */}
        {searchInfo.stages.includes('error') && (
          <div className="relative">
            {/* Red dot over the vertical line */}
            <div className="absolute top-1 -left-3 z-10 h-2.5 w-2.5 rounded-full bg-red-400 shadow-sm"></div>
            <span className="font-medium">Search error</span>
            <div className="mt-1 pl-4 text-xs text-red-500">
              {searchInfo.error || 'An error occurred during search.'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const MessageArea = ({ messages }: { messages: Message[] }) => {
  const { setIsLoading } = useQchatStore();

  useEffect(() => {
    const anyLoading = messages.some(msg => msg.isLoading);
    setIsLoading(anyLoading);
  }, [messages, setIsLoading]);

  return (
    <>
      {messages.map(message => (
        <div
          key={message.id}
          className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-5`}
        >
          <div className="flex max-w-2xl flex-col">
            {/* Search Status Display - Now ABOVE the message */}
            {!message.isUser && message.searchInfo && (
              <SearchStages searchInfo={message.searchInfo} />
            )}

            {/* Message Content */}
            <div
              className={`flex w-fit items-start gap-2 rounded-lg border-2 px-5 py-3 font-medium ${
                message.isUser
                  ? 'dark:border-neutral-700/10 dark:bg-[#121212]'
                  : 'shadow-sm dark:border-neutral-700/10 dark:bg-[#121212]'
              }`}
            >
              {!message.content || message.isLoading ? (
                <ResponseLoader />
              ) : (
                <span>{message.content}</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MessageArea;
