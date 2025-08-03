'use client';
import useChatScroll from '@/hooks/useChatScroll';
import { useQchatStore } from '@/store/qchatStore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AskToLlmTextarea } from '../ui/AskToLlmTextarea';
import { useChatStream } from '@/hooks/useChatStream';
import { Message } from '@/types/message-type';
import MessageArea from '../chat-window/MessageArea';

const ConversationView = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentMessage, setCurrentMessage] = useState('');
  const [checkpointId, setCheckpointId] = useState<string | null>(null);

  const { startStream } = useChatStream({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/chat-stream` || '',
  });

  const placeholders = [
    'What is a mutual fund?',
    'How do I start investing with ₹500?',
    'What’s the difference between SIP and lumpsum?',
    'Is it better to invest in FD or mutual funds?',
    'Are mutual funds safe?',
  ];

  // const { data, isLoading } = useGetModelNames();
  const {
    selectedModel,
    setSelectedModel,
    // setConversationList,
    setClearStore,
    isLoading,
  } = useQchatStore();

  const autoScrollRef = useChatScroll(messages);

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
      updateMessage: setMessages,
      setCheckpointId,
    });
  };

  return (
    <div className="relative flex h-screen max-h-[calc(100vh-0px)] flex-1 bg-[#0D0D0D] px-4 md:max-h-full lg:max-h-full lg:px-0 dark:bg-[#0D0D0D]">
      <div
        className={`flex h-full w-full flex-1 flex-col gap-4 overflow-y-auto ${messages.length > 0 ? 'justify-end' : 'justify-center'}`}
      >
        <div
          className={`relative flex flex-col gap-0 pb-8 md:mx-0 lg:mx-0 ${messages.length > 0 ? 'h-full' : 'h-auto gap-8'}`}
        >
          <div
            className="scrolling-touch flex-1 overflow-y-auto"
            ref={autoScrollRef}
          >
            {messages.length < 1 ? (
              <Header />
            ) : (
              <>
                <div className="sticky top-0 left-0 z-20">
                  <div className="flex w-full items-center justify-center bg-[#0D0D0D] pt-4">
                    <Logo
                      imageClass="w-8 h-8"
                      textClass="text-2xl"
                      onClick={() => {
                        setClearStore();
                      }}
                    />
                  </div>
                  <div className="pointer-events-none h-12 w-full bg-gradient-to-b from-[#0D0D0D] to-transparent" />
                </div>
                <div
                  className={`mx-auto flex w-full max-w-sm flex-col space-y-4 pb-8 md:max-w-[548px] lg:max-w-[860px]`}
                >
                  <MessageArea messages={messages} />
                </div>
              </>
            )}
          </div>
          <AskToLlmTextarea
            placeholders={placeholders}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setCurrentMessage(e.target.value)
            }
            onSubmit={onSubmit}
            // modelData={data?.data?.llmModels}
            isLoading={isLoading}
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <Disclaimer />
        </div>
      </div>
    </div>
  );
};

export default ConversationView;

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 select-none lg:gap-5">
      <Logo
        imageClass="lg:w-12 lg:h-12 w-10 h-10 pr-1"
        textClass="lg:text-4xl text-3xl"
      />
      <h2 className="font-briColage text-sm font-medium lg:text-lg lg:font-semibold dark:text-[#EFEFEF]">
        Qurious about finance? Start here!
      </h2>
    </div>
  );
};

const Logo = ({
  imageClass,
  textClass,
  onClick,
}: {
  imageClass?: string;
  textClass?: string;
  onClick?: () => void;
}) => {
  return (
    <span
      className="relative z-20 flex cursor-pointer items-center space-x-1"
      onClick={onClick}
    >
      <Image
        src="../logo/Q.svg"
        className={imageClass}
        width={60}
        height={60}
        alt="Q"
        draggable={false}
      />
      <span
        className={`font-briColage font-medium whitespace-pre text-black dark:text-[#EFEFEF] ${textClass}`}
      >
        chat
      </span>
    </span>
  );
};

const Disclaimer = () => {
  return (
    <p className="font-departureMono w-full text-xs font-medium tracking-tighter text-nowrap text-neutral-400">
      AI-generated, for reference only.
    </p>
  );
};
