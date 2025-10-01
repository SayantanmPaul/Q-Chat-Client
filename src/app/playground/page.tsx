'use client';

import LanguageSelector from '@/components/chat-window/LanguageSelector';
import ModelSelectionDropDown from '@/components/chat-window/ModelSelection';
import { useGetCurrentModel } from '@/lib/queries/chat.queries';
import { useQchatStore } from '@/store/qchatStore';
import { useState } from 'react';

const Page = () => {
  const defaultLanguage = {
    language: 'English',
    flag: 'https://kapowaz.github.io/circle-flags/flags/in.svg',
  };

  const { data: modelList } = useGetCurrentModel();
  const { selectedModel, setSelectedModel } = useQchatStore();

  const [activeLanguage, setActiveLanguage] = useState(defaultLanguage);

  const availableLanguages = [
    {
      language: 'English',
      flag: 'https://kapowaz.github.io/circle-flags/flags/in.svg',
    },
    {
      language: 'Hindi',
      flag: 'https://kapowaz.github.io/circle-flags/flags/in.svg',
    },
    {
      language: 'Português',
      flag: 'https://kapowaz.github.io/circle-flags/flags/br.svg',
    },
    {
      language: 'Japanese',
      flag: 'https://kapowaz.github.io/circle-flags/flags/jp.svg',
    },
    {
      language: 'Spanish',
      flag: 'https://kapowaz.github.io/circle-flags/flags/es.svg',
    },
    {
      language: 'German',
      flag: 'https://kapowaz.github.io/circle-flags/flags/de.svg',
    },
  ];

  return (
    <div className="flex h-screen w-full items-center justify-center space-x-10 bg-black">
      <ModelSelectionDropDown
        modelData={modelList?.data}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
      />
      <LanguageSelector
        selectedLanguage={activeLanguage}
        availableLanguages={availableLanguages}
        onLanguageChange={setActiveLanguage}
      />
    </div>
  );
};

export default Page;
