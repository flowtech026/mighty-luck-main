"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const promos = [
    {
        id: 1,
        title: "150% RELOAD BONUS\n+ 50 FREE SPINS",
        cta: "Claim Now",
        bg: "/pp-1.png",
        gradient: "linear-gradient(90deg, #091741 21.96%, rgba(9, 23, 65, 0) 60.27%)",
        mobileGradient: "linear-gradient(90deg, #091741 48%, rgba(9,23,65,0.75) 62%, rgba(9,23,65,0.25) 80%, rgba(9,23,65,0) 100%)",
    },
    {
        id: 2,
        title: "150% RELOAD BONUS\n+ 50 FREE SPINS",
        cta: "Claim Now",
        bg: "/pp-2.png",
        gradient: "linear-gradient(90deg, #060B4D 39.55%, rgba(6, 11, 77, 0) 50%)",
        mobileGradient: "linear-gradient(90deg, #060B4D 48%, rgba(6,11,77,0.75) 62%, rgba(6,11,77,0.25) 80%, rgba(6,11,77,0) 100%)",
    },
    {
        id: 3,
        title: "150% RELOAD BONUS\n+ 50 FREE SPINS",
        cta: "Claim Now",
        bg: "/pp-1.png",
        gradient: "linear-gradient(90deg, #091741 21.96%, rgba(9, 23, 65, 0) 60.27%)",
        mobileGradient: "linear-gradient(90deg, #091741 48%, rgba(9,23,65,0.75) 62%, rgba(9,23,65,0.25) 80%, rgba(9,23,65,0) 100%)",
    },
];

export default function PromotionSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const handleScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    };

    const scrollLeft = () => {
        const el = scrollRef.current;
        if (el && el.firstElementChild) {
            const scrollBy = el.firstElementChild.clientWidth + 12; // Card width + gap
            el.scrollBy({ left: -scrollBy, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        const el = scrollRef.current;
        if (el && el.firstElementChild) {
            const scrollBy = el.firstElementChild.clientWidth + 12;
            el.scrollBy({ left: scrollBy, behavior: "smooth" });
        }
    };

    return (
        <div className="flex flex-col items-start gap-[14.81px] sm:gap-5 w-full flex-none">

            <div className="flex flex-row justify-between items-center w-full h-[23px] sm:h-[30px] flex-none px-0 sm:pr-[20px] md:pr-0">

                <div className="flex flex-row items-center gap-[7.2px] sm:gap-[12px] w-[140.2px] sm:w-auto h-[23px] sm:h-[30px]">
                    <div className="w-[18px] h-[18px] sm:w-[30px] sm:h-[30px] shrink-0 relative flex-none">
                        <Image src="/pro.svg" alt="Promotions" fill className="object-contain" />
                    </div>
                    <span className="w-[115px] sm:w-auto font-[family-name:var(--font-jost)] font-extrabold text-[16px] sm:text-[20px] leading-[23px] sm:leading-[29px] tracking-[0.01em] uppercase text-white select-none">
                        PROMOTIONS
                    </span>
                </div>

                <div className="hidden sm:flex flex-row items-center gap-[8px]">
                    <button
                        onClick={scrollLeft}
                        disabled={!canScrollLeft}
                        className={`flex items-center justify-center w-[30px] h-[30px] rounded-[4px] transition-all cursor-pointer ${canScrollLeft ? "bg-[#112F82] hover:bg-[#1463FF]" : "bg-[#112F82] opacity-40"
                            }`}
                        aria-label="Previous promotion"
                    >
                        <ChevronLeft size={16} color="white" />
                    </button>
                    <button
                        onClick={scrollRight}
                        disabled={!canScrollRight}
                        className={`flex items-center justify-center w-[30px] h-[30px] rounded-[4px] transition-all cursor-pointer ${canScrollRight ? "bg-[#112F82] hover:bg-[#1463FF]" : "bg-[#112F82] opacity-40"
                            }`}
                        aria-label="Next promotion"
                    >
                        <ChevronRight size={16} color="white" />
                    </button>
                </div>

            </div>

            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex flex-row items-center gap-[8px] sm:gap-3 w-full h-[163px] sm:h-[220px] flex-none overflow-x-auto scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                {promos.map((promo) => (
                    <div
                        key={promo.id}
                        className="relative w-full sm:w-[400px] md:w-[560px] h-[163px] sm:h-[200px] md:h-[220px] rounded-[8px] sm:rounded-[16px] flex-none overflow-hidden snap-start snap-always shrink-0"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-right bg-no-repeat  rounded-[10px] sm:rounded-none"
                            style={{ backgroundImage: `url('${promo.bg}')` }}
                        />


                        <div
                            className="absolute inset-0 rounded-[10px] block sm:hidden"
                            style={{ background: promo.mobileGradient }}
                        />

                        <div
                            className="absolute inset-0 rounded-none hidden sm:block"
                            style={{ background: promo.gradient }}
                        />

                        <div
                            className="absolute rounded-full pointer-events-none block sm:hidden"
                            style={{
                                width: "118.52px",
                                height: "118.52px",
                                left: "-55.56px",
                                top: "-57.48px",
                                background: "#1463FF",
                                filter: "blur(37.037px)",
                            }}
                        />

                        <div
                            className="absolute rounded-full pointer-events-none hidden sm:block"
                            style={{
                                width: "160px",
                                height: "160px",
                                left: "-75px",
                                top: "-77.6px",
                                background: "#1463FF",
                                filter: "blur(50px)",
                                opacity: 0.7,
                            }}
                        />

                        <div className="relative z-[2] w-full h-full p-[17.78px] sm:p-[24px] flex flex-col justify-center items-start pointer-events-none">
                            <div className="flex flex-col items-start gap-[12px] sm:gap-[16px] w-[141px] h-[97.55px] sm:h-auto sm:w-full sm:max-w-[290px] flex-none pointer-events-auto">

                                <h3 className="font-[family-name:var(--font-jost)] font-extrabold text-[14px] leading-[120%] tracking-[0.01em] text-white w-[141px] h-[51px] whitespace-normal block sm:hidden">
                                    {promo.title}
                                </h3>

                                <h3
                                    className="font-[family-name:var(--font-jost)] font-extrabold text-[18px] sm:text-[24px] leading-[120%] tracking-[0.01em] text-white w-full hidden sm:block"
                                    style={{ whiteSpace: "pre-line" }}
                                >
                                    {promo.title}
                                </h3>

                                <button className="flex flex-row items-center justify-center px-[20.73px] py-[8.64px] gap-[8.64px] w-[95px] h-[34.55px] bg-[#FFBF1F] hover:bg-[#FFD966] rounded-[6px] transition-colors cursor-pointer flex-none sm:hidden">
                                    <span className="font-[family-name:var(--font-manrope)] font-bold text-[12.09px] leading-[17px] tracking-[0.02em] text-[#1A1404] flex items-center justify-center whitespace-nowrap flex-none">
                                        {promo.cta}
                                    </span>
                                </button>

                                <button className="hidden sm:flex flex-row items-center justify-center px-[16px] sm:px-[24px] py-[8px] sm:py-[10px] gap-[10px] bg-[#FFC83D] hover:bg-[#FFD966] rounded-[8px] transition-colors cursor-pointer flex-none">
                                    <span className="font-[family-name:var(--font-manrope)] font-bold text-[13px] sm:text-[14px] leading-[19px] tracking-[0.02em] text-[#1A1404] flex items-center justify-center whitespace-nowrap flex-none">
                                        {promo.cta}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
