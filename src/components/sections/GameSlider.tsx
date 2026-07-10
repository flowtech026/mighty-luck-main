"use client";

import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useRef, useState } from 'react';

export interface Game {
    id: number | string;
    title: string;
    image: string;
}

export interface GameSliderProps {
    id?: string;
    title: string;
    icon: React.ReactNode;
    games: Game[];
    viewAllTab?: string;
}

export function GameSliderContent({ id, title, icon, games, viewAllTab }: GameSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(7);
    const [cardStep, setCardStep] = useState(164); // Default desktop (152 + 12)
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { status } = useSession();

    const handleGameClick = (gameId: string | number) => {
        const params = new URLSearchParams(searchParams?.toString());
        if (status === 'authenticated') {
            params.set('game', gameId.toString());
        } else {
            params.set('auth', 'login');
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleViewAll = () => {
        if (viewAllTab) {
            router.push(`/${viewAllTab}`);
        }
    };

    const [isMobile, setIsMobile] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isDragged, setIsDragged] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startScrollLeft, setStartScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setIsDragged(false);
        if (trackRef.current) {
            setStartX(e.pageX - trackRef.current.offsetLeft);
            setStartScrollLeft(trackRef.current.scrollLeft);
        }
    };

    const handleMouseLeave = () => setIsDragging(false);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !trackRef.current) return;
        e.preventDefault();
        setIsDragged(true);
        const x = e.pageX - trackRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        trackRef.current.scrollLeft = startScrollLeft - walk;
    };

    useEffect(() => {
        const updateVisible = () => {
            if (containerRef.current) {
                const isMobileView = window.innerWidth < 640;
                setIsMobile(isMobileView);
                const cWidth = isMobileView ? 121.6 : 152;
                const cGap = isMobileView ? 8 : 12;
                const step = cWidth + cGap;
                setCardStep(step);

                const w = containerRef.current.offsetWidth;
                const count = Math.floor((w + cGap) / step);
                setVisibleCount(Math.max(2, count));
            }
        };
        updateVisible();
        const ro = new ResizeObserver(updateVisible);
        if (containerRef.current) ro.observe(containerRef.current);
        window.addEventListener('resize', updateVisible);

        return () => {
            ro.disconnect();
            window.removeEventListener('resize', updateVisible);
        };
    }, []);

    const maxIndex = Math.max(0, games.length - visibleCount);

    const handlePrev = () => {
        if (trackRef.current) {
            const newIndex = Math.max(currentIndex - 1, 0);
            trackRef.current.scrollTo({ left: newIndex * cardStep, behavior: 'smooth' });
        }
    };

    const handleNext = () => {
        if (trackRef.current) {
            const newIndex = Math.min(currentIndex + 1, maxIndex);
            trackRef.current.scrollTo({ left: newIndex * cardStep, behavior: 'smooth' });
        }
    };

    const handleScroll = () => {
        if (trackRef.current) {
            const index = Math.round(trackRef.current.scrollLeft / cardStep);
            setCurrentIndex(index);
        }
    };

    return (
        <div id={id} ref={containerRef} className="flex flex-col gap-[20px] w-full overflow-hidden">
            <div className="flex items-center justify-between w-full h-[23px] sm:h-[30px]">
                <div className="flex items-center gap-[7.2px] sm:gap-[12px] h-[23px] sm:h-[30px]">
                    <div className="flex items-center justify-center w-[18px] h-[18px] sm:w-[30px] sm:h-[30px] shrink-0 [&>img]:w-full [&>img]:h-full [&>img]:object-contain">
                        {icon}
                    </div>
                    <span className="font-['Jost'] text-[13px] min-[375px]:text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-extrabold leading-[23px] sm:leading-[100%] tracking-[0.01em] text-white uppercase whitespace-nowrap">
                        {title}
                    </span>
                </div>
                <div className="flex items-center gap-3 md:gap-[20px]">
                    <span
                        onClick={handleViewAll}
                        className="font-['Manrope'] font-bold sm:font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#FFBF1F] sm:text-[#D2DCF7] cursor-pointer hover:text-white transition-colors whitespace-nowrap flex w-[46px] sm:w-[45px] h-[16px] items-center justify-center"
                    >
                        View all
                    </span>
                    <div className="hidden sm:flex items-center gap-[4px]">
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

            <div className="w-full relative">
                <div
                    ref={trackRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onScroll={handleScroll}
                    className={`flex gap-[8px] sm:gap-[12px] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
                >
                    {games.map((game) => (
                        <div
                            key={game.id}
                            onClick={(e) => {
                                if (isDragged) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                } else {
                                    handleGameClick(game.id);
                                }
                            }}
                            className="w-[121.6px] sm:w-[152px] h-[160px] sm:h-[200px] bg-[#0C1F56] rounded-[9.6px] sm:rounded-[16px] flex flex-col items-center justify-center overflow-hidden relative group shrink-0 hover:z-10 snap-start"
                        >
                            <Image
                                src={game.image}
                                alt={game.title}
                                fill
                                className="object-cover z-0"
                                sizes="(max-width: 640px) 121.6px, 152px"
                            />
                            <div className="absolute inset-0 bg-black/60 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="absolute w-[19.2px] h-[19.2px] sm:w-[24px] sm:h-[24px] top-[9.6px] sm:top-[12px] right-[11.2px] sm:right-[12px] text-white hover:text-[#FFC83D] transition-colors flex items-center justify-center">
                                    <Heart size={19.2} strokeWidth={2} className="w-[19.2px] h-[19.2px] sm:w-[20px] sm:h-[20px]" />
                                </button>
                                <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38.4px] h-[38.4px] sm:w-[44px] sm:h-[44px] bg-[#FFC83D] rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                                    <div className="w-0 h-0 border-t-[5.6px] sm:border-t-[7px] border-t-transparent border-l-[9.6px] sm:border-l-[11px] border-l-[#0C1F56] border-b-[5.6px] sm:border-b-[7px] border-b-transparent ml-[2.4px] sm:ml-[3px]" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function GameSlider(props: GameSliderProps) {
    return (
        <Suspense fallback={null}>
            <GameSliderContent {...props} />
        </Suspense>
    );
}