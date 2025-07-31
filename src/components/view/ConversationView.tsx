'use client';
import useChatScroll from '@/hooks/useChatScroll';
import {
  useGetModelNames,
  useGetResponseFromModel,
} from '@/lib/queries/chat.queries';
import { useQchatStore } from '@/store/qchatStore';
import Image from 'next/image';
import { useEffect } from 'react';
import { TextEffect } from '../motion-primitives/text-effect';
import { TextShimmer } from '../motion-primitives/text-shimmer';
import { AskToLlmTextarea } from '../ui/AskToLlmTextarea';

const ConversationView = () => {
  const placeholders = [
    'What is a mutual fund?',
    'How do I start investing with ₹500?',
    'What’s the difference between SIP and lumpsum?',
    'Is it better to invest in FD or mutual funds?',
    'Are mutual funds safe?',
  ];

  const { data, isLoading } = useGetModelNames();
  const {
    conversationList,
    selectedModel,
    setSelectedModel,
    setConversationList,
    setClearStore,
  } = useQchatStore();

  const autoScrollRef = useChatScroll(conversationList);

  const { 
    mutate,
    isPending: isLoadingResponse,
    // data: responseData,
  } = useGetResponseFromModel();

  useEffect(() => {
    if (data?.data?.llmModels?.length > 0 && !selectedModel) {
      setSelectedModel(data.data.llmModels[0]);
    }
  }, [data, selectedModel, setSelectedModel]);

  useEffect(() => {
    setClearStore();
  }, [setClearStore]);

  const onSubmit = (value: string) => {
    setConversationList([
      ...conversationList,
      {
        role: 'user',
        content: value,
      },
    ]);
    mutate(
      {
        selectedModel: selectedModel?.name || '',
        message: value,
      },
      {
        onSuccess: ({ data }) => {
          setConversationList([
            ...conversationList,
            { role: 'user', content: value },
            { role: 'assistant', content: data.response },
          ]);
        },
        onError: error => {
          console.error('Error fetching response:', error);
        },
      },
    );
  };

  return (
    <div className="relative flex h-screen max-h-[calc(100vh-0px)] flex-1 bg-[#0D0D0D] px-4 md:max-h-full lg:max-h-full lg:px-0 dark:bg-[#0D0D0D]">
      <div
        className={`flex h-full w-full flex-1 flex-col gap-4 overflow-y-auto ${conversationList.length > 0 ? 'justify-end' : 'justify-center'}`}
      >
        <div
          className={`relative flex flex-col gap-0 pb-8 md:mx-0 lg:mx-0 ${conversationList.length > 0 ? 'h-full' : 'h-auto gap-8'}`}
        >
          <div
            className="scrolling-touch flex-1 overflow-y-auto md:max-h-full lg:max-h-full"
            ref={autoScrollRef}
          >
            {conversationList.length < 1 ? (
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
                  {conversationList.map((msg, index) =>
                    msg.role === 'user' ? (
                      <div
                        key={index}
                        className={`flex w-full flex-col items-end`}
                      >
                        <ChatBubble prompt={msg.content} />
                      </div>
                    ) : (
                      <div
                        key={index}
                        className={`flex w-full flex-col items-start`}
                      >
                        <ChatResponseBubble response={msg.content} />
                      </div>
                    ),
                  )}
                  {isLoadingResponse && (
                    <div className="flex w-full flex-col items-start px-4">
                      <ResponseLoader />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <AskToLlmTextarea
            placeholders={placeholders}
            onChange={() => {}}
            onSubmit={onSubmit}
            modelData={data?.data?.llmModels}
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

const ChatBubble = ({ prompt }: { prompt: string }) => {
  return (
    <div className="flex w-fit max-w-3xl items-start gap-2 rounded-xl border-2 p-4 font-medium dark:border-neutral-700/10 dark:bg-[#121212]">
      <p className="leading-4 font-medium whitespace-pre-wrap text-neutral-200">
        {prompt}
      </p>
    </div>
  );
};

const ChatResponseBubble = ({ response }: { response: string }) => {
  return (
    <div className="flex w-fit max-w-3xl items-start gap-2 rounded-xl border-2 p-4 font-medium dark:border-neutral-700/10 dark:bg-[#121212]">
      <div className="prose prose-neutral dark:prose-invert font-medium whitespace-pre-wrap">
        {/* <MarkDown content={response} /> */}
        <TextEffect
          className="text-neutral-200"
          per="word"
          preset="fade"
          markdown={true}
        >
          {response}
        </TextEffect>
      </div>
    </div>
  );
};

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

const ResponseLoader = () => {
  return (
    <TextShimmer
      className="font-departureMono text-xs font-medium tracking-tighter lg:text-sm"
      duration={1}
    >
      Generating response...
    </TextShimmer>
  );
};
