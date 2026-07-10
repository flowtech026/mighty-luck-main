"use client";

import providerData from '@/data/providerData.json';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';

interface ProviderSectionProps {
    hideHeader?: boolean;
}

function ProviderSectionContent({ hideHeader }: ProviderSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(7);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Responsive initial count for grid mode: 9 on mobile, 16 on desktop
    const getGridInitial = () => (typeof window !== 'undefined' && window.innerWidth < 640) ? 9 : 16;
    const [gridVisible, setGridVisible] = useState(getGridInitial);

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth < 640;
            setGridVisible((prev) => {
                const newInitial = isMobile ? 9 : 16;
                return prev <= 16 ? newInitial : prev;
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const cardWidth = 152;
    const cardGap = 12;
    const cardStep = cardWidth + cardGap;

    const handleViewAll = () => {
        router.push('/providers');
    };

    useEffect(() => {
        const updateVisible = () => {
            if (containerRef.current) {
                const w = containerRef.current.offsetWidth;
                const count = Math.floor((w + cardGap) / cardStep);
                setVisibleCount(Math.max(2, count));
            }
        };
        updateVisible();
        const ro = new ResizeObserver(updateVisible);
        if (containerRef.current) ro.observe(containerRef.current);
        return () => ro.disconnect();
    }, [cardStep]);

    const maxIndex = Math.max(0, providerData.length - visibleCount);

    const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
    const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));

    useEffect(() => {
        setCurrentIndex((prev) => Math.min(prev, maxIndex));
    }, [maxIndex]);

    const displayedProviders = providerData.slice(0, gridVisible);
    const progressPercent = Math.min(100, Math.max(5, (displayedProviders.length / (providerData.length || 1)) * 100));

    return (
        <div ref={containerRef} className="flex flex-col gap-[20px] w-full overflow-hidden">
            {!hideHeader && (
                <div className="flex flex-row justify-between items-center w-full h-[23px] md:h-[30px]">
                    <div className="flex flex-row items-center gap-[7.2px] md:gap-[12px] h-[23px] md:h-[30px]">
                        <div className="flex items-center justify-center w-[18px] h-[18px] md:w-[30px] md:h-[30px] shrink-0">
                            <Image src="/gameprovider.svg" alt="Providers" width={30} height={30} className="w-full h-full object-contain" />
                        </div>
                        <h2 className="font-['Jost'] text-[16px] md:text-[20px] font-extrabold leading-[23px] md:leading-[30px] tracking-[0.01em] text-white uppercase whitespace-nowrap">
                            GAME PROVIDERS (34)
                        </h2>
                    </div>
                    <div className="flex items-center gap-3 md:gap-[12px]">
                        <span 
                            onClick={handleViewAll}
                            className="flex font-['Manrope'] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-[#FFBF1F] md:text-[#D2DCF7] cursor-pointer hover:text-white transition-colors whitespace-nowrap"
                        >
                            View all
                        </span>
                        <div className="hidden md:flex items-center gap-[4px]">
                            <button
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                                className={`flex items-center justify-center w-[30px] h-[30px] rounded-[8px] transition-colors shrink-0 ${currentIndex === 0 ? 'bg-[#0C1F56] text-white/50 cursor-not-allowed' : 'bg-[#112F82] hover:bg-[#1463FF] text-white'}`}
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentIndex === maxIndex}
                                className={`flex items-center justify-center w-[30px] h-[30px] rounded-[8px] transition-colors shrink-0 ${currentIndex === maxIndex ? 'bg-[#0C1F56] text-white/50 cursor-not-allowed' : 'bg-[#112F82] hover:bg-[#1463FF] text-white'}`}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {hideHeader ? (
                <>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-[8px] md:gap-[12px] w-full">
                        {displayedProviders.map((provider) => (
                            <div
                                key={provider.id}
                                className="w-full h-[60px] md:h-[100px] bg-[#0C1F56] hover:bg-[#173EAD] transition-colors rounded-[8px] md:rounded-[12px] flex flex-col items-center py-[7.2px] px-[14.4px] md:py-[12px] md:px-[24px] gap-[4.8px] md:gap-[8px] cursor-pointer"
                            >
                                <div className="relative w-[48px] h-[24px] md:w-full md:flex-1 flex items-center justify-center shrink-0">
                                    <img
                                        src={provider.image}
                                        alt={provider.name}
                                        className="object-contain max-w-[48px] max-h-[24px] md:max-w-full md:max-h-[40px]"
                                    />
                                </div>
                                <div className="flex flex-row justify-center items-center h-[11px] md:h-auto w-full">
                                    <span className="font-['Manrope'] font-semibold text-[8px] md:text-[10px] leading-[11px] md:leading-[100%] text-center text-[#FFC83D] whitespace-nowrap">
                                        {provider.gamesCount} Games
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Progress & Load More */}
                    <div className="flex flex-col items-center justify-center gap-3 mt-4 mb-8 w-full">
                        <div className="w-[200px] sm:w-[280px] h-[3px] bg-[#0C1F56] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#FFC83D] rounded-full transition-all duration-300"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                        <p className="font-['Manrope'] font-semibold text-[13px] sm:text-[14px] text-[#D2DCF7]">
                            You viewed <span className="text-white font-bold">{displayedProviders.length}</span> out of <span className="text-white font-bold">{providerData.length}</span> providers
                        </p>
                        {gridVisible < providerData.length && (
                            <button
                                onClick={() => setGridVisible((prev) => Math.min(prev + 16, providerData.length))}
                                className="mt-1 px-6 py-2.5 bg-[#112F82] hover:bg-[#1463FF] text-white font-['Manrope'] font-bold text-[13px] sm:text-[14px] rounded-[6px] transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-95"
                            >
                                Load More
                            </button>
                        )}
                    </div>
                </>
            ) : (
                <div className="w-full overflow-x-auto md:overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory">
                    <div
                        className="flex gap-[8px] md:gap-[12px] transition-transform duration-300 ease-out"
                        style={{ transform: `translateX(-${currentIndex * cardStep}px)` }}
                    >
                        {providerData.map((provider) => (
                            <div
                                key={provider.id}
                                className="w-[88px] md:w-[152px] h-[60px] md:h-[100px] bg-[#0C1F56] hover:bg-[#173EAD] transition-colors rounded-[8px] md:rounded-[12px] flex flex-col items-center py-[7.2px] px-[14.4px] md:py-[12px] md:px-[24px] gap-[4.8px] md:gap-[8px] shrink-0 snap-start cursor-pointer"
                            >
                                <div className="relative w-[48px] h-[24px] md:w-full md:flex-1 flex items-center justify-center shrink-0">
                                    <img
                                        src={provider.image}
                                        alt={provider.name}
                                        className="object-contain max-w-[48px] max-h-[24px] md:max-w-full md:max-h-[40px]"
                                    />
                                </div>
                                <div className="flex flex-row justify-center items-center h-[11px] md:h-auto w-full">
                                    <span className="font-['Manrope'] font-semibold text-[8px] md:text-[10px] leading-[11px] md:leading-[100%] text-center text-[#FFC83D] whitespace-nowrap">
                                        {provider.gamesCount} Games
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ProviderSection({ hideHeader }: ProviderSectionProps) {
    return (
        <Suspense fallback={null}>
            <ProviderSectionContent hideHeader={hideHeader} />
        </Suspense>
    );
}
