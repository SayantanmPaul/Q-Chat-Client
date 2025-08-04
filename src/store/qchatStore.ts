import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface QChatStoreType {
  selectedModel: { name: string } | null;
  setSelectedModel: (model: { name: string }) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  conversationList: ChatMessage[];
  setConversationList: (list: ChatMessage[]) => void;

  setClearStore: () => void;
}

export const useQchatStore = create<QChatStoreType>()(
  persist(
    set => ({
      selectedModel: null,
      isLoading: false,
      conversationList: [],

      setSelectedModel: model => set({ selectedModel: model }),
      setIsLoading: loading => set({ isLoading: loading }),
      setConversationList: list => set({ conversationList: list }),
      setClearStore() {
        set({
          selectedModel: null,
          isLoading: false,
          conversationList: [],
        });
      },
    }),
    {
      name: 'qchat-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
