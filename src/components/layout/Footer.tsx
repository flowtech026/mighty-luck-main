"use client"
import Image from 'next/image';
import { useState } from 'react';

const footerLinks = {
    "SLOT GAMES": ['Slots', 'Skill Games', 'Jackpot', 'Bonus Buy', 'Crash Games'],
    "LIVE CASINO": ['Roulette', 'Blackjack', 'Live Casino', 'Table Games', 'Video Poker'],
    "CASINO": ['About Us', 'Promotions', 'Tournaments', 'Affiliate Program', 'Vip Club', 'Refer a Friend', 'Blog', 'Bonus Shop'],
    "LEGAL": ['Privacy Policy', 'Terms & Conditions', 'Bonus Terms', 'Responsible Gambling', 'Payment Methods', 'Sportsbook Rules'],
    "SUPPORT": ['Live Support'],
};

export default function Footer() {
    const [expandedCategory, setExpandedCategory] = useState<string | null>('SLOT GAMES');

    return (
        <footer className="flex flex-col items-center md:items-start gap-[40px] md:gap-[48px] w-full mt-10 mb-6  md:px-0">

            <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-[40px] md:gap-[49px] w-full max-w-[374px] md:max-w-none mx-auto">

                <div className="flex flex-col items-center md:items-start p-0 gap-[16px] w-[213px] shrink-0">
                    <div className="flex flex-col items-center justify-between w-[132px] h-[50px] relative shrink-0">
                        <img src="/king.svg" alt="Crown" className="w-[33px] h-[24px] object-contain" />
                        <img src="/logo-name.svg" alt="Mighty Luck" className="w-[131px] h-[14px] object-contain" />
                    </div>
                    <div className="w-[213px] font-['Manrope'] font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7] shrink-0 text-center md:text-left">
                        @ 2026 Mighty Luck. All rights reserved.
                    </div>
                </div>

                <div className="hidden md:grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-8 w-full md:w-auto">
                    {Object.entries(footerLinks).map(([heading, links]) => (
                        <div key={heading} className="flex flex-col items-start gap-[12px]">
                            <div className="font-['Jost'] font-bold text-[12px] leading-[17px] tracking-[0.02em] uppercase text-white text-left">
                                {heading}
                            </div>
                            <div className="flex flex-col items-start gap-[8px]">
                                {links.map(item => (
                                    <div key={item} className="font-['Manrope'] font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7] hover:text-[#FFBF1F] cursor-pointer transition-colors text-left">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col md:hidden items-start p-0 gap-[20px] w-full">
                    {Object.entries(footerLinks).map(([heading, links]) => {
                        const isExpanded = expandedCategory === heading;
                        return (
                            <div key={heading} className="flex flex-col items-start w-full gap-[8px]">
                                <button 
                                    className="flex flex-row items-center justify-between w-full h-[24px] cursor-pointer bg-transparent border-none p-0"
                                    onClick={() => setExpandedCategory(isExpanded ? null : heading)}
                                >
                                    <div className="font-['Jost'] font-bold text-[16px] leading-[23px] tracking-[0.02em] uppercase text-white flex-1 text-left">
                                        {heading}
                                    </div>
                                    <div className="flex flex-col justify-center items-center w-[24px] h-[24px]">
                                        <svg 
                                            width="10" 
                                            height="6" 
                                            viewBox="0 0 10 6" 
                                            fill="none" 
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                        >
                                            <path d="M1 1L5 5L9 1" stroke="#A5B8EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </button>
                                
                                {isExpanded && (
                                    <div className="flex flex-col items-start p-0 gap-[12px] w-full overflow-hidden transition-all duration-300 pt-[4px]">
                                        {links.map(item => (
                                            <div key={item} className="w-full font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.01em] text-[#D2DCF7] hover:text-white cursor-pointer text-left">
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

            </div>

            <div className="box-border flex flex-col md:flex-row justify-between items-start gap-[20px] md:gap-[10px] w-full max-w-[374px] md:max-w-none mx-auto pt-[60px] md:pt-[48px] border-t border-[#112F82]">

                <p className="w-full md:max-w-[445px] font-['Manrope'] font-semibold text-[10px] leading-[14px] text-left md:text-justify tracking-[0.01em] text-[#D2DCF7] m-0">
                    MightyLuck.com is owned and operated by Company Name B.V. a company that is incorporated under the laws of Curacao with company registration number XXXXXX, having its registered address at Street 3XX9, City, Curaçao. MightyLuck.com is licensed and holds a valid Certificate of Operation (ABC/XXXX/XXX/XXXX).
                </p>

                <div className="flex flex-row items-center justify-center gap-[30px] w-full md:w-auto h-[38px] shrink-0">
                    <div className="w-[38px] h-[38px] flex items-center justify-center shrink-0">
                        <div className="w-[32px] h-[32px] rounded-full border-[2px] border-[#D2DCF7] flex items-center justify-center">
                            <span className="font-['Manrope'] font-bold text-[13px] text-[#D2DCF7] leading-none tracking-tighter ml-[1px]">18+</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-[120px] h-[24px] shrink-0">
                        <span className="font-['Manrope'] font-semibold text-[20px] tracking-tight text-[#D2DCF7] whitespace-nowrap leading-[24px]">GambleAware</span>
                    </div>
                    <div className="relative w-[66.5px] h-[38px] shrink-0">
                        <Image src="/gcb.png" alt="GCB" fill className="object-contain" />
                    </div>
                </div>
            </div>

        </footer>
    );
}

