import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface QChatStoreType {
  selectedModel: { name: string; description?: string } | null;
  setSelectedModel: (model: { name: string; description?: string }) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  conversationList: ChatMessage[];
  setConversationList: (list: ChatMessage[]) => void;

  isUserAuthenticated: boolean;
  setIsUserAuthenticated: (auth: boolean) => void;

  isMobileView: boolean;
  setIsMobileView: (view: boolean) => void;

  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;

  isSignInDrawerOpen: boolean;
  setIsSignInDrawerOpen: (open: boolean) => void;

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

      isUserAuthenticated: false,
      setIsUserAuthenticated: auth => set({ isUserAuthenticated: auth }),

      isMobileView: false,
      setIsMobileView: view => set({ isMobileView: view }),

      isSidebarOpen: true,
      setIsSidebarOpen: open => set({ isSidebarOpen: open }),

      isSignInDrawerOpen: false,
      setIsSignInDrawerOpen: open => set({ isSignInDrawerOpen: open }),

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
