import { Message, SearchInfo } from '@/types/message-type';
import { useState } from 'react';

interface StreamOptions {
  userInput: string;
  checkpointId: string | null;
  aiResponseId: number;
  updateMessage: (updater: (prev: Message[]) => Message[]) => void;
  setCheckpointId: (id: string) => void;
}

export const useChatStream = ({ baseURL }: { baseURL: string }) => {
  const [streaming, setStreaming] = useState(false);

  const startStream = ({
    userInput,
    checkpointId,
    aiResponseId,
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
