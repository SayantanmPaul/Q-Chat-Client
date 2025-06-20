'use client';
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

const Dashboard = () => {
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
    <div className="relative flex flex-1">
      <div
        className={`flex h-full w-full flex-1 flex-col gap-4 border-l border-neutral-200 bg-[#0D0D0D] dark:border-neutral-700 dark:bg-[#0D0D0D] ${conversationList.length > 0 ? 'justify-end overflow-y-auto' : 'justify-center overflow-hidden'}`}
      >
        <div
          className={`relative flex flex-col gap-0 p-1 pt-12 pb-8 ${conversationList.length > 0 ? 'h-full' : 'h-auto gap-8'}`}
        >
          <div className="flex-1 overflow-y-auto">
            {conversationList.length < 1 ? (
              <Header />
            ) : (
              <div
                className={`mx-auto flex w-full flex-col space-y-4 pb-8 md:max-w-[548px] lg:max-w-[860px]`}
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
            )}
            {/* <div className="pointer-events-none absolute bottom-44 left-0 h-20 w-full bg-gradient-to-b from-transparent to-[#0D0D0D]" /> */}
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

export default Dashboard;

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
      <Logo />
      <h2 className="font-briColage text-sm font-medium lg:text-lg lg:font-semibold dark:text-[#EFEFEF]">
        Qurious about finance? Start here!
      </h2>
    </div>
  );
};

const Logo = () => {
  return (
    <span className="relative z-20 flex items-center space-x-2">
      <Image
        src="../logo/Q.svg"
        className="h-10 w-10 lg:h-12 lg:w-12"
        width={60}
        height={60}
        alt="Q"
        draggable={false}
      />
      <span className="font-briColage text-3xl font-medium whitespace-pre text-black lg:text-4xl dark:text-[#EFEFEF]">
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
      className="font-departureMono text-sm font-medium tracking-tighter"
      duration={1}
    >
      Generating response...
    </TextShimmer>
  );
};
