"use client";
import Image from 'next/image';
import { useRef, useState } from 'react';


const recentWinners = [
    { id: 1, game: "Sweet Bonanza Super Scatter", user: "Alb****", time: "14:16 PM", payout: "$126.1", payoutColor: "text-[#00DD29]", image: "/winner-1.png" },
    { id: 2, game: "Honey Money Multiplier", user: "Tra****", time: "14:16 PM", payout: "$15.2", payoutColor: "text-[#00DD29]", image: "/winner-2.png" },
    { id: 3, game: "Dragon Tiger", user: "Hid******", time: "14:15 PM", payout: "$77.08", payoutColor: "text-[#00DD29]", image: "/winner-3.png" },
    { id: 4, game: "Eleven Fortune", user: "Gin***", time: "14:15 PM", payout: "$0.00", payoutColor: "text-[#7795E8]", image: "/winner-4.png" },
    { id: 5, game: "Honey Money Multiplier", user: "Tra****", time: "14:15 PM", payout: "$11.23", payoutColor: "text-[#00DD29]", image: "/winner-5.png" },
    { id: 6, game: "XO Paradise", user: "Amr******", time: "14:15 PM", payout: "$67.88", payoutColor: "text-[#00DD29]", image: "/winner-6.png" },
];

export default function RecentWinnerSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            const maxScroll = scrollWidth - clientWidth;
            if (maxScroll > 0) {
                setScrollProgress(scrollLeft / maxScroll);
            } else {
                setScrollProgress(0);
            }
        }
    };

    return (
        <section className="w-full flex flex-col gap-[20px] mb-[20px] sm:mb-[30px] lg:mb-[20px]">
            <div className="w-full flex items-center justify-between h-[23px] md:h-[30px]">
                <div className="flex items-center gap-[7.2px] md:gap-[12px]">
                    <div className="flex items-center justify-center w-[18px] h-[18px] md:w-[30px] md:h-[30px] shrink-0">
                        <div
                            className="w-full h-full bg-[#FFC83D]"
                            style={{
                                WebkitMaskImage: 'url(/winners.svg)',
                                WebkitMaskSize: 'contain',
                                WebkitMaskRepeat: 'no-repeat',
                                WebkitMaskPosition: 'center',
                                maskImage: 'url(/winners.svg)',
                                maskSize: 'contain',
                                maskRepeat: 'no-repeat',
                                maskPosition: 'center'
                            }}
                        />
                    </div>
                    <h2 className="w-[151px] md:w-auto font-['Jost'] font-extrabold text-[16px] md:text-[20px] leading-[23px] md:leading-[29px] tracking-[0.01em] text-white m-0">
                        RECENT WINNERS
                    </h2>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                <div className="min-w-[610px] w-full flex flex-col">
                    <div className="flex items-center px-[12px] md:px-[24px] w-full h-[14px] md:h-[20px] mb-[8px] md:mb-[12px] gap-[40px] md:gap-[12px] xl:justify-between xl:gap-0">
                        <div className="w-[220px] xl:w-auto xl:flex-1 shrink-0 font-['Jost'] font-bold text-[10px] md:text-[14px] leading-[14px] md:leading-[20px] tracking-[0.02em] uppercase text-white md:text-white/50">
                            GAME
                        </div>
                        <div className="flex items-center gap-[8.41px] md:gap-[12px] xl:gap-[12px] flex-1 xl:flex-none xl:w-[624px] shrink-0 font-['Jost'] font-bold text-[9.81px] md:text-[14px] leading-[14px] md:leading-[20px] tracking-[0.02em] uppercase text-white md:text-white/50">
                            <div className="w-[189.18px] md:w-[180px] xl:w-[300px] shrink-0">USERNAME</div>
                            <div className="w-[60px] md:w-[100px] xl:w-[150px] shrink-0">TIME</div>
                            <div className="w-[60px] md:w-[80px] xl:w-[150px] text-right shrink-0">PAYOUT</div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-[8px]">
                        {recentWinners.map((winner) => (
                            <div
                                key={winner.id}
                                className="w-full bg-[#0C1F56] rounded-[5.61px] md:rounded-[8px] px-[12px] md:px-[24px] py-[8.41px] md:py-0 h-[42px] md:h-[60px] flex items-center gap-[40px] md:gap-[12px] xl:justify-between xl:gap-0"
                            >
                                <div className="flex items-center gap-[8.41px] md:gap-[12px] w-[220px] xl:w-auto xl:flex-1 shrink-0 min-w-0">
                                    <div className="w-[15.42px] md:w-[22px] h-[21.03px] md:h-[30px] rounded-[1.26px] md:rounded-[1.8px] shrink-0 relative overflow-hidden bg-[#CDCDCD]">
                                        <Image src={winner.image} alt={winner.game} fill className="object-cover" sizes="(max-width: 768px) 15px, 22px" />
                                    </div>
                                    <span className="font-['Manrope'] font-semibold text-[12px] md:text-[14px] leading-[16px] md:leading-[19px] tracking-[0.02em] text-white truncate">
                                        {winner.game}
                                    </span>
                                </div>

                                <div className="flex items-center gap-[8.41px] md:gap-[12px] xl:gap-[12px] flex-1 xl:flex-none xl:w-[624px] shrink-0">
                                    <span className="w-[189.18px] md:w-[180px] xl:w-[300px] font-['Manrope'] font-semibold text-[12px] md:text-[14px] leading-[16px] md:leading-[19px] tracking-[0.02em] text-white truncate shrink-0">
                                        {winner.user}
                                    </span>
                                    <span className="w-[60px] md:w-[100px] xl:w-[150px] font-['Manrope'] font-semibold text-[12px] md:text-[14px] leading-[16px] md:leading-[19px] tracking-[0.02em] text-white shrink-0">
                                        {winner.time}
                                    </span>
                                    <span className={`w-[60px] md:w-[80px] xl:w-[150px] font-['Manrope'] font-semibold text-[12px] md:text-[14px] leading-[16px] md:leading-[19px] tracking-[0.02em] text-right shrink-0 ${winner.payoutColor}`}>
                                        {winner.payout}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full h-[12px] relative flex items-center md:hidden">
                <div className="absolute w-full h-[10.29px] left-0 bg-[#D2DCF7] rounded-[100px]" />
                <div
                    className="absolute w-[52.75%] h-[12px] bg-[#1463FF] rounded-[100px]"
                    style={{ left: `${scrollProgress * (100 - 52.75)}%` }}
                />
            </div>
        </section>
    );
}
