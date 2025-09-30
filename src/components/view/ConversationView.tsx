'use client';
// import useChatScroll from '@/hooks/useChatScroll';
import { useQchatStore } from '@/store/qchatStore';
import { useEffect, useState } from 'react';
import { AskToLlmTextarea } from '../ui/AskToLlmTextarea';
import { useChatStream } from '@/hooks/useChatStream';
import { Message } from '@/types/message-type';
import MessageArea from '../chat-window/MessageArea';
import { useGetCurrentModel } from '@/lib/queries/chat.queries';
import GreetingMessage from '../chat-window/GreetingMessage';
import ExampleQueries from '../chat-window/ExampleQueries';
import useChatScroll from '@/hooks/useChatScroll';
import { AnimatePresence, motion } from 'motion/react';

const ConversationView = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentMessage, setCurrentMessage] = useState('');
  const [checkpointId, setCheckpointId] = useState<string | null>(null);
  const autoScrollRef = useChatScroll(messages);

  const { startStream } = useChatStream({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/chat-stream` || '',
  });

  const { data: modelList } = useGetCurrentModel();

  const {
    selectedModel,
    setSelectedModel,
    // setConversationList,
    setClearStore,
    isLoading,
  } = useQchatStore();

  useEffect(() => {
    setClearStore();
  }, [setClearStore]);

  const onSubmit = (value: string) => {
    if (!value.trim()) return;

    const newMessageId =
      messages.length > 0 ? Math.max(...messages.map(msg => msg.id)) + 1 : 1;

    setMessages(prev => [
      ...prev,
      {
        id: newMessageId,
        content: value,
        isUser: true,
        type: 'message',
      },
    ]);
    setCurrentMessage('');

    const aiResponseId = newMessageId + 1;
    setMessages(prev => [
      ...prev,
      {
        id: aiResponseId,
        content: '',
        isUser: false,
        type: 'message',
        isLoading: true,
        searchInfo: { stages: [], query: '', urls: [] },
      },
    ]);

    startStream({
      userInput: value,
      checkpointId,
      aiResponseId,
      modelName: selectedModel?.name || '',
      updateMessage: setMessages,
      setCheckpointId,
    });
  };

  const placeholders = [
    'What is a mutual fund?',
    'How do I start investing with ₹500?',
    'What’s the difference between SIP and lumpsum?',
    'Is it better to invest in FD or mutual funds?',
    'Are mutual funds safe?',
  ];

  return (
    <div className="relative flex h-screen max-h-[calc(100vh-0px)] flex-1 bg-[#0D0D0D] px-4 md:max-h-full lg:max-h-full lg:px-0 dark:bg-[#0D0D0D]">
      <AnimatePresence>
        <motion.div
          transition={{ duration: 0.5 }}
          animate={{ justifyContent: messages.length > 0 ? 'end' : 'center' }}
          className={`flex h-full w-full flex-1 flex-col items-center gap-4 overflow-y-auto ${messages.length > 0 ? 'justify-end' : 'justify-center'}`}
        >
          <div
            className={`relative flex w-full flex-col ${messages.length > 0 ? 'h-full max-w-full gap-0 pb-4' : 'h-auto max-w-[820px] gap-12 pb-0'}`}
          >
            <div
              className="scrolling-touch flex-1 overflow-y-auto"
              ref={autoScrollRef}
            >
              {messages.length < 1 ? (
                <div className="flex w-full items-start px-3">
                  <GreetingMessage />
                </div>
              ) : (
                <>
                  <div className="sticky top-0 left-0 z-20">
                    <div className="pointer-events-none h-12 w-full bg-gradient-to-b from-[#0D0D0D] to-transparent" />
                  </div>
                  <div className="mx-auto flex w-full max-w-sm flex-col md:max-w-[548px] lg:max-w-[936px]">
                    <MessageArea messages={messages} />
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <AskToLlmTextarea
                placeholders={placeholders}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setCurrentMessage(e.target.value)
                }
                onSubmit={onSubmit}
                modelData={modelList?.data}
                isLoading={isLoading}
                currentModel={selectedModel}
                onModelChange={setSelectedModel}
              />
              {messages.length < 1 && (
                <div className="px-2 lg:px-3">
                  <ExampleQueries />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ConversationView;
