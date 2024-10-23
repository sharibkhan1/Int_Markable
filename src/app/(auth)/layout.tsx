import Image from "next/image";

import appde from "./prod11.png"
import logo from "./logoo2.png"
import appdea from "./prodcut7.png"

const AuthLayout=({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
<div className='h-screen overflow-hidden flex w-full justify-center' >
        <div className='w-[600px] ld:w-full flex flex-col items-center p-6 ' >
            <Image
            src= "/logoo2.png"
            alt="LOGO"
            sizes="100vw"
            style={{
                width:"30%",
                height:"auto",
            }}
            width={0}
            height={0}
            />
        {children}
        </div>
        <div className='hidden lg:flex flex-1 w-full max-h-full max-w-4000px overflow-hidden
        relative bg-cream flex-col pt-10 pl-24 gap-3 ' >
            <h2 className='text-gravel md:text-6xl font-bold' >
                Join Us
            </h2>
            <p className="text-iridium md:text-lg mb-10">
            Unlock your ability to influence everyone you ....{' '}
          <br />
          reach with Makerble® Audience Management platform 😉
        </p>
        <Image
            src="/ss3.png"
            alt="iamge"
            loading='lazy'
            sizes="40"
            className='absolute shrink-0 !w-[1400px] bottom-0 '
            width={0}
            height={0}
        />  
        </div>
    </div>
  );
}

export default AuthLayout;
