import React from 'react';

import Image from 'next/image';
import { Button } from '../ui/button';
import { Credenza, CredenzaContent, CredenzaTitle } from '../ui/credenza';
import { Input } from '../ui/input';

const SignInDrawer = ({
  open,
  setOpen,
}: {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaContent className="flex h-[60vh] w-screen max-w-screen items-center overflow-hidden lg:h-screen lg:justify-center lg:rounded-none">
        <div className="my-6 flex h-full w-full max-w-sm flex-col space-y-8 lg:h-max lg:max-w-[400px] lg:space-y-6">
          {/* header */}
          <span className="flex flex-col items-center space-y-5 lg:space-y-4">
            <CredenzaTitle className="font-briColage cursor-default overflow-clip bg-gradient-to-br from-[#3DDBB0] to-[#94E162] bg-clip-text text-[26px] leading-6 font-bold text-transparent lg:text-[32px] lg:leading-10 lg:font-semibold">
              Log in or Sign up
            </CredenzaTitle>

            <h3 className="font-briColage cursor-default text-center text-base leading-6 font-semibold text-[#D9D9D9] lg:text-[20px]">
              Unlock the full potential of Qchat{' '}
              <br className="hidden lg:block" />
              get latest update and more
            </h3>
          </span>
          <form className="flex w-full flex-col gap-4 lg:gap-6">
            <Input
              type="email"
              placeholder="Enter your email"
              className="font-briColage h-11 w-full rounded-full border-2 border-[#404040]/40 bg-[#404040]/40 px-6 py-4 text-sm font-medium ring-0 backdrop-blur-sm placeholder:text-[#8A8A8A] focus:ring-0 focus:outline-none lg:h-12 lg:text-base lg:font-semibold"
            />
            <Button className="font-briColage h-11 w-full rounded-full bg-[#66DE8B] text-base leading-5 font-bold text-[#404040] hover:bg-[#66DE8B]/80 lg:h-12 lg:text-lg">
              Continue
            </Button>
          </form>
          <LineBreak />
          <LoginWithThirdParty />
        </div>
      </CredenzaContent>
    </Credenza>
  );
};

export default SignInDrawer;

const LoginWithThirdParty = () => {
  return (
    <div className="boreder flex w-full flex-col items-center gap-4 border-red-500">
      <p className="font-briColage hidden text-base leading-5 text-[#A1A1A1] lg:block lg:text-lg">
        Continue with
      </p>
      <span className="flex h-10 w-full flex-col items-center justify-between gap-4 lg:h-12 lg:flex-row">
        <Button className="flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-3xl bg-[#EFEFEF] duration-300 ease-in-out hover:bg-[#EFEFEF] hover:opacity-80 lg:w-auto lg:px-13">
          <Image
            src="/logo/google.svg"
            alt="Google"
            width={20}
            height={20}
            className="h-4 w-4 lg:h-5 lg:w-5"
          />
          <p className="font-briColage text-base leading-5 font-bold text-[#404040] lg:text-lg">
            <span className="lg:hidden">Continue with </span>
            Google
          </p>
        </Button>
        <Button className="flex h-full w-full cursor-pointer items-center-safe justify-center gap-2 rounded-3xl bg-[#EFEFEF] duration-300 ease-in-out hover:bg-[#EFEFEF] hover:opacity-80 lg:w-auto lg:px-13">
          <Image
            src="/logo/apple.svg"
            alt="Apple"
            width={20}
            height={20}
            className="mb-1 h-4 w-4 lg:h-5 lg:w-5"
          />
          <p className="font-briColage text-base leading-5 font-bold text-[#404040] lg:text-lg">
            <span className="lg:hidden">Continue with </span>
            Apple
          </p>
        </Button>
      </span>
    </div>
  );
};

const LineBreak = () => {
  return (
    <div className="flex w-full max-w-[400px] items-center gap-3 select-none">
      <div className="h-[1px] w-full border-t border-[#E3E6EA]" />
      <span className="font-briColage text-xs leading-5 font-bold text-[#D9D9D9] uppercase">
        or
      </span>
      <div className="h-[1px] w-full border-t border-[#E3E6EA]" />
    </div>
  );
};
