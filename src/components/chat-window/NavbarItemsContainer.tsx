import React, { useState } from 'react';
import SignUpButton from './SignUpButton';
import LanguageSelector from './LanguageSelector';
import ModelSelectionDropDown from './ModelSelection';
import { useQchatStore } from '@/store/qchatStore';
import { useGetCurrentModel } from '@/lib/queries/chat.queries';
import { Branding } from '../branding/branding';

const NavbarItemsContainer = () => {
  const defaultLanguage = {
    language: 'English',
    flag: 'https://kapowaz.github.io/circle-flags/flags/in.svg',
  };

  const { data: modelList } = useGetCurrentModel();
  const { selectedModel, setSelectedModel, setIsSidebarOpen, isSidebarOpen } =
    useQchatStore();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeLanguage, setActiveLanguage] = useState(defaultLanguage);

  return (
    <div className="flex w-full items-center justify-between px-0 py-4 lg:px-5 lg:py-3">
      <span className="flex md:hidden lg:hidden">
        <Branding onClickFn={() => setIsSidebarOpen(!isSidebarOpen)} />
      </span>

      <span className="hidden md:flex lg:flex">
        <ModelSelectionDropDown
          modelData={modelList?.data}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
        />
      </span>
      <div className="flex items-center space-x-4 lg:space-x-3">
        <LanguageSelector selectedLanguage={activeLanguage} />
        <SignUpButton />
      </div>
    </div>
  );
};

export default NavbarItemsContainer;
