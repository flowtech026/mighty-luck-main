"use client";

import { ArrowDown, ArrowUp } from 'lucide-react';
import { useState } from 'react';

export default function AboutSection() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className="flex flex-col items-center lg:items-start p-0 gap-[24px] lg:gap-[40px] w-full max-w-[1136px] mx-auto px-0 lg:px-0 mt-[20px] sm:mt-[30px] lg:mt-[20px]">
            <div 
                className={`flex flex-col items-center p-0 gap-[24px] lg:gap-[32px] w-full max-w-[1136px] relative isolate overflow-hidden transition-[max-height] duration-500 ease-in-out ${isExpanded ? 'max-h-[3000px]' : 'max-h-[910px] md:max-h-[708px]'}`}
            >
                <div className="flex flex-col items-start p-0 gap-[16px] lg:gap-[24px] w-[374px] max-w-full md:w-full lg:w-[800px] md:px-[24px] lg:px-0 flex-none z-0">
                    <h2 className="w-full font-['Jost'] font-bold text-[22px] md:text-[32px] lg:text-[32px] leading-[26px] md:leading-[120%] tracking-[-0.02em] text-white flex-none m-0">
                        Play the Best Crypto Casino Games Online at Mighty Luck — Fast, Fair and Secure
                    </h2>
                    <p className="w-full font-['Manrope'] font-medium text-[16px] md:text-[16px] lg:text-[16px] leading-[26px] md:leading-[160%] text-[#D2DCF7] flex-none m-0 whitespace-pre-wrap">
                        {`Step into a next-generation gaming experience where every spin, bet, and hand is powered by blockchain technology. At Mighty Luck Casino, you can explore more than 9,000 crypto casino games across slots, table games, live dealer games, and crash-style favorites. As one of the top crypto casinos online, Mighty Luckgives players instant withdrawals, enhanced privacy, and a secure gambling environment without the friction of traditional payment methods.\n\nWhether you're here to play table games, explore Bitcoin casino games, or try the latest provably fair slots, Mighty Luck delivers one of the most complete online casino experiences available today.\n\nReady to play games and win real crypto?\n\nStart playing crypto casino games at Mighty Luck Casino`}
                    </p>
                </div>

                <div className="flex flex-col items-start p-0 gap-[12px] lg:gap-[16px] w-[374px] max-w-full md:w-full lg:w-[800px] md:px-[24px] lg:px-0 flex-none z-10">
                    <h3 className="w-full font-['Jost'] font-bold text-[18px] md:text-[24px] lg:text-[24px] leading-[26px] md:leading-[35px] text-white flex-none m-0">
                        Why Mighty Luck Is the Ultimate Place to Play Crypto Casino Games
                    </h3>
                    <p className="w-full font-['Manrope'] font-medium text-[16px] md:text-[16px] lg:text-[16px] leading-[26px] md:leading-[160%] text-[#D2DCF7] flex-none m-0 whitespace-pre-wrap">
                        Mighty Luck Casino offers the perfect blend of crypto gambling convenience, online casino entertainment, and world-class security. Compared to traditional online casinos, Mighty Luck delivers significantly faster payouts, more generous bonuses, and an unmatched selection of various games.
                    </p>
                </div>

                <div className="flex flex-col items-start p-0 gap-[12px] lg:gap-[16px] w-[374px] max-w-full md:w-full lg:w-[800px] md:px-[24px] lg:px-0 flex-none z-20 pb-[60px]">
                    <h3 className="w-full font-['Jost'] font-bold text-[18px] md:text-[24px] lg:text-[24px] leading-[26px] md:leading-[35px] text-white flex-none m-0">
                        Massive Game Variety
                    </h3>
                    <p className="w-full font-['Manrope'] font-medium text-[16px] md:text-[16px] lg:text-[16px] leading-[26px] md:leading-[160%] text-[#D2DCF7] flex-none m-0 whitespace-pre-wrap">
                        With more than 9,000 casino games, Mighty Luck outshines many crypto casinos and traditional casinos alike. You’ll find:
                    </p>
                </div>

                <div 
                    className={`absolute w-[414px] md:w-full md:max-w-[800px] h-[200px] left-1/2 -translate-x-1/2 bottom-0 flex flex-col justify-end items-center px-[10px] py-[24px] gap-[10px] z-30 pointer-events-none transition-all duration-500 ${isExpanded ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}
                    style={{ background: isExpanded ? 'transparent' : 'linear-gradient(0deg, #091741 0%, rgba(9, 23, 65, 0) 100%)' }}
                >
                    <button 
                        onClick={() => setIsExpanded(true)}
                        className="flex flex-row items-center p-0 gap-[4px] w-[93px] h-[19px] cursor-pointer hover:opacity-80 transition-opacity pointer-events-auto flex-none"
                    >
                        <span className="w-[73px] h-[19px] font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.01em] text-[#FFBF1F] flex-none whitespace-nowrap text-left">
                            Read more
                        </span>
                        <div className="w-[16px] h-[16px] flex items-center justify-center relative flex-none">
                            <ArrowDown size={16} color="#FFBF1F" strokeWidth={2} />
                        </div>
                    </button>
                </div>

                {isExpanded && (
                    <div className="flex flex-col justify-end items-center px-[10px] pb-[24px] pt-[24px] gap-[10px] z-30 w-full animate-in fade-in duration-500 absolute bottom-0 left-1/2 -translate-x-1/2">
                        <button 
                            onClick={() => setIsExpanded(false)}
                            className="flex flex-row items-center p-0 gap-[4px] w-[93px] h-[19px] cursor-pointer hover:opacity-80 transition-opacity flex-none"
                        >
                            <span className="w-[73px] h-[19px] font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.01em] text-[#FFBF1F] flex-none whitespace-nowrap text-left">
                                Read less
                            </span>
                            <div className="w-[16px] h-[16px] flex items-center justify-center relative flex-none">
                                <ArrowUp size={16} color="#FFBF1F" strokeWidth={2} />
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
