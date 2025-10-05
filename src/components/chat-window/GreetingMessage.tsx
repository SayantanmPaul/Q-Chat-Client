'use client';

import React, { useEffect, useState } from 'react';

const greetingMessages = [
  "Let's plan something great — what's your goal ahead?",
  "Let's get started—what's your priority?",
  'What goal are we working on then?',
  "Let's move things forward — what's on your mind?",
  'Ready to make progress on your goals?',
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return 'Good Morning';
  } else if (hour >= 0 && hour < 5) {
    return 'Up late?';
  } else if (hour >= 12 && hour < 18) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
};

const GreetingMessage = () => {
  const [randomMessage, setRandomMessage] = useState(greetingMessages[1]);

  const greeting = getGreeting();

  useEffect(() => {
    setRandomMessage(
      greetingMessages[Math.floor(Math.random() * greetingMessages.length)],
    );
  }, []);

  return (
    <div>
      <h1 className="font-briColage cursor-default overflow-clip bg-gradient-to-br from-[#3DDBB0] to-[#94E162] bg-clip-text text-[22px] leading-7 font-semibold text-transparent lg:text-3xl lg:leading-10">
        {greeting}
        <br />{' '}
        <span className="text-[18px] leading-7 font-semibold lg:text-3xl lg:text-inherit">
          {randomMessage}
        </span>
      </h1>
    </div>
  );
};

export default GreetingMessage;
