import { SearchIcon } from 'lucide-react';
import BrandButton from '../ui/BrandButton';

const SearchChatButton = () => {
  return (
    <BrandButton
      text="Search chats"
      width={64}
      height={10}
      position="left"
      category="secondary"
      partOfSidebar={true}
      icon={<SearchIcon size={16} className="h-4 w-4" strokeWidth={2.4} />}
    />
  );
};

export default SearchChatButton;
