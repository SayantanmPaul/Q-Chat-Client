export interface SearchInfo {
  stages: string[];
  query: string;
  urls: string[];
  error?: string | null;
}

export interface Message {
  id: number;
  content: string;
  isUser: boolean;
  type: string;
  isLoading?: boolean;
  searchInfo?: SearchInfo;
}
