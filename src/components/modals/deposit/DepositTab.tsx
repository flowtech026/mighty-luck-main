import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRightLeft, ChevronDown, Info } from "lucide-react";
import { toast } from "sonner";
import { Bonus, Payment, Country } from "./types";
import { RenderBonusIcon, FiatIcons, CrownLightningIcon } from "./shared";

interface DepositTabProps {
  isPending: boolean;
  animationCompleted: boolean;
  selectedBonus: Bonus;
  setSelectedBonus: (b: Bonus) => void;
  selectedPayment: Payment;
  setSelectedPayment: (p: Payment) => void;
  isBonusOpen: boolean;
  setIsBonusOpen: (open: boolean) => void;
  isPaymentOpen: boolean;
  setIsPaymentOpen: (open: boolean) => void;
  fiatStep: "address" | "payment" | "success";
  setFiatStep: (step: "address" | "payment" | "success") => void;
  fiatAmount: number | "custom";
  setFiatAmount: (amt: number | "custom") => void;
  isCountryOpen: boolean;
  setIsCountryOpen: (open: boolean) => void;
  selectedCountry: Country;
  setSelectedCountry: (c: Country) => void;
  onClose: () => void;
  handleCompleteDeposit: () => void;
  bonuses: Bonus[];
  payments: Payment[];
  countries: Country[];
  bonusRef: React.RefObject<HTMLDivElement | null>;
  paymentRef: React.RefObject<HTMLDivElement | null>;
  countryRef: React.RefObject<HTMLDivElement | null>;
}

export default function DepositTab({
  isPending,
  animationCompleted,
  selectedBonus,
  setSelectedBonus,
  selectedPayment,
  setSelectedPayment,
  isBonusOpen,
  setIsBonusOpen,
  isPaymentOpen,
  setIsPaymentOpen,
  fiatStep,
  setFiatStep,
  fiatAmount,
  setFiatAmount,
  isCountryOpen,
  setIsCountryOpen,
  selectedCountry,
  setSelectedCountry,
  onClose,
  handleCompleteDeposit,
  bonuses,
  payments,
  countries,
  bonusRef,
  paymentRef,
  countryRef,
}: DepositTabProps) {
  const router = useRouter();

  const isFiatAddress = selectedPayment.id === "fiat" && fiatStep === "address";
  const isFiatPayment = selectedPayment.id === "fiat" && fiatStep === "payment";
  const isFiatSuccess = selectedPayment.id === "fiat" && fiatStep === "success";

  return (
    <>
      {isPending ? (
        <div className="flex flex-col items-start p-[20px_16px] gap-[16px] w-full bg-[#0C1F56] rounded-[16px] z-20 relative h-[365px] sm:h-[325px] max-[639px]:flex-1 max-[639px]:overflow-y-auto max-[639px]:min-h-0">
          <p className="font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] text-center tracking-[0.02em] text-[#A5B8EF] w-full h-[38px] flex items-center justify-center">
            Your transaction in progress and pending confirmation from the blockchain.
          </p>

          {/* Mobile Screen Loader */}
          <div className="flex sm:hidden flex-row justify-center items-center p-0 gap-[10px] w-full max-w-[342px] h-[160.16px] self-stretch flex-grow-0 mx-auto">
            <div className="relative w-[160px] h-[160.16px] flex-none flex-grow-0 flex items-center justify-center">
              {/* Circular track and spinner */}
              <div key="loader-rotating-wrapper" className="absolute inset-0 w-full h-full animate-circular-rotate">
                <svg className="w-full h-full" viewBox="0 0 160 160">
                  {/* Background Track */}
                  <circle
                    cx="80"
                    cy="80"
                    r="72"
                    className="stroke-[#112F82]"
                    strokeWidth="4.5"
                    fill="transparent"
                  />
                  {/* Animated Foreground Arc */}
                  <circle
                    cx="80"
                    cy="80"
                    r="72"
                    className="stroke-[#FFC83D] animate-circular-fill"
                    strokeWidth="4.5"
                    strokeDasharray="452.39"
                    strokeDashoffset="452.39"
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
              </div>

              {/* Gold Crown Logo in the center */}
              <div className="relative z-10 w-[73px] h-[53px] flex items-center justify-center">
                <Image
                  src="/king.svg"
                  alt="Crown"
                  width={73}
                  height={53}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Desktop Screen Loader */}
          <div className="hidden sm:flex flex-row justify-center items-center gap-[10px] w-full h-[120px]">
            <div className="w-[50px] h-[50px] flex items-center justify-center relative">
              <CrownLightningIcon className="text-[#A5B8EF] w-[35.83px] h-[26.13px]" />
            </div>
            <div className="w-[50px] h-[50px] flex items-center justify-center relative">
              <CrownLightningIcon className="text-[#A5B8EF] w-[35.83px] h-[26.13px]" />
            </div>
            <div className="w-[50px] h-[50px] flex items-center justify-center relative">
              <CrownLightningIcon className="text-[#112F82] w-[35.83px] h-[26.13px]" />
            </div>
          </div>

          <div className="flex flex-row items-center p-0 gap-[8px] w-full h-[95px] shrink-0 z-[2]">
            <p className="font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] text-center tracking-[0.02em] text-[#A5B8EF] w-full">
              1 confirmation is required for deposits to be credited.<br />Want to know how many confirmations this transaction has?<br />Please <span className="text-[#FFC83D] cursor-pointer hover:underline ml-[4.5px]">click here</span>.
            </p>
          </div>
        </div>
      ) : (
        <div className={`flex flex-col items-start p-[16px] gap-[16px] w-full ${isFiatAddress ? "h-[454px] sm:h-[404px]" : isFiatPayment ? "h-[482px] sm:h-[418px]" : isFiatSuccess ? "h-[464px] sm:h-[426px]" : "h-[412px] sm:h-[375px]"} bg-[#0C1F56] rounded-[16px] z-20 relative max-[639px]:flex-1 max-[639px]:overflow-y-auto max-[639px]:min-h-0`}>
          {isFiatSuccess ? (
            <div className="flex flex-col items-start gap-[16px] w-full h-[394px] sm:h-[394px]">
              {/* Circle Checkmark Icon with Stroke from Figma Specs (Height 120px) */}
              <div className="flex flex-row justify-center items-center w-full h-[120px] shrink-0">
                <div className="relative w-[120px] h-[120px] flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full border-[3px] border-[#1463FF] bg-[#112F82]/30 flex items-center justify-center">
                    <div className="w-[70px] h-[70px] rounded-full bg-[#1463FF] flex items-center justify-center shadow-lg">
                      <Image src="/tick.svg" width={24} height={24} alt="Success" className="w-[24px] h-[24px] object-contain" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Headline and Description (Height 67px in Figma) */}
              <div className="flex flex-col items-start gap-[8px] w-full text-center h-[67px] shrink-0">
                <h3 className="font-[family-name:var(--font-manrope)] font-bold text-[20px] leading-[27px] tracking-[0.02em] text-white w-full text-center">
                  Deposit successful
                </h3>
                <p className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#A5B8EF] w-full text-center">
                  Your credit card deposit was approved and your balance has been updated.
                </p>
              </div>

              {/* Info Cards Wrapper (Height 175px in Figma) */}
              <div className="flex flex-col items-start gap-[12px] w-full h-[175px] shrink-0">
                {/* Details Box (Height 100px in Figma) */}
                <div className="flex flex-col justify-center items-start p-[10px_16px] gap-[8px] w-full h-[100px] bg-[#112F82] rounded-[8px] shrink-0">
                  <div className="flex flex-row justify-between items-center w-full h-[16px]">
                    <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#A5B8EF]">
                      Amount
                    </span>
                    <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] text-right tracking-[0.02em] text-white">
                      ${typeof fiatAmount === "number" ? fiatAmount.toFixed(2) : "30.00"}
                    </span>
                  </div>
                  <div className="w-full border-t border-dashed border-[#193EA5]" />
                  <div className="flex flex-row justify-between items-center w-full h-[16px]">
                    <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#A5B8EF]">
                      Payment Method
                    </span>
                    <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] text-right tracking-[0.02em] text-white">
                      Credit Card
                    </span>
                  </div>
                  <div className="w-full border-t border-dashed border-[#193EA5]" />
                  <div className="flex flex-row justify-between items-center w-full h-[16px]">
                    <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#A5B8EF]">
                      Status
                    </span>
                    <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] text-right tracking-[0.02em] text-white">
                      Completed
                    </span>
                  </div>
                </div>

                {/* Active Bonus Box (Height 63px in Figma) */}
                <div className="flex flex-col justify-center items-start p-[10px_16px] gap-[8px] w-full h-[63px] bg-[#112F82] rounded-[8px] shrink-0">
                  <span className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
                    Active Bonus
                  </span>
                  <div className="flex flex-row items-center gap-[8px] w-full h-[19px]">
                    <div className="w-[16px] h-[16px] flex items-center justify-center shrink-0">
                      <RenderBonusIcon type={selectedBonus.iconType} className="w-[16px] h-[16px]" color="bg-[#FFC83D]" />
                    </div>
                    <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white truncate">
                      {selectedBonus.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div ref={bonusRef} className="relative flex flex-col gap-[8px] w-full z-30">
                <label className="flex items-center w-full h-[16px] font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
                  {selectedPayment.id === "fiat" ? "Select a Bonus" : "1.Select a Bonus"}
                </label>
                <button
                  onClick={() => {
                    setIsBonusOpen(!isBonusOpen);
                    setIsPaymentOpen(false);
                  }}
                  className="flex flex-row items-center justify-between px-[16px] py-[10px] w-full h-[50px] sm:h-[40px] bg-[#112F82] hover:bg-[#1A3FA6] transition-colors border border-[#1463FF] rounded-[8px]"
                >
                  <div className="flex flex-row items-center gap-[12px]">
                    <div className="w-[16px] h-[16px] flex items-center justify-center shrink-0">
                      <RenderBonusIcon type={selectedBonus.iconType} className="w-[16px] h-[16px]" color="bg-[#FFC83D]" />
                    </div>
                    <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                      {selectedBonus.title}
                    </span>
                  </div>
                  <ChevronDown size={14} className={`text-[#A5B8EF] transition-transform ${isBonusOpen ? "rotate-180" : ""}`} />
                </button>

                {isBonusOpen && (
                  <div className="absolute top-[80px] sm:top-[66px] left-0 w-full bg-[#112F82] border border-[#1463FF] rounded-[8px] flex flex-col overflow-hidden shadow-xl z-50 h-[244px]">
                    <div className="px-[16px] py-[10px] h-[40px] flex items-center bg-[#112F82] border-b border-[#1463FF]/30 rounded-t-[8px]">
                      <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white">Choose one bonus on next deposits</span>
                    </div>

                    {bonuses.map((bonus) => {
                      const isSelected = selectedBonus.id === bonus.id;
                      const isNoBonus = bonus.id === "no-bonus";
                      const optionHeight = isNoBonus ? "h-[39px]" : "h-[55px]";
                      return (
                        <button
                          key={bonus.id}
                          className={`flex flex-row items-center gap-[12px] px-[16px] py-[10px] text-left transition-colors ${optionHeight} ${isSelected ? "bg-[#1463FF]" : "bg-[#112F82] hover:bg-[#1A3FA6]"}`}
                          onClick={() => {
                            setSelectedBonus(bonus);
                            setIsBonusOpen(false);
                          }}
                        >
                          <div className="shrink-0 flex items-center justify-center">
                            <RenderBonusIcon
                              type={bonus.iconType}
                              className="w-[16px] h-[16px] transition-colors"
                              color={isSelected ? "bg-[#FFC83D]" : "bg-[#A5B8EF]"}
                            />
                          </div>
                          <div className="flex flex-col justify-center gap-[2px]">
                            <span className={`font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] ${isSelected ? "text-white" : "text-[#A5B8EF]"}`}>{bonus.title}</span>
                            {bonus.desc && (
                              <span className={`font-[family-name:var(--font-manrope)] font-medium text-[10px] leading-[14px] tracking-[0.02em] ${isSelected ? "text-white" : "text-[#A5B8EF]"}`}>{bonus.desc}</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div ref={paymentRef} className="relative flex flex-col gap-[8px] w-full z-20">
                <label className="flex items-center w-full h-[16px] font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
                  {selectedPayment.id === "fiat" ? "Select a payment method" : "2.Select a payment method"}
                </label>
                <button
                  onClick={() => {
                    setIsPaymentOpen(!isPaymentOpen);
                    setIsBonusOpen(false);
                  }}
                  className={`flex flex-row items-center justify-between px-[16px] py-[10px] w-full h-[50px] sm:h-[40px] bg-[#112F82] hover:bg-[#1A3FA6] transition-colors ${isPaymentOpen ? "rounded-t-[8px] border border-[#1463FF] border-b-0" : "rounded-[8px]"}`}
                >
                  <div className="flex flex-row items-center gap-[8px] min-w-0">
                    {selectedPayment.id === "crypto" ? (
                      <Image src="/d-bit.svg" width={16} height={16} alt={selectedPayment.symbol || "BTC"} className="shrink-0" />
                    ) : (
                      <FiatIcons isSelected={true} />
                    )}
                    <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white shrink-0">
                      {selectedPayment.titleClosed}
                    </span>
                    <span className="font-[family-name:var(--font-manrope)] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8] truncate">
                      {selectedPayment.descClosed}
                    </span>
                  </div>
                  <ChevronDown size={14} strokeWidth={2.5} className={`text-[#A5B8EF] transition-transform ${isPaymentOpen ? "rotate-180" : ""}`} />
                </button>

                {isPaymentOpen && (
                  <div className="absolute top-[74px] sm:top-[63px] left-0 w-full bg-[#112F82] border border-[#1463FF] border-t-0 rounded-b-[8px] flex flex-col overflow-hidden shadow-xl z-50">
                    {payments.map((payment) => {
                      const isSelected = selectedPayment.id === payment.id;
                      return (
                        <button
                          key={payment.id}
                          className={`flex flex-row items-center gap-[12px] px-[16px] py-[12px] text-left transition-colors ${isSelected ? "bg-[#1463FF]" : "hover:bg-[#1A3FA6]"}`}
                          onClick={() => {
                            setSelectedPayment(payment);
                            setIsPaymentOpen(false);
                          }}
                        >
                          {payment.id === "crypto" ? (
                            <div className={`flex items-center justify-center shrink-0 ${isSelected ? "border-[1.5px] border-white rounded-full" : ""}`}>
                              <Image src="/d-bit.svg" width={20} height={20} alt={payment.symbol || "BTC"} className={`shrink-0 transition-all ${isSelected ? "" : "grayscale opacity-60"}`} />
                            </div>
                          ) : (
                            <FiatIcons className={isSelected ? "opacity-100" : "opacity-80"} isSelected={isSelected} />
                          )}
                          <span className={`font-[family-name:var(--font-manrope)] font-bold text-[14px] ${isSelected ? "text-white" : "text-[#A5B8EF]"}`}>
                            {payment.titleExpanded}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {selectedPayment.id === "crypto" && (
                  <div className="deposit-warning-message flex flex-row items-start gap-[8px] w-full h-[28px]">
                    <div className="flex items-center justify-center w-[12px] h-[12px] shrink-0 mt-[1px]">
                      <Image src="/error.svg" width={12} height={12} alt="Info" className="w-[12px] h-[12px]" />
                    </div>
                    <p className="font-['Manrope'] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8]">
                      Only deposit BC via the Bitcoin network. Deposit of other assets or from other networks will be lost.
                    </p>
                  </div>
                )}
              </div>

              {selectedPayment.id === "crypto" ? (
                <>
                  <div className="flex flex-col gap-[8px] w-full">
                    <label className="flex items-center w-full h-[16px] font-['Manrope'] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
                      3.Calculate the amount you want to deposit
                    </label>
                    <div className="flex flex-row items-center gap-[8px] w-full h-[50px] sm:h-[40px]">
                      <div className="flex-1 flex flex-row items-center px-[16px] h-[50px] sm:h-[40px] bg-[#112F82] rounded-[8px]">
                        <Image src="/d-doller.svg" width={16} height={16} alt="USD" className="shrink-0 mr-[8px]" />
                        <input
                          type="text"
                          defaultValue="100"
                          className="bg-transparent border-none outline-none font-['Manrope'] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white w-full"
                        />
                      </div>

                      <div className="w-[50px] sm:w-[40px] h-[50px] sm:h-[40px] bg-[#1463FF] rounded-[8px] flex flex-col items-center justify-center shrink-0">
                        <ArrowRightLeft size={16} className="text-white" />
                      </div>

                      <div className="flex-1 flex flex-row items-center px-[16px] h-[50px] sm:h-[40px] bg-[#112F82] rounded-[8px]">
                        <Image src="/d-bit.svg" width={16} height={16} alt="BTC" className="shrink-0 mr-[8px]" />
                        <input
                          type="text"
                          defaultValue="0.00954"
                          className="bg-transparent border-none outline-none font-['Manrope'] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[8px] w-full">
                    <label className="flex items-center w-full h-[16px] font-['Manrope'] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
                      4.BTC Deposit Address
                    </label>
                    <div className="flex flex-row items-center justify-between px-[16px] w-full h-[50px] sm:h-[40px] bg-[#112F82] rounded-[8px]">
                      <span className="font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#7795E8] truncate mr-[12px]">
                        bc1q7ndh47hf93rdhuhef873hheufhe447...
                      </span>
                      <div className="flex flex-row items-center gap-[12px] shrink-0">
                        <button className="text-[#BBCAF3] hover:opacity-80 transition-opacity flex items-center justify-center">
                          <Image src="/copy.svg" width={16} height={16} alt="Copy" />
                        </button>
                        <button className="text-[#BBCAF3] hover:opacity-80 transition-opacity flex items-center justify-center">
                          <Image src="/qr.svg" width={16} height={16} alt="QR Code" />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : fiatStep === "address" ? (
                <div className="flex flex-col gap-[12px] w-full h-[242px] sm:h-auto">
                  <div className="deposit-address-warning-container flex flex-col gap-[8px] w-full h-[52px] sm:h-auto">
                    <div className="flex flex-row items-center gap-[8px] w-full h-[16px]">
                      <label className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3] h-[16px]">
                        Enter your address
                      </label>
                    </div>
                    <div className="deposit-warning-message flex flex-row items-start gap-[8px] w-full h-[28px] sm:h-auto">
                      <div className="w-[12px] h-[12px] relative mt-[2px]">
                        <div className="absolute inset-0 bg-[#7795E8] [mask-image:url('/error.svg')] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]" />
                      </div>
                      <p className="font-[family-name:var(--font-manrope)] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8] flex-1">
                        Please fill up your address details before completing your deposit. This information is required for credit card deposits.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[12px] w-full h-[174px] sm:h-[144px]">
                    <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[50px] sm:h-[40px] bg-[#112F82] rounded-[8px]">
                      <input type="text" placeholder="Street" spellCheck="false" className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder:text-[#A5B8EF]" />
                    </div>

                    <div className="grid grid-cols-2 gap-[8px] w-full h-[50px] sm:h-[40px]">
                      <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[50px] sm:h-[40px] bg-[#112F82] rounded-[8px]">
                        <input type="text" placeholder="City" spellCheck="false" className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder:text-[#A5B8EF] min-w-0" />
                      </div>
                      <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[50px] sm:h-[40px] bg-[#112F82] rounded-[8px]">
                        <input type="text" placeholder="Postal Code" spellCheck="false" className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder:text-[#A5B8EF] min-w-0" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-[8px] w-full h-[50px] sm:h-[40px]">
                      <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[50px] sm:h-[40px] bg-[#112F82] rounded-[8px]">
                        <input type="text" placeholder="State" spellCheck="false" className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder:text-[#A5B8EF] min-w-0" />
                      </div>
                      <div ref={countryRef} className="relative w-full h-[50px] sm:h-[40px] z-30">
                        <div
                          onClick={() => setIsCountryOpen(!isCountryOpen)}
                          className={`flex flex-row items-center px-[10px] sm:px-[16px] py-[10px] gap-[8px] sm:gap-[10px] w-full h-[50px] sm:h-[40px] bg-[#112F82] hover:bg-[#1A3FA6] transition-colors cursor-pointer ${isCountryOpen ? "rounded-t-[8px] border border-[#1A3FA6] border-b-0" : "rounded-[8px]"}`}
                        >
                          <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0">
                            <div className="w-[20px] h-[20px] rounded-full overflow-hidden flex items-center justify-center">
                              <img src={selectedCountry.flag} alt={selectedCountry.name} className="w-[20px] h-[20px] object-cover" />
                            </div>
                          </div>
                          <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white flex-1 truncate min-w-0">{selectedCountry.name}</span>
                          <div className="flex flex-col justify-center items-center w-[14px] h-[14px] shrink-0">
                            <ChevronDown size={14} className={`text-[#A5B8EF] transition-transform ${isCountryOpen ? "rotate-180" : ""}`} />
                          </div>
                        </div>

                        {isCountryOpen && (
                          <div className="absolute top-[100%] left-0 w-full sm:w-[210px] bg-[#0C1F56] border border-[#1A3FA6] border-t-0 rounded-b-[8px] z-[60] shadow-lg max-h-[150px] overflow-y-auto [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-[#0C1F56] [&::-webkit-scrollbar-thumb]:bg-[#1A3FA6] [&::-webkit-scrollbar-thumb]:rounded-full [scrollbar-width:thin] [scrollbar-color:#1A3FA6_#0C1F56]">
                            {countries.map(country => (
                              <button
                                key={country.id}
                                onClick={() => {
                                  setSelectedCountry(country);
                                  setIsCountryOpen(false);
                                }}
                                className="w-full px-[16px] py-[10px] flex flex-row items-center gap-[10px] hover:bg-[#112F82] transition-colors text-left"
                              >
                                <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0">
                                  <div className="w-[20px] h-[20px] rounded-full overflow-hidden flex items-center justify-center">
                                    <img src={country.flag} alt={country.name} className="w-[20px] h-[20px] object-cover" />
                                  </div>
                                </div>
                                <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white flex-1 truncate">{country.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-[16px] w-full">
                  <div className="flex flex-col gap-[8px] w-full h-[74px] sm:h-[64px]">
                    <label className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3] h-[16px]">
                      Select an amount
                    </label>
                    <div className="flex flex-row gap-[8px] w-full h-[50px] sm:h-[40px]">
                      {[20, 30, 100].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setFiatAmount(amt)}
                          className={`flex-1 flex items-center justify-center font-[family-name:var(--font-manrope)] text-[14px] leading-[19px] tracking-[0.02em] transition-colors rounded-[8px] ${fiatAmount === amt ? "bg-[#173EAD] border-[2px] border-[#1463FF] text-white font-bold" : "bg-[#112F82] text-[#A5B8EF] font-semibold hover:text-white"}`}
                        >
                          ${amt}
                        </button>
                      ))}
                      <button
                        onClick={() => setFiatAmount("custom")}
                        className={`flex-1 flex items-center justify-center font-[family-name:var(--font-manrope)] text-[14px] leading-[19px] tracking-[0.02em] transition-colors rounded-[8px] ${fiatAmount === "custom" ? "bg-[#173EAD] border-[2px] border-[#1463FF] text-white font-bold" : "bg-[#112F82] text-[#A5B8EF] font-semibold hover:text-white"}`}
                      >
                        Custom...
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[12px] w-full h-[180px] sm:h-[146px]">
                    <label className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3] h-[16px]">
                      Enter your payment details
                    </label>
                    <div className="flex flex-col gap-[12px] w-full h-[112px] sm:h-[92px]">
                      <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[50px] sm:h-[40px] bg-[#112F82] rounded-[8px]">
                        <input type="text" placeholder="Credit Card Number" spellCheck="false" className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder:text-[#A5B8EF]" />
                      </div>
                      <div className="flex flex-row items-start gap-[8px] w-full h-[50px] sm:h-[40px]">
                        <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] flex-1 h-[50px] sm:h-[40px] bg-[#112F82] rounded-[8px]">
                          <input type="text" placeholder="Exp." spellCheck="false" className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder:text-[#A5B8EF]" />
                        </div>
                        <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] flex-1 h-[50px] sm:h-[40px] bg-[#112F82] rounded-[8px]">
                          <input type="text" placeholder="CCV" spellCheck="false" className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder:text-[#A5B8EF]" />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row items-start gap-[8px] w-full h-[28px] sm:h-[14px]">
                      <div className="w-[12px] h-[12px] flex items-center justify-center shrink-0 mt-[1px]">
                        <Info size={12} className="text-[#7795E8]" />
                      </div>
                      <p className="font-[family-name:var(--font-manrope)] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8] w-[322px] sm:w-[408px]">
                        Warning message about fees or anything else relevant at this stage.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <div className={`max-[639px]:w-full max-[639px]:bg-[#091741] max-[639px]:pt-[16px] max-[639px]:z-50 flex flex-col gap-[12px] items-center z-10 w-full justify-center ${isPending ? "h-[88px] max-[639px]:h-auto" : ""}`}>
        {isPending ? (
          <>
            <button
              onClick={() => {
                onClose();
                router.push("/");
              }}
              disabled={!animationCompleted}
              className="flex flex-row justify-center items-center px-[30px] py-[10px] gap-[10px] w-full sm:w-[300px] h-[60px] sm:h-[50px] bg-[#FFC83D] hover:bg-[#F2B926] disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-[8px]"
            >
              <span className="font-[family-name:var(--font-manrope)] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-[#1A1404]">
                Go to games
              </span>
            </button>

            <div className="flex flex-row justify-center items-center gap-[8px] w-full h-[16px]">
              <svg className="w-[12px] h-[12px] text-[#7795E8] shrink-0" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="6" r="5.25" stroke="currentColor" strokeWidth="1.2" />
                <path d="M6 8.5V7.5M6 6.5C6.4 6.5 6.8 6.2 6.8 5.75C6.8 5.3 6.4 5 6 5C5.6 5 5.2 5.3 5.2 5.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#7795E8]">
                Having problems? <span className="text-[#FFC83D] cursor-pointer hover:underline">Contact support</span>
              </span>
            </div>
          </>
        ) : (
          <button
            onClick={
              selectedPayment.id === "fiat"
                ? () => {
                    if (fiatStep === "address") {
                      toast.success("Address saved, proceeding to payment...");
                      setFiatStep("payment");
                    } else if (fiatStep === "payment") {
                      toast.success("Deposit successful!");
                      setFiatStep("success");
                    } else {
                      onClose();
                      router.push("/");
                    }
                  }
                : handleCompleteDeposit
            }
            className={`flex flex-row justify-center items-center px-[30px] py-[10px] bg-[#FFC83D] hover:bg-[#F2B926] transition-colors rounded-[8px] shrink-0 ${
              isFiatSuccess ? "w-full sm:w-[460px] h-[50px]" : "w-full sm:w-[300px] h-[60px] sm:h-[50px]"
            }`}
          >
            <span
              className={`font-[family-name:var(--font-manrope)] font-bold text-[#1A1404] ${
                isFiatSuccess
                  ? "text-[16px] leading-[22px] tracking-[0.02em]"
                  : "text-[16px] sm:text-[14px] leading-[22px] sm:leading-[19px] tracking-[0.02em]"
              }`}
            >
              {selectedPayment.id === "fiat"
                ? fiatStep === "address"
                  ? "Continue"
                  : fiatStep === "payment"
                  ? `Deposit ${fiatAmount === "custom" ? "" : "$" + fiatAmount}`
                  : "Play Now"
                : "I've completed my deposit"}
            </span>
          </button>
        )}
      </div>
    </>
  );
}
