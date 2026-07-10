"use client";

import { useState } from 'react';

export default function NinjaSlot() {
  const [isRealPlay, setIsRealPlay] = useState(true);

  return (
    <div className="w-full h-auto min-h-[100px] bg-[#0C1F56] rounded-[16px] p-[16px] sm:px-[30px] sm:py-0 flex flex-col sm:flex-row items-center justify-between mx-auto flex-none overflow-hidden gap-[16px] sm:gap-0">
      
      <div className="flex flex-col sm:flex-row items-center gap-[12px] sm:gap-[32px] w-full sm:w-auto h-auto sm:h-[40px] flex-none">
        
        <div className="w-[80px] h-[40px] flex items-center flex-none relative">
          <div 
            className="flex flex-row items-center font-sans font-bold uppercase text-white leading-none tracking-[0.15em] absolute"
            style={{ transform: 'scale(0.7)', transformOrigin: 'left center', fontSize: '13px' }}
          >
            <div className="bg-white text-black w-[16px] h-[16px] flex items-center justify-center font-black mr-[6px] tracking-normal">B</div>
            <div className="flex flex-row items-center gap-[5px]">
              <span>G</span><div className="w-[1px] h-[10px] bg-white opacity-20"></div>
              <span>A</span><div className="w-[1px] h-[10px] bg-white opacity-20"></div>
              <span>M</span><div className="w-[1px] h-[10px] bg-white opacity-20"></div>
              <span>I</span><div className="w-[1px] h-[10px] bg-white opacity-20"></div>
              <span>N</span><div className="w-[1px] h-[10px] bg-white opacity-20"></div>
              <span>G</span>
            </div>
          </div>
        </div>

        <div className="hidden sm:block w-[1px] h-[33px] bg-white opacity-60 flex-none"></div>

        <div className="flex flex-row justify-center items-center h-[29px] flex-none">
          <span className="font-['Jost'] font-bold text-[20px] leading-[29px] text-center text-white whitespace-nowrap">
            Ninja Crash Slot
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-end gap-[16px] sm:gap-[40px] w-full sm:w-auto h-auto sm:h-[24px] flex-none mt-[8px] sm:mt-0">
        
        <div className="flex flex-row items-center gap-[24px] h-[20px] flex-none">
          <div 
            className="w-[20px] h-[20px] bg-current text-white cursor-pointer hover:text-[#A5B8EF] transition-colors shrink-0" 
            style={{ WebkitMaskImage: 'url(/open.svg)', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskImage: 'url(/open.svg)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }} 
          />
          <div 
            className="w-[20px] h-[20px] bg-current text-white cursor-pointer hover:text-[#FFC83D] transition-colors shrink-0" 
            style={{ WebkitMaskImage: 'url(/heart.svg)', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskImage: 'url(/heart.svg)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }} 
          />
        </div>

        <div className="flex flex-row items-center justify-center gap-[8px] h-[24px] flex-none w-full sm:w-auto">
          <span 
            onClick={() => setIsRealPlay(false)}
            className={`font-['Manrope'] text-[12px] leading-[16px] tracking-[0.02em] whitespace-nowrap flex-none cursor-pointer transition-colors ${!isRealPlay ? 'font-bold text-white' : 'font-semibold text-[#A5B8EF]'}`}
          >
            Fun Play
          </span>

          <div 
            onClick={() => setIsRealPlay(!isRealPlay)}
            className={`flex flex-row items-center w-[42px] h-[24px] rounded-[30px] p-[3px] cursor-pointer flex-none box-border transition-colors ${isRealPlay ? 'bg-[#1463FF] justify-end' : 'bg-[#112F82] justify-start'}`}
          >
            <div className="w-[18px] h-[18px] bg-white rounded-[30px] flex-none shadow-sm"></div>
          </div>

          <span 
            onClick={() => setIsRealPlay(true)}
            className={`font-['Manrope'] text-[12px] leading-[16px] tracking-[0.02em] whitespace-nowrap flex-none cursor-pointer transition-colors ${isRealPlay ? 'font-bold text-white' : 'font-semibold text-[#A5B8EF]'}`}
          >
            Real Play
          </span>
        </div>

      </div>

    </div>
  );
}
