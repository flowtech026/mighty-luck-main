'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';

const collectionData = [
    { id: 1, title: 'MYTHOLOGY', image: '/games/c-1.png' },
    { id: 2, title: 'FRUITS', image: '/games/c-2.png' },
    { id: 3, title: 'ANIMALS', image: '/games/c-3.png' },
    { id: 4, title: 'ASIAN', image: '/games/c-4.png' },
    { id: 5, title: 'EGYPTIAN', image: '/games/c-1.png' }
];

interface CollectionSectionProps {
    hideHeader?: boolean;
}

function CollectionSectionContent({ hideHeader }: CollectionSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const cardGap = 12;

    const handleViewAll = () => {
        const params = new URLSearchParams(searchParams?.toString());
        params.set('tab', 'collection');
        router.push(`${pathname}?${params.toString()}`);
    };

    useEffect(() => {
        const updateVisible = () => {
            if (!containerRef.current) return;
            const w = containerRef.current.offsetWidth;
            const count = w >= 900 ? 3 : w >= 560 ? 2 : 1;
            setVisibleCount(count);
        };
        updateVisible();
        const ro = new ResizeObserver(updateVisible);
        if (containerRef.current) ro.observe(containerRef.current);
        return () => ro.disconnect();
    }, []);

    const cardWidth = containerRef.current
        ? Math.floor((containerRef.current.offsetWidth - cardGap * (visibleCount - 1)) / visibleCount)
        : 316;

    const cardStep = cardWidth + cardGap;
    const maxIndex = Math.max(0, collectionData.length - visibleCount);

    useEffect(() => {
        setCurrentIndex((prev) => Math.min(prev, maxIndex));
    }, [maxIndex]);

    const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
    const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));

    return (
        <section ref={containerRef} className="w-full flex flex-col gap-[20px]">
            {!hideHeader && (
                <div className="w-full flex flex-row justify-between items-center h-[23px] md:h-[30px]">
                    <div className="flex flex-row items-center gap-[7.2px] md:gap-[12px] h-[23px] md:h-[30px]">
                        <div className="flex items-center justify-center w-[18px] h-[18px] md:w-[30px] md:h-[30px] shrink-0">
                            <Image src="/collections.svg" alt="Collections" width={30} height={30} className="w-full h-full object-contain" />
                        </div>
                        <h2 className="font-['Jost'] font-extrabold text-[16px] md:text-[20px] leading-[23px] md:leading-[30px] tracking-[0.01em] text-white uppercase whitespace-nowrap m-0">
                            COLLECTIONS (17)
                        </h2>
                    </div>
                    <div className="flex items-center gap-3 md:gap-[12px]">
                        {/* <span
                            onClick={handleViewAll}
                            className="flex font-['Manrope'] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-[#FFBF1F] md:text-[#D2DCF7] cursor-pointer hover:text-white transition-colors whitespace-nowrap"
                        >
                            View all
                        </span> */}
                        <div className="hidden md:flex gap-[4px]">
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

            <div className="relative w-full overflow-x-auto md:overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory">
                <div
                    className="flex gap-[8px] md:gap-[12px] h-[60px] sm:h-[90px] md:h-[100px] transition-transform duration-300 ease-in-out w-max"
                    style={{ transform: visibleCount === 1 ? 'none' : `translateX(-${currentIndex * cardStep}px)` }}
                >
                    {collectionData.map((collection) => (
                        <div
                            key={collection.id}
                            style={{
                                width: visibleCount === 1
                                    ? (collection.title === 'MYTHOLOGY' ? '183px' : collection.title === 'FRUITS' ? '182px' : '189.6px')
                                    : `${cardWidth}px`
                            }}
                            className={`h-[60px] md:h-full bg-[#0C1F56] hover:bg-[#173EAD] transition-colors rounded-[8px] md:rounded-[12px] flex items-center pl-[7.2px] pr-[14.4px] py-[7.2px] md:pl-[12px] md:pr-[16px] md:py-[12px] gap-[7.2px] md:gap-[12px] shrink-0 snap-start cursor-pointer group`}
                        >
                            <div className="w-[45.6px] md:w-[76px] h-[45.6px] md:h-[76px] rounded-[4.8px] md:rounded-[8px] bg-[#0E1B3D] overflow-hidden flex-none shrink-0 flex items-center justify-center relative">
                                <div className="absolute w-[42px] md:w-[50px] h-[42px] md:h-[50px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1463FF] blur-[13.125px] md:blur-[22px] rounded-full z-0" />
                                <div className="absolute invisible w-[31.8px] h-[31.8px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFC83D] rounded-full z-[1]" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42.75px] md:w-full h-[40.2px] md:h-full z-10 flex items-center justify-center">
                                    <Image
                                        src={collection.image}
                                        alt={collection.title}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 43px, 76px"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0 flex items-center justify-center">
                                <span className={`font-['Jost'] font-extrabold text-white tracking-[0.01em] text-center ${visibleCount === 1 ? (collection.title === 'MYTHOLOGY' || collection.title === 'FRUITS' ? 'text-[12px] leading-[17px]' : 'text-[13.2px] leading-[19px]') : 'text-[16px] md:text-[20px] lg:text-[22px] leading-tight truncate'}`}>
                                    {collection.title}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function CollectionSection({ hideHeader }: CollectionSectionProps) {
    return (
        <Suspense fallback={null}>
            <CollectionSectionContent hideHeader={hideHeader} />
        </Suspense>
    );
}
