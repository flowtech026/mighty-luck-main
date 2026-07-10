import React from "react";
import { ChevronDown, Info } from "lucide-react";
import { toast } from "sonner";
import { Country } from "./types";

interface WithdrawTabProps {
  verificationStep: "start" | "process" | "submitted" | "verified" | "success";
  setVerificationStep: (step: "start" | "process" | "submitted" | "verified" | "success") => void;
  withdrawAmount: string;
  setWithdrawAmount: (amt: string) => void;
  withdrawMethod: string;
  setWithdrawMethod: (method: string) => void;
  withdrawAddress: string;
  setWithdrawAddress: (addr: string) => void;
  selectedCountry: Country;
  setSelectedCountry: (c: Country) => void;
  isCountryOpen: boolean;
  setIsCountryOpen: (open: boolean) => void;
  countries: Country[];
  countryRef: React.RefObject<HTMLDivElement | null>;
}

export default function WithdrawTab({
  verificationStep,
  setVerificationStep,
  withdrawAmount,
  setWithdrawAmount,
  withdrawMethod,
  setWithdrawMethod,
  withdrawAddress,
  setWithdrawAddress,
  selectedCountry,
  setSelectedCountry,
  isCountryOpen,
  setIsCountryOpen,
  countries,
  countryRef,
}: WithdrawTabProps) {
  return (
    <>
      {verificationStep === "start" ? (
        <div className="flex flex-col items-center justify-between p-[16px] gap-[16px] w-full bg-[#0C1F56] rounded-[16px] z-20 relative h-auto sm:h-[421px] max-[639px]:flex-1 max-[639px]:overflow-y-auto max-[639px]:min-h-0 overflow-hidden">
          {/* Title & Subtitle Frame (428x67 in Figma) */}
          <div className="flex flex-col items-start gap-[8px] w-full text-center shrink-0">
            <h3 className="font-[family-name:var(--font-manrope)] font-bold text-[20px] leading-[27px] tracking-[0.02em] text-white w-full text-center">
              Verify your account
            </h3>
            <p className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#A5B8EF] w-full text-center">
              For security reasons, withdrawals are available only after KYC verification is completed.
            </p>
          </div>

          {/* 3 Verification Steps Frame (428x174 in Figma) */}
          <div className="flex flex-col items-start gap-[12px] w-full sm:w-[428px] shrink-0">
            {/* Step 1 */}
            <div className="flex flex-row items-center p-[10px] gap-[12px] w-full h-[50px] bg-[#112F82] rounded-[8px] shrink-0">
              <div className="w-[30px] h-[30px] bg-[#1463FF] rounded-[4px] flex items-center justify-center shrink-0">
                <span className="font-['Jost'] font-extrabold text-[14px] leading-[17px] tracking-[0.01em] text-white">
                  1
                </span>
              </div>
              <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white truncate">
                Confirm personal details
              </span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-row items-center p-[10px] gap-[12px] w-full h-[50px] bg-[#112F82] rounded-[8px] shrink-0">
              <div className="w-[30px] h-[30px] bg-[#1463FF] rounded-[4px] flex items-center justify-center shrink-0">
                <span className="font-['Jost'] font-extrabold text-[14px] leading-[17px] tracking-[0.01em] text-white">
                  2
                </span>
              </div>
              <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white truncate">
                Upload identity document
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-row items-center p-[10px] gap-[12px] w-full h-[50px] bg-[#112F82] rounded-[8px] shrink-0">
              <div className="w-[30px] h-[30px] bg-[#1463FF] rounded-[4px] flex items-center justify-center shrink-0">
                <span className="font-['Jost'] font-extrabold text-[14px] leading-[17px] tracking-[0.01em] text-white">
                  3
                </span>
              </div>
              <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white truncate">
                Upload proof of address
              </span>
            </div>
          </div>

          {/* Action Buttons Stack (428x112 in Figma) */}
          <div className="flex flex-col items-center gap-[12px] w-full sm:w-[428px] shrink-0">
            <button
              onClick={() => {
                setVerificationStep("process");
              }}
              className="flex flex-row justify-center items-center px-[30px] py-[10px] w-full h-[50px] bg-[#FFC83D] hover:bg-[#F2B926] transition-colors rounded-[8px] shrink-0"
            >
              <span className="font-[family-name:var(--font-manrope)] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-[#1A1404]">
                Start verification
              </span>
            </button>

            <button
              onClick={() => {
                setVerificationStep("submitted");
              }}
              className="flex flex-row justify-center items-center px-[30px] py-[10px] w-full h-[50px] bg-[#112F82] hover:bg-[#1A3FA6] transition-colors rounded-[8px] shrink-0"
            >
              <span className="font-[family-name:var(--font-manrope)] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-[#D2DCF7]">
                Preview verified withdrawal
              </span>
            </button>
          </div>
        </div>
      ) : verificationStep === "process" ? (
        /* Verification process screen (460x550 in Figma) */
        <div className="flex flex-col items-center p-[20px_16px] gap-[20px] w-full bg-[#0C1F56] rounded-[16px] z-20 relative h-auto sm:h-[550px] max-[639px]:flex-1 max-[639px]:overflow-y-auto max-[639px]:min-h-0 overflow-hidden shrink-0">
          {/* Section 1: 1. Complete verification */}
          <div className="flex flex-col items-start gap-[12px] w-full sm:w-[428px] shrink-0">
            <div className="flex flex-col items-start gap-[4px] w-full">
              <span className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
                1.Complete verification
              </span>
              <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8]">
                We need to verify your account before enabling withdrawals.
              </span>
            </div>

            <div className="flex flex-col items-start gap-[12px] w-full">
              <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[40px] bg-[#112F82] rounded-[8px]">
                <input
                  type="text"
                  placeholder="Legal first name"
                  className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder-[#A5B8EF]"
                />
              </div>

              <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[40px] bg-[#112F82] rounded-[8px]">
                <input
                  type="text"
                  placeholder="Legal last name"
                  className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder-[#A5B8EF]"
                />
              </div>

              <div className="flex flex-row items-center gap-[8px] w-full h-[40px]">
                <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] flex-1 h-[40px] bg-[#112F82] rounded-[8px]">
                  <input
                    type="text"
                    placeholder="Date of birth"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = "text";
                    }}
                    className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder-[#A5B8EF]"
                  />
                </div>

                <div className="relative flex-1" ref={countryRef}>
                  <button
                    onClick={() => setIsCountryOpen(!isCountryOpen)}
                    className="flex flex-row items-center justify-between px-[16px] py-[10px] gap-[10px] w-full h-[40px] bg-[#112F82] rounded-[8px]"
                  >
                    <div className="flex flex-row items-center gap-[8px] truncate">
                      <img src={selectedCountry.flag} alt={selectedCountry.name} className="w-[20px] h-[20px] object-cover rounded-full shrink-0" />
                      <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white truncate">{selectedCountry.name}</span>
                    </div>
                    <ChevronDown size={14} className={`text-[#A5B8EF] shrink-0 transition-transform ${isCountryOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isCountryOpen && (
                    <div className="absolute top-[44px] left-0 right-0 bg-[#0C1F56] border border-[#112F82] rounded-[8px] shadow-lg py-1 z-50 max-h-[160px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      {countries.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => {
                            setSelectedCountry(c);
                            setIsCountryOpen(false);
                          }}
                          className="flex flex-row items-center gap-[8px] w-full px-[12px] py-[8px] hover:bg-[#112F82] transition-colors text-left"
                        >
                          <img src={c.flag} alt={c.name} className="w-[20px] h-[20px] object-cover rounded-full shrink-0" />
                          <span className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] text-white truncate">{c.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: 2. Upload documents */}
          <div className="flex flex-col items-start gap-[12px] w-full sm:w-[428px] shrink-0">
            <span className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
              2.Upload documents
            </span>

            <div className="flex flex-col items-start p-[10px] gap-[20px] w-full h-[60px] bg-[#112F82] rounded-[10px]">
              <div className="flex flex-row items-center gap-[16px] w-full h-[40px]">
                <div className="flex flex-col items-center justify-center p-[12px] gap-[10px] w-[40px] h-[40px] bg-[#0C1F56] rounded-[6px] shrink-0 cursor-pointer hover:bg-[#091741] transition-colors">
                  <img src="/upload.svg" alt="Upload" className="w-[16px] h-[16px]" />
                </div>
                <div className="flex flex-col items-start gap-[4px] flex-1">
                  <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                    Identity document
                  </span>
                  <span className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#A5B8EF]">
                    Passport, ID card, or driving license
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start p-[10px] gap-[20px] w-full h-[60px] bg-[#112F82] rounded-[10px]">
              <div className="flex flex-row items-center gap-[16px] w-full h-[40px]">
                <div className="flex flex-col items-center justify-center p-[12px] gap-[10px] w-[40px] h-[40px] bg-[#0C1F56] rounded-[6px] shrink-0 cursor-pointer hover:bg-[#091741] transition-colors">
                  <img src="/upload.svg" alt="Upload" className="w-[16px] h-[16px]" />
                </div>
                <div className="flex flex-col items-start gap-[4px] flex-1">
                  <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                    Proof of address
                  </span>
                  <span className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#A5B8EF]">
                    Utility bill or bank statement
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Buttons */}
          <div className="flex flex-col items-center gap-[12px] w-full sm:w-[428px] shrink-0">
            <button
              onClick={() => {
                setVerificationStep("submitted");
              }}
              className="flex flex-row justify-center items-center px-[30px] py-[10px] w-full h-[50px] bg-[#FFC83D] hover:bg-[#F2B926] transition-colors rounded-[8px] shrink-0"
            >
              <span className="font-[family-name:var(--font-manrope)] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-[#1A1404]">
                Submit verification
              </span>
            </button>

            <button
              onClick={() => {
                setVerificationStep("start");
              }}
              className="flex flex-row justify-center items-center px-[30px] py-[10px] w-full h-[50px] bg-[#112F82] hover:bg-[#1A3FA6] transition-colors rounded-[8px] shrink-0"
            >
              <span className="font-[family-name:var(--font-manrope)] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-[#D2DCF7]">
                Back
              </span>
            </button>
          </div>
        </div>
      ) : verificationStep === "submitted" ? (
        /* Verification submission screen (460x411 in Figma) */
        <div className="flex flex-col items-center justify-between p-[20px_16px] gap-[20px] w-full bg-[#0C1F56] rounded-[16px] z-20 relative h-auto sm:h-[411px] max-[639px]:flex-1 max-[639px]:overflow-y-auto max-[639px]:min-h-0 overflow-hidden shrink-0">
          {/* Top Graphic Frame (428x120 in Figma) */}
          <div className="flex flex-row justify-center items-center w-full sm:w-[428px] h-[120px] shrink-0">
            <div className="relative w-[120px] h-[120px] flex items-center justify-center shrink-0">
              {/* Outer circular stroke ring (Vector Stroke in Figma) */}
              <div className="absolute inset-0 rounded-full border-[2px] border-[#1463FF]" />
              {/* Inner filled ellipse (70x70 in Figma) */}
              <div className="w-[70px] h-[70px] bg-[#1463FF] rounded-full flex items-center justify-center z-10">
                <img src="/tick.svg" alt="Tick" className="w-[24px] h-[24px]" />
              </div>
            </div>
          </div>

          {/* Title & Subtitle Frame (428x67 in Figma) */}
          <div className="flex flex-col items-center gap-[8px] w-full sm:w-[428px] shrink-0 text-center">
            <h3 className="font-[family-name:var(--font-manrope)] font-bold text-[20px] leading-[27px] tracking-[0.02em] text-white w-full text-center">
              Verification submitted
            </h3>
            <p className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#A5B8EF] w-full text-center">
              Your documents were received. Withdrawals will become available once the review is complete.
            </p>
          </div>

          {/* Status Info Box (428x74 in Figma) */}
          <div className="flex flex-col justify-center items-start p-[10px_16px] gap-[8px] w-full sm:w-[428px] h-[74px] bg-[#112F82] rounded-[8px] shrink-0">
            <div className="flex flex-row justify-between items-center w-full h-[22px]">
              <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#A5B8EF]">
                Status
              </span>
              <div className="flex flex-row justify-center items-center px-[8px] py-[4px] bg-[#3E2A09] rounded-[6px]">
                <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#FFC83D]">
                  Under review
                </span>
              </div>
            </div>

            <div className="w-full border-b border-dashed border-[#193EA5]" />

            <div className="flex flex-row justify-between items-center w-full h-[16px]">
              <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#A5B8EF]">
                Estimated review
              </span>
              <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white text-right">
                24-28 hours
              </span>
            </div>
          </div>

          {/* Preview verified state CTA (428x50 in Figma) */}
          <button
            onClick={() => setVerificationStep("verified")}
            className="flex flex-row justify-center items-center px-[30px] py-[10px] w-full sm:w-[428px] h-[50px] bg-[#FFC83D] hover:bg-[#F2B926] transition-colors rounded-[8px] shrink-0"
          >
            <span className="font-[family-name:var(--font-manrope)] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-[#1A1404]">
              Preview verified state
            </span>
          </button>
        </div>
      ) : verificationStep === "verified" ? (
        /* Withdrawal request view (460x548 in Figma) */
        <div className="flex flex-col items-center p-[20px_16px] gap-[16px] w-full bg-[#0C1F56] rounded-[16px] z-20 relative h-auto sm:h-[548px] max-[639px]:flex-1 max-[639px]:overflow-y-auto max-[639px]:min-h-0 overflow-hidden shrink-0">
          {/* Available balance card (428x79 in Figma) */}
          <div className="flex flex-row justify-between items-center p-[16px] gap-[20px] w-full sm:w-[428px] h-[79px] bg-[#112F82] rounded-[10px] shrink-0">
            <div className="flex flex-col items-start gap-[4px] grow">
              <span className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#A5B8EF]">
                Available balance
              </span>
              <span className="font-[family-name:var(--font-manrope)] font-bold text-[20px] leading-[27px] tracking-[0.02em] text-white">
                $1,248.50
              </span>
            </div>
            <div className="flex flex-row justify-center items-center px-[8px] py-[4px] gap-[4px] bg-[#09430B] rounded-[4px] shrink-0">
              <img src="/tick.svg" alt="Verified" className="w-[12px] h-[12px]" />
              <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#1AFF20]">
                Verified
              </span>
            </div>
          </div>

          {/* 1.Select withdrawal method (428x61 in Figma) */}
          <div className="flex flex-col items-start gap-[8px] w-full sm:w-[428px] shrink-0">
            <span className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
              1.Select withdrawal method
            </span>
            <div className="flex flex-row items-center justify-between px-[16px] py-[10px] gap-[12px] w-full h-[39px] bg-[#112F82] rounded-[8px]">
              <div className="flex flex-row items-center gap-[8px]">
                <img src="/d-bit.svg" alt="Bitcoin" className="w-[16px] h-[16px]" />
                <div className="flex flex-row items-center gap-[4px]">
                  <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                    Bitcoin
                  </span>
                  <span className="font-[family-name:var(--font-manrope)] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#BBCAF3]">
                    (Min. withdraw $50)
                  </span>
                </div>
              </div>
              <ChevronDown size={14} className="text-[#A5B8EF]" />
            </div>
          </div>

          {/* 2.Enter withdrawal amount (428x61 in Figma) */}
          <div className="flex flex-col items-start gap-[8px] w-full sm:w-[428px] shrink-0">
            <span className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
              2.Enter withdrawal amount
            </span>
            <div className="flex flex-row items-center px-[16px] py-[10px] gap-[4px] w-full h-[39px] bg-[#112F82] rounded-[8px]">
              <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] text-white ml-[2px] select-none">$</span>
              <input
                type="text"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white w-full"
              />
            </div>
          </div>

          {/* Details Summary Stack (428x80 in Figma) */}
          <div className="flex flex-col items-start gap-[8px] w-full sm:w-[428px] shrink-0">
            <div className="flex flex-row justify-between items-center w-full h-[16px]">
              <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8]">
                Minimum withdrawal
              </span>
              <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white text-right">
                $50
              </span>
            </div>
            <div className="w-full border-b border-dashed border-[#193EA5]" />
            <div className="flex flex-row justify-between items-center w-full h-[16px]">
              <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8]">
                Processing fee
              </span>
              <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white text-right">
                Free
              </span>
            </div>
            <div className="w-full border-b border-dashed border-[#193EA5]" />
            <div className="flex flex-row justify-between items-center w-full h-[16px]">
              <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8]">
                Estimated arrival
              </span>
              <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white text-right">
                1-24 hours
              </span>
            </div>
          </div>

          {/* 3.Enter destination details (428x97 in Figma) */}
          <div className="flex flex-col items-start gap-[8px] w-full sm:w-[428px] shrink-0">
            <span className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
              3.Enter destination details
            </span>
            <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[39px] bg-[#112F82] rounded-[8px]">
              <input
                type="text"
                placeholder="Bitcoin wallet address"
                value={withdrawAddress}
                onChange={(e) => setWithdrawAddress(e.target.value)}
                className="bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder-[#A5B8EF] w-full"
              />
            </div>
            <p className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8] w-full">
              Withdrawals may be reviewed by our payments team before processing. Make sure the destination details are correct.
            </p>
          </div>

          {/* Request withdrawal CTA (428x50 in Figma) */}
          <button
            onClick={() => {
              if (!withdrawAmount || isNaN(parseFloat(withdrawAmount)) || parseFloat(withdrawAmount) <= 0) {
                toast.error("Please enter a valid withdrawal amount");
                return;
              }
              if (parseFloat(withdrawAmount) < 50) {
                toast.error("Minimum withdrawal is $50");
                return;
              }
              if (parseFloat(withdrawAmount) > 1248.5) {
                toast.error("Insufficient balance");
                return;
              }
              if (!withdrawAddress.trim()) {
                toast.error("Please enter your Bitcoin wallet address");
                return;
              }
              setVerificationStep("success");
            }}
            className="flex flex-row justify-center items-center px-[30px] py-[10px] w-full sm:w-[428px] h-[50px] bg-[#FFC83D] hover:bg-[#F2B926] transition-colors rounded-[8px] shrink-0"
          >
            <span className="font-[family-name:var(--font-manrope)] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-[#1A1404]">
              Request withdrawal
            </span>
          </button>
        </div>
      ) : (
        /* Withdrawal confirmation view (460x505 in Figma) */
        <div className="flex flex-col items-center p-[20px_16px] gap-[24px] w-full bg-[#0C1F56] rounded-[16px] z-20 relative h-auto sm:h-[505px] max-[639px]:flex-1 max-[639px]:overflow-y-auto max-[639px]:min-h-0 overflow-hidden shrink-0">
          {/* Top Graphic Frame (428x120 in Figma) */}
          <div className="flex flex-row justify-center items-center w-full sm:w-[428px] h-[120px] shrink-0">
            <div className="relative w-[120px] h-[120px] flex items-center justify-center shrink-0">
              {/* Circular progress track and accent stroke */}
              <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  stroke="#112F82"
                  strokeWidth="4"
                  fill="transparent"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  stroke="#1463FF"
                  strokeWidth="4"
                  strokeDasharray="339.29"
                  strokeDashoffset="169.65"
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              {/* Inner filled blue circle with lock icon */}
              <div className="absolute w-[70px] h-[70px] bg-[#1463FF] rounded-full flex items-center justify-center shadow-lg">
                <img src="/lock.svg" alt="Lock" className="w-[28.8px] h-[28.8px]" />
              </div>
            </div>
          </div>

          {/* Header and description (428x67 in Figma) */}
          <div className="flex flex-col items-center gap-[8px] w-full sm:w-[428px] shrink-0 text-center">
            <h3 className="font-[family-name:var(--font-manrope)] font-bold text-[20px] leading-[27px] tracking-[0.02em] text-white w-full text-center">
              Withdrawal requested
            </h3>
            <p className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#A5B8EF] w-full sm:w-[428px] h-[32px] text-center">
              Your withdrawal request was successfully submitted.<br />Our payments team is now reviewing it
            </p>
          </div>

          {/* Details Box (428x138 in Figma) */}
          <div className="flex flex-col justify-center items-start p-[10px_16px] gap-[8px] w-full sm:w-[428px] h-[138px] bg-[#112F82] rounded-[8px] shrink-0">
            <div className="flex flex-row justify-between items-center w-full h-[16px]">
              <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#A5B8EF]">
                Amount
              </span>
              <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] text-right tracking-[0.02em] text-white">
                {isNaN(parseFloat(withdrawAmount)) ? "$100.00" : "$" + parseFloat(withdrawAmount).toFixed(2)}
              </span>
            </div>

            <div className="w-full border-t border-dashed border-[#193EA5]" />

            <div className="flex flex-row justify-between items-center w-full h-[16px]">
              <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#A5B8EF]">
                Method
              </span>
              <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] text-right tracking-[0.02em] text-white">
                {withdrawMethod}
              </span>
            </div>

            <div className="w-full border-t border-dashed border-[#193EA5]" />

            <div className="flex flex-row justify-between items-center w-full h-[16px]">
              <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#A5B8EF]">
                Estimated arrival
              </span>
              <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] text-right tracking-[0.02em] text-white">
                1-24 hours
              </span>
            </div>

            <div className="w-full border-t border-dashed border-[#193EA5]" />

            <div className="flex flex-row justify-between items-center w-full h-[22px]">
              <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#A5B8EF]">
                Status
              </span>
              <div className="flex flex-row justify-center items-center px-[8px] py-[4px] bg-[#0C1F56] rounded-[4px] h-[22px]">
                <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#4886FF]">
                  Pending review
                </span>
              </div>
            </div>
          </div>

          {/* Footer & Button (428x76 in Figma) */}
          <div className="flex flex-col items-center gap-[12px] w-full sm:w-[428px] shrink-0">
            <div className="flex flex-row justify-center items-center gap-[8px] w-full h-[14px]">
              <div className="w-[12px] h-[12px] relative flex items-center justify-center shrink-0">
                <Info size={12} className="text-[#7795E8]" />
              </div>
              <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8]">
                Having problems? <span className="text-[#FFC83D] cursor-pointer hover:underline">Contact support</span>
              </span>
            </div>

            <button
              onClick={() => {
                setVerificationStep("verified");
              }}
              className="flex flex-row justify-center items-center px-[30px] py-[10px] w-full h-[50px] bg-[#112F82] hover:bg-[#1A3FA6] transition-colors rounded-[8px] shrink-0"
            >
              <span className="font-[family-name:var(--font-manrope)] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-[#D2DCF7]">
                Back to withdrawal form
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
