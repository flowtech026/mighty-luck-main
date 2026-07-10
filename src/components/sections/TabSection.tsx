"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const tabs = [
    { name: 'Lobby', icon: '/home.svg' },
    { name: 'Slots', icon: '/slots.svg' },
    { name: 'Originals', icon: '/orignals.svg' },
    { name: 'Crash Games', icon: '/crashgame.svg' },
    { name: 'Providers', icon: '/gameprovider.svg' },
    { name: 'Table Games', icon: '/tg.svg' },
    { name: 'Bonus Buys', icon: '/bb.svg' },
];

function TabSectionContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const activeTabSlug = searchParams.get('tab') || 'lobby';

    return (
        <div className="w-full relative overflow-hidden">
            <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="flex flex-row items-center gap-[8px] w-max xl:w-full h-[50px] min-w-full">
                    {tabs.map((tab, index) => {
                        const tabSlug = tab.name.toLowerCase().replace(' ', '-');
                        const isActive = activeTabSlug === tabSlug;
                        return (
                            <button
                                key={index}
                                onClick={() => {
                                    const params = new URLSearchParams(searchParams.toString());
                                    if (tabSlug === 'lobby') {
                                        params.delete('tab');
                                    } else {
                                        params.set('tab', tabSlug);
                                    }
                                    router.push(`${pathname}?${params.toString()}`, { scroll: false });
                                }}
                                className={`flex flex-row justify-center items-center px-[16px] max-[435px]:px-[12.8px] py-[10px] max-[435px]:py-[8px] gap-[8px] max-[435px]:gap-[6.4px] w-[135px] xl:w-0 xl:flex-1 xl:min-w-0 max-[435px]:w-[106.6px] h-[50px] max-[435px]:h-[40px] rounded-[6px] shrink-0 xl:shrink transition-colors ${isActive
                                    ? 'bg-[#1463FF]'
                                    : 'bg-[#0C1F56] hover:bg-[#112F82]'
                                    }`}
                            >
                                <div className="w-[20px] max-[435px]:w-[16px] h-[20px] max-[435px]:h-[16px] flex items-center justify-center shrink-0">
                                    <div
                                        className="w-[20px] max-[435px]:w-[16px] h-[20px] max-[435px]:h-[16px] shrink-0"
                                        style={{
                                            backgroundColor: isActive ? '#FFB800' : '#D2DCF7',
                                            maskImage: `url('${tab.icon}')`,
                                            WebkitMaskImage: `url('${tab.icon}')`,
                                            maskSize: 'contain',
                                            WebkitMaskSize: 'contain',
                                            maskRepeat: 'no-repeat',
                                            WebkitMaskRepeat: 'no-repeat',
                                            maskPosition: 'center',
                                            WebkitMaskPosition: 'center',
                                        }}
                                    />
                                </div>
                                <span
                                    className={`font-['Manrope'] leading-[19px] tracking-[0.02em] whitespace-nowrap 
                                        ${index >= 4 ? 'max-[435px]:text-[11.2px] max-[435px]:leading-[15px]' : 'max-[435px]:text-[12px] max-[435px]:leading-[16px]'}
                                        ${isActive
                                            ? 'font-bold text-[14px] text-white'
                                            : 'font-semibold text-[14px] text-[#D2DCF7]'
                                        }`}
                                >
                                    {tab.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default function TabSection() {
    return (
        <Suspense fallback={<div className="w-full h-[50px] bg-[#0C1F56] rounded-[6px]" />}>
            <TabSectionContent />
        </Suspense>
    );
}
