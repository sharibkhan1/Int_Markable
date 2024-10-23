'use client';
import React from 'react';
import { Headphones } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Image from 'next/image';

type Props = {};

const InfoBar = (props: Props) => {
  return (
    <div className="flex flex-row bg-gray-100 sticky overflow-hidden items-center px-4 py-4 w-full dark:bg-black">
      {/* Logo on the left side */}
      <div className="flex-shrink-0 mr-4"> {/* Added margin to the right for spacing */}
        <Image src="/logoo3.png" className="w-[6rem] h-8 " alt="Logo" width={50} height={50} /> {/* Set width and height for better responsiveness */}
      </div>

      {/* Right aligned elements */}
      <div className="flex-grow flex justify-end gap-6 items-center"> {/* Make the right side items flex and push them to the end */}
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <Headphones />
            </TooltipTrigger>
            <TooltipContent>
              <p>Contact Support</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default InfoBar;
