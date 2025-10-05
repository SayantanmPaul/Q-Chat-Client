import { XIcon } from 'lucide-react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useQchatStore } from '@/store/qchatStore';

interface ConversationLimitAlertProps {
  remainingConversations: number;
}

const ConversationLimitAlert = ({
  remainingConversations,
}: ConversationLimitAlertProps) => {
  const { isSignInDrawerOpen, setIsSignInDrawerOpen } = useQchatStore();

  return (
    <AnimatePresence>
      <motion.span
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center space-x-2 rounded-2xl bg-[#0A1317]/60 px-4 backdrop-blur-sm"
      >
        <p className="font-briColage font-base text-[10px] leading-8 text-white lg:text-sm lg:leading-10">
          You have {remainingConversations} conversations remaining.{' '}
          <button
            onClick={() => setIsSignInDrawerOpen(!isSignInDrawerOpen)}
            className="cursor-pointer font-bold text-[#84E070] underline"
          >
            Sign in to reset your limits
          </button>
        </p>
        {remainingConversations > 0 && (
          <button type="button">
            <XIcon
              size={14}
              className="h-3 w-3 text-white lg:h-4 lg:w-4"
              strokeWidth={2.4}
            />
          </button>
        )}
      </motion.span>
    </AnimatePresence>
  );
};

export default ConversationLimitAlert;
