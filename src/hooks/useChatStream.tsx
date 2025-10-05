import { Message, SearchInfo } from '@/types/message-type';
import { parseTokenPerMin } from '@/utils/helper';
import { useState } from 'react';
import { toast } from 'sonner';

interface StreamOptions {
  userInput: string;
  checkpointId: string | null;
  aiResponseId: number;
  modelName: string;
  updateMessage: (updater: (prev: Message[]) => Message[]) => void;
  setCheckpointId: (id: string) => void;
}

export const useChatStream = ({ baseURL }: { baseURL: string }) => {
  const [streaming, setStreaming] = useState(false);

  const startStream = ({
    userInput,
    checkpointId,
    aiResponseId,
    modelName,
    updateMessage,
    setCheckpointId,
  }: StreamOptions) => {
    let streamedContent = '';
    let searchData: SearchInfo | null = null;
    let hasReceivedContent = false;

    let url = `${baseURL}?message=${encodeURIComponent(userInput)}`;
    if (checkpointId) {
      url += `&checkpoint_id=${encodeURIComponent(checkpointId)}`;
    }

    url += `&model_name=${encodeURIComponent(modelName)}`;

    const eventSource = new EventSource(url);
    setStreaming(true);

    eventSource.onmessage = event => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'checkpoint') {
          setCheckpointId(data.checkpoint_id);
        }

        // Handle search data
        else if (data.type === 'content') {
          streamedContent += data.content;
          hasReceivedContent = true;

          updateMessage(prev =>
            prev.map(msg =>
              msg.id === aiResponseId
                ? {
                    ...msg,
                    content: streamedContent,
                    isLoading: false,
                  }
                : msg,
            ),
          );
        }

        else if (data.type === 'ui_start') {
          // show a shimmer/loader in UI area
          updateMessage((prev) =>
            prev.map((msg) =>
              msg.id === aiResponseId
                ? {
                    ...msg,
                    ui: { loading: true, tool: 'c1_ui_generate', content: null },
                    isLoading: false,
                  }
                : msg
            )
          );
        }

        else if (data.type === 'ui_content') {
          // store the raw UI spec/content; your renderer can pick this up
          const uiContent: string =
            typeof data.content === 'string' ? data.content : JSON.stringify(data.content);

          updateMessage((prev) =>
            prev.map((msg) =>
              msg.id === aiResponseId
                ? {
                    ...msg,
                    ui: { loading: false, tool: 'c1_ui_generate', content: uiContent },
                    isLoading: false,
                  }
                : msg
            )
          );
        }

        // Create search info with 'searching' stage
        else if (data.type === 'search_start') {
          const newSearchInfo = {
            stages: ['searching'],
            query: data.query,
            urls: [],
          };
          searchData = newSearchInfo;

          // update the message with initial search info
          updateMessage(prev =>
            prev.map(msg =>
              msg.id === aiResponseId
                ? {
                    ...msg,
                    content: streamedContent,
                    searchInfo: newSearchInfo,
                    isLoading: false,
                  }
                : msg,
            ),
          );
        }

        // parse URLs from search results
        else if (data.type === 'search_results') {
          const urls =
            typeof data.urls === 'string' ? JSON.parse(data.urls) : data.urls;

          // update search info to add "reading" stage
          const newSearchInfo: SearchInfo = {
            stages: searchData
              ? [...searchData.stages, 'reading']
              : ['reading'],
            query: searchData?.query || '',
            urls,
          };

          searchData = newSearchInfo;

          updateMessage(prev =>
            prev.map(msg =>
              msg.id === aiResponseId
                ? {
                    ...msg,
                    searchInfo: newSearchInfo,
                    isLoading: false,
                  }
                : msg,
            ),
          );
        }

        // handle search error
        else if (data.type === 'search_error') {
          const newSearchInfo = {
            stages: searchData ? [...searchData.stages, 'error'] : ['error'],
            query: searchData?.query || '',
            error: data.error,
            urls: [],
          };
          searchData = newSearchInfo;

          updateMessage(prev =>
            prev.map(msg =>
              msg.id === aiResponseId
                ? { ...msg, searchInfo: newSearchInfo, isLoading: false }
                : msg,
            ),
          );
        }

        // handle rate limit
        else if (data.type === 'error') {
          const raw = String(data.message || '');
          const { limit, requested } = parseTokenPerMin(raw);

          // show toast for rate limits
          if (limit || requested) {
            toast.error(`Rate limit exceeded`, {
              description: () => (
                <>
                  <p>{`Allowed: ${limit ?? 'unknown'} tokens per minute,`}</p>
                  <p>{`Requested: ${requested ?? 'unknown'} tokens.`}</p>
                  <p>Try shortening your input or use larger model.</p>
                </>
              ),
              duration: 10000,
              richColors: true,
            });
          } else {
            toast.error(`Rate limit exceeded`, {
              description: `${raw} Please try again with a smaller query or choose another model.`,
            });
          }

          updateMessage(prev =>
            prev.map(msg =>
              msg.id === aiResponseId
                ? {
                    ...msg,
                    content:
                      'Rate limit exceeded, please change the model or use a smaller query.',
                    error: { raw },
                    isLoading: false,
                  }
                : msg,
            ),
          );
        }

        // end of stream handling
        else if (data.type === 'end') {
          // When stream ends, add 'writing' stage if we had search info
          if (searchData) {
            const finalSearchInfo = {
              ...searchData,
              stages: [...searchData.stages, 'writing'],
            };
            updateMessage(prev =>
              prev.map(msg =>
                msg.id === aiResponseId
                  ? {
                      ...msg,
                      searchInfo: finalSearchInfo,
                      isLoading: false,
                    }
                  : msg,
              ),
            );
          }
          eventSource.close();
          setStreaming(false);
        }
      } catch (error) {
        console.error('Error parsing event data:', error);
      }
    };

    // handle error if event source fails
    eventSource.onerror = err => {
      console.error('EventSource failed:', err);
      eventSource.close();
      setStreaming(false);
      if (!hasReceivedContent) {
        updateMessage(prev =>
          prev.map(msg =>
            msg.id === aiResponseId
              ? {
                  ...msg,
                  content: 'Sorry, there was an error processing your request.',
                  isLoading: false,
                }
              : msg,
          ),
        );
      }
    };
  };
  return { startStream, streaming };
};
