import { PlusIcon } from 'lucide-react';
import BrandButton from '../ui/BrandButton';
import { useQchatStore } from '@/store/qchatStore';

const NewChatButton = () => {
  const { setClearStore } = useQchatStore();

  return (
    <BrandButton
      text="Start new chat"
      width={64}
      height={10}
      shortcutKey="⌘ + K"
      partOfSidebar={true}
      onClick={() => {
        setClearStore();
      }}
      icon={<PlusIcon size={16} className="h-4 w-4" strokeWidth={2.4} />}
    />
  );
};

export default NewChatButton;
