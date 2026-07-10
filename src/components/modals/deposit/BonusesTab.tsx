import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Info } from "lucide-react";
import { toast } from "sonner";
import { Bonus, Payment } from "./types";
import { RenderBonusIcon } from "./shared";

interface BonusesTabProps {
  promoCode: string;
  setPromoCode: (code: string) => void;
  isPromoApplied: boolean;
  setIsPromoApplied: (applied: boolean) => void;
  selectedPayment: Payment;
  setFiatStep: (step: "address" | "payment" | "success") => void;
  setActiveTab: (tab: "deposit" | "bonuses" | "withdraw" | "transactions") => void;
  fiatAmount: number | "custom";
}

export default function BonusesTab({
  promoCode,
  setPromoCode,
  isPromoApplied,
  setIsPromoApplied,
  selectedPayment,
  setFiatStep,
  setActiveTab,
  fiatAmount,
}: BonusesTabProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const slideWidth = 308; // width (300px) + gap (8px)
    const newIndex = Math.round(e.currentTarget.scrollLeft / slideWidth);
    if (newIndex !== activeSlide) setActiveSlide(newIndex);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (sliderRef.current) {
      sliderRef.current.style.scrollBehavior = "auto";
      sliderRef.current.style.scrollSnapType = "none";
    }
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.style.scrollBehavior = "smooth";
      sliderRef.current.style.scrollSnapType = "x mandatory";
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.style.scrollBehavior = "smooth";
      sliderRef.current.style.scrollSnapType = "x mandatory";
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        slider.scrollLeft += e.deltaY;
      }
    };

    slider.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      slider.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const scrollToSlide = (index: number) => {
    setActiveSlide(index);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: index * 308,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col items-center p-[20px_16px] gap-[16px] w-full bg-[#0C1F56] rounded-[16px] z-20 relative h-auto sm:h-[434px] max-[639px]:flex-1 max-[639px]:overflow-y-auto max-[639px]:min-h-0 overflow-hidden">
      {isPromoApplied ? (
        <>
          {/* Inner Form Card (428x328 in Figma) */}
          <div className="flex flex-col justify-center items-center p-[16px] gap-[20px] w-full sm:w-[428px] h-auto sm:h-[328px] bg-[#112F82] rounded-[12px] shrink-0">
            {/* Top Row: Coupon applied header */}
            <div className="flex flex-row items-center gap-[12px] w-full h-[40px] shrink-0">
              <div className="w-[40px] h-[40px] bg-[#1463FF] rounded-[8px] flex items-center justify-center shrink-0">
                <Image src="/tick.svg" width={20} height={20} alt="Coupon Applied" className="w-[20px] h-[20px] object-contain" />
              </div>
              <div className="flex flex-col items-start gap-[4px] flex-1 min-w-0">
                <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                  Coupon applied
                </span>
                <span className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#A5B8EF] truncate w-full">
                  Your bonus is now attached to your next deposit
                </span>
              </div>
            </div>

            {/* Active Bonus Summary */}
            <div className="flex flex-col items-start gap-[8px] w-full shrink-0">
              <span className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
                Active Bonus
              </span>
              <div className="flex flex-col items-start gap-[4px] w-full">
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                    150% Reload Bonus + 30 Free Spins
                  </span>
                  <Info size={16} className="text-[#A5B8EF] shrink-0 cursor-pointer" />
                </div>
                <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-[#FFC83D]">
                  {promoCode.trim() ? promoCode : "PROMO2026"}
                </span>
              </div>
            </div>

            {/* Details Box with Dashed Lines */}
            <div className="flex flex-col items-start gap-[8px] w-full shrink-0">
              <div className="flex flex-row justify-between items-center w-full h-[16px]">
                <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#A5B8EF]">
                  Min. Deposit
                </span>
                <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white text-right">
                  $30
                </span>
              </div>
              <div className="w-full border-t border-dashed border-[#193EA5]" />
              <div className="flex flex-row justify-between items-center w-full h-[16px]">
                <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#A5B8EF]">
                  Max. Cashout
                </span>
                <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white text-right">
                  40x
                </span>
              </div>
              <div className="w-full border-t border-dashed border-[#193EA5]" />
              <div className="flex flex-row justify-between items-center w-full h-[16px]">
                <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#A5B8EF]">
                  Wager
                </span>
                <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white text-right">
                  10x
                </span>
              </div>
            </div>

            {/* Yellow Button (396x50 in Figma inside 428 Card) */}
            <button
              onClick={() => {
                setActiveTab("deposit");
                if (selectedPayment.id === "fiat") setFiatStep("payment");
              }}
              className="flex flex-row justify-center items-center px-[30px] py-[10px] w-full sm:w-[396px] h-[50px] bg-[#FFC83D] hover:bg-[#F2B926] transition-colors rounded-[8px] shrink-0"
            >
              <span className="font-[family-name:var(--font-manrope)] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-[#1A1404]">
                Continue to deposit
              </span>
            </button>
          </div>

          {/* Dark Blue Button (428x50 in Figma directly under inner card) */}
          <button
            onClick={() => {
              setIsPromoApplied(false);
              setPromoCode("");
            }}
            className="flex flex-row justify-center items-center px-[30px] py-[10px] w-full sm:w-[428px] h-[50px] bg-[#112F82] hover:bg-[#1A3FA6] transition-colors rounded-[8px] shrink-0"
          >
            <span className="font-[family-name:var(--font-manrope)] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-[#D2DCF7]">
              Change coupon
            </span>
          </button>
        </>
      ) : (
        <>
          <div className="flex flex-col items-start gap-[8px] w-full">
            <label className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">If you have a Bonus Code — enter it here</label>
            <div className="flex flex-row items-center gap-[8px] w-full h-[40px]">
              <div className="flex-1 h-[40px] bg-[#112F82] rounded-[8px] px-[16px] flex flex-row items-center justify-between border border-transparent focus-within:border-[#1463FF] transition-colors">
                <input
                  type="text"
                  placeholder="Promo Code"
                  spellCheck="false"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full h-full bg-transparent font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder:text-[#7795E8] outline-none"
                />
              </div>
              <button
                onClick={() => {
                  if (promoCode.trim()) {
                    setIsPromoApplied(true);
                    toast.success("Coupon applied");
                  } else {
                    toast.error("Please enter a valid promo code");
                  }
                }}
                className="flex flex-row justify-center items-center h-[40px] bg-[#FFC83D] hover:bg-[#F2B926] rounded-[8px] transition-colors shrink-0 px-[30px] py-[10px] gap-[10px] w-[100px]"
              >
                <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-[#1A1404]">
                  Apply
                </span>
              </button>
            </div>
          </div>

          <div className="flex flex-col items-start gap-[12px] w-full">
            <span className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">Available bonuses for you</span>

            <div
              ref={sliderRef}
              onScroll={handleScroll}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className={`flex flex-row items-start gap-[8px] w-full overflow-x-auto [&::-webkit-scrollbar]:hidden snap-x snap-mandatory scroll-smooth ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            >
              {[0, 1, 2].map((item, idx) => (
                <div key={item} className="flex flex-col justify-center items-start p-[20px] gap-[12px] w-[calc(100vw-90px)] min-[425px]:w-[300px] max-w-[300px] h-[205px] bg-[#112F82] rounded-[12px] shrink-0 snap-center">
                  <div className="flex flex-row justify-center items-center p-0 gap-[10px] w-full h-[20px] shrink-0">
                    <span className="font-[family-name:var(--font-jost)] font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white truncate w-full">150% Reload Bonus + 30 Free Spins</span>
                  </div>
                  <div className="flex flex-col gap-[9px] w-full h-[81px] shrink-0">
                    <div className="flex flex-row gap-[12px] w-full h-[36px]">
                      <div className="flex flex-col gap-[2px] w-[124px] h-[36px] flex-1 min-w-0">
                        <div className="flex flex-row justify-center items-center p-0 gap-[10px] w-full h-[14px]">
                          <span className="font-[family-name:var(--font-manrope)] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#BBCAF3] truncate w-full">Min. Deposit</span>
                        </div>
                        <div className="flex flex-row justify-center items-center p-0 gap-[10px] w-full h-[20px]">
                          <span className="font-[family-name:var(--font-jost)] font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white truncate w-full">$30</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-[2px] w-[124px] h-[36px] flex-1 min-w-0">
                        <div className="flex flex-row justify-center items-center p-0 gap-[10px] w-full h-[14px]">
                          <span className="font-[family-name:var(--font-manrope)] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#BBCAF3] truncate w-full">Max. Cashout</span>
                        </div>
                        <div className="flex flex-row justify-center items-center p-0 gap-[10px] w-full h-[20px]">
                          <span className="font-[family-name:var(--font-jost)] font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white truncate w-full">40x</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row gap-[12px] w-full h-[36px]">
                      <div className="flex flex-col gap-[2px] w-[124px] h-[36px] flex-1 min-w-0">
                        <div className="flex flex-row justify-center items-center p-0 gap-[10px] w-full h-[14px]">
                          <span className="font-[family-name:var(--font-manrope)] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#BBCAF3] truncate w-full">Max. Amount</span>
                        </div>
                        <div className="flex flex-row justify-center items-center p-0 gap-[10px] w-full h-[20px]">
                          <span className="font-[family-name:var(--font-jost)] font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white truncate w-full">$30</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-[2px] w-[124px] h-[36px] flex-1 min-w-0">
                        <div className="flex flex-row justify-center items-center p-0 gap-[10px] w-full h-[14px]">
                          <span className="font-[family-name:var(--font-manrope)] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#BBCAF3] truncate w-full">Wager (dep. + bonus)</span>
                        </div>
                        <div className="flex flex-row justify-center items-center p-0 gap-[10px] w-full h-[20px]">
                          <span className="font-[family-name:var(--font-jost)] font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white truncate w-full">10x</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsPromoApplied(true);
                      toast.success("Bonus activated!");
                    }}
                    className="flex flex-row justify-center items-center px-[20px] py-[10px] gap-[10px] w-full h-[40px] bg-[#FFC83D] hover:bg-[#F2B926] rounded-[6px] transition-colors shrink-0"
                  >
                    <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-[#1A1404]">Activate</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-row justify-center items-center gap-[4px] w-full h-[6px]">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSlide(idx)}
                  className={`h-[6px] bg-[#BBCAF3] rounded-full transition-all duration-300 ${activeSlide === idx ? "w-[12px]" : "w-[6px]"}`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
