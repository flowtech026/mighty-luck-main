"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { toast } from "sonner";
import "./deposit-modal.css";

// Sub-components
import DepositTab from "./deposit/DepositTab";
import BonusesTab from "./deposit/BonusesTab";
import WithdrawTab from "./deposit/WithdrawTab";
import TransactionsTab from "./deposit/TransactionsTab";

// Shared Types
import { Bonus, Payment, Country } from "./deposit/types";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DepositModal({ isOpen, onClose }: DepositModalProps) {
  const [isBonusOpen, setIsBonusOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const bonuses: Bonus[] = [
    { id: "reload", title: "150% Reload Bonus + 30 Free Spins", desc: "(Min. Deposit $10)", iconType: "gift" },
    { id: "welcome", title: "350% Welcome Bonus", desc: "45x PT - Min. Dep. $20", iconType: "badge" },
    { id: "crypto", title: "500% Crypto Bonus", desc: "45x PT - Min. Dep. $20", iconType: "coins" },
    { id: "no-bonus", title: "I will deposit without bonus", desc: "", iconType: "ban" },
  ];

  const payments: Payment[] = [
    { id: "fiat", titleExpanded: "Credit Card (Visa/Mastercard)", titleClosed: "Credit Card", descClosed: "(Min. $30 - Max. $2,500)" },
    { id: "crypto", titleExpanded: "Bitcoin (BTC)", titleClosed: "Bitcoin", descClosed: "(Min. $10)", symbol: "₿" },
  ];

  const countries: Country[] = [
    { id: "us", name: "United States", flag: "https://flagcdn.com/w40/us.png" },
    { id: "ca", name: "Canada", flag: "https://flagcdn.com/w40/ca.png" },
    { id: "au", name: "Australia", flag: "https://flagcdn.com/w40/au.png" },
    { id: "de", name: "Germany", flag: "https://flagcdn.com/w40/de.png" },
    { id: "fr", name: "France", flag: "https://flagcdn.com/w40/fr.png" },
  ];

  const [selectedBonus, setSelectedBonus] = useState<Bonus>(bonuses[0]);
  const [selectedPayment, setSelectedPayment] = useState<Payment>(payments[1]);
  const [isPending, setIsPending] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    if (isPending) {
      setAnimationCompleted(false);
      const timer = setTimeout(() => {
        setAnimationCompleted(true);
      }, 2500); // 2.5s matches the circular progress loader animation
      return () => clearTimeout(timer);
    } else {
      setAnimationCompleted(false);
    }
  }, [isPending]);

  const [fiatStep, setFiatStep] = useState<"address" | "payment" | "success">("address");
  const [activeTab, setActiveTab] = useState<"deposit" | "bonuses" | "withdraw" | "transactions">("deposit");
  const [fiatAmount, setFiatAmount] = useState<number | "custom">(30);
  const bonusRef = useRef<HTMLDivElement>(null);
  const paymentRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);

  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [verificationStep, setVerificationStep] = useState<"start" | "process" | "submitted" | "verified" | "success">("start");
  const [withdrawAmount, setWithdrawAmount] = useState("100");
  const [withdrawMethod, setWithdrawMethod] = useState("Bitcoin");
  const [withdrawAddress, setWithdrawAddress] = useState("");

  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const currentY = e.touches[0].clientY;
    const diffY = currentY - touchStartY.current;
    if (diffY > 50) {
      onClose();
      touchStartY.current = null;
    }
  };

  const handleTouchEnd = () => {
    touchStartY.current = null;
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("hide-mobile-nav");
      setIsBonusOpen(false);
      setIsPaymentOpen(false);
      setIsPending(false);
      setFiatStep("address");
      setFiatAmount(30);
      setPromoCode("");
      setIsPromoApplied(false);
      setVerificationStep("start");
      setActiveTab("deposit");
      setWithdrawAmount("100");
      setWithdrawMethod("Bitcoin");
      setWithdrawAddress("");
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("hide-mobile-nav");
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.classList.remove("hide-mobile-nav");
    };
  }, [isOpen]);

  const handleCompleteDeposit = () => {
    toast.success("Bitcoin Transection Completed!");
    setIsPending(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bonusRef.current && !bonusRef.current.contains(event.target as Node)) {
        setIsBonusOpen(false);
      }
      if (paymentRef.current && !paymentRef.current.contains(event.target as Node)) {
        setIsPaymentOpen(false);
      }
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen || !mounted) return null;

  const isFiatAddress = activeTab === "deposit" && selectedPayment.id === "fiat" && fiatStep === "address";
  const isFiatPayment = activeTab === "deposit" && selectedPayment.id === "fiat" && fiatStep === "payment";
  const isFiatSuccess = activeTab === "deposit" && selectedPayment.id === "fiat" && fiatStep === "success";

  const isBonusesTab = activeTab === "bonuses";
  const isWithdrawTab = activeTab === "withdraw";
  const isTransactionsTab = activeTab === "transactions";
  const isBonusSuccess = isBonusesTab && isPromoApplied;

  let modalHeightClass = "h-[673px] sm:h-[604px]";
  if (isBonusSuccess) {
    modalHeightClass = "h-[660px] sm:h-[589px]";
  } else if (isWithdrawTab) {
    if (verificationStep === "process") {
      modalHeightClass = "h-[760px] sm:h-[705px]";
    } else if (verificationStep === "submitted") {
      modalHeightClass = "h-[647px] sm:h-[566px]";
    } else if (verificationStep === "verified") {
      modalHeightClass = "h-[760px] sm:h-[703px]";
    } else if (verificationStep === "success") {
      modalHeightClass = "h-[715px] sm:h-[660px]";
    } else {
      modalHeightClass = "h-[647px] sm:h-[576px]";
    }
  } else if (isBonusesTab) {
    modalHeightClass = "h-[573px] sm:h-[518px]";
  } else if (isTransactionsTab) {
    modalHeightClass = "h-[724px] sm:h-[669px]";
  } else if (isFiatAddress) {
    modalHeightClass = "h-[715px] sm:h-[633px]";
  } else if (isFiatPayment) {
    modalHeightClass = "h-[743px] sm:h-[647px]";
  } else if (isFiatSuccess) {
    modalHeightClass = "h-[725px] sm:h-[655px]";
  } else if (isPending) {
    modalHeightClass = "h-[652px] sm:h-[604px]";
  }

  let outerBoxHeightClass = "h-[595px] sm:h-[474px]";
  if (isBonusSuccess) {
    outerBoxHeightClass = "h-[580px] sm:h-[480px]";
  } else if (isWithdrawTab) {
    if (verificationStep === "process") {
      outerBoxHeightClass = "h-[670px] sm:h-[596px]";
    } else if (verificationStep === "submitted") {
      outerBoxHeightClass = "h-[547px] sm:h-[510px]";
    } else if (verificationStep === "verified") {
      outerBoxHeightClass = "h-[670px] sm:h-[647px]";
    } else if (verificationStep === "success") {
      outerBoxHeightClass = "h-[637px] sm:h-[604px]";
    } else {
      outerBoxHeightClass = "h-[547px] sm:h-[467px]";
    }
  } else if (isBonusesTab) {
    outerBoxHeightClass = "h-[495px] sm:h-[462px]";
  } else if (isTransactionsTab) {
    outerBoxHeightClass = "h-[650px] sm:h-[613px]";
  } else if (isFiatAddress) {
    outerBoxHeightClass = "h-[637px] sm:h-[503px]";
  } else if (isFiatPayment) {
    outerBoxHeightClass = "h-[665px] sm:h-[517px]";
  } else if (isFiatSuccess) {
    outerBoxHeightClass = "h-[645px] sm:h-[472px]";
  } else if (isPending) {
    outerBoxHeightClass = "h-[574px] sm:h-[474px]";
  }

  let innerBoxHeightClass = "h-[458px] sm:h-[421px]";
  if (isBonusSuccess) {
    innerBoxHeightClass = "h-[560px] sm:h-[480px]";
  } else if (isWithdrawTab) {
    if (verificationStep === "process") {
      innerBoxHeightClass = "h-[670px] sm:h-[596px]";
    } else if (verificationStep === "submitted") {
      innerBoxHeightClass = "h-[547px] sm:h-[457px]";
    } else if (verificationStep === "verified") {
      innerBoxHeightClass = "h-[670px] sm:h-[594px]";
    } else if (verificationStep === "success") {
      innerBoxHeightClass = "h-[551px] sm:h-[551px]";
    } else {
      innerBoxHeightClass = "h-[547px] sm:h-[467px]";
    }
  } else if (isBonusesTab) {
    innerBoxHeightClass = "h-[442px] sm:h-[409px]";
  } else if (isTransactionsTab) {
    innerBoxHeightClass = "h-[560px] sm:h-[560px]";
  } else if (isFiatAddress) {
    innerBoxHeightClass = "h-[500px] sm:h-[450px]";
  } else if (isFiatPayment) {
    innerBoxHeightClass = "h-[528px] sm:h-[464px]";
  } else if (isFiatSuccess) {
    innerBoxHeightClass = "h-[505px] sm:h-[472px]";
  } else if (isPending) {
    innerBoxHeightClass = "h-[411px] sm:h-[421px]";
  }

  return createPortal(
    <div className="fixed inset-0 z-40 sm:z-[120] overflow-hidden sm:overflow-y-auto top-[50px] sm:top-0">
      <div
        className="fixed inset-0 top-[50px] sm:top-0 bg-[#091741] sm:bg-[#0C1733]/70 sm:backdrop-blur-[8px]"
        onClick={onClose}
      />
      <div className="relative min-h-full flex flex-col justify-end sm:justify-center items-center p-0 pt-[30px] sm:py-[16px] pointer-events-none">
        <div className="deposit-modal-container relative w-full max-w-[414px] sm:max-w-[500px] h-fit sm:h-auto pointer-events-auto flex flex-col justify-end">
          <button
            onClick={onClose}
            className="absolute -right-[44px] top-0 z-10 text-white hover:opacity-70 transition-opacity hidden sm:block"
          >
            <X size={24} />
          </button>

          <div className={`relative flex flex-col items-center w-full ${modalHeightClass} max-[639px]:max-h-[calc(100vh-50px)] pt-[16px] sm:pt-[24px] px-[20px] pb-[40px] sm:pb-[32px] gap-[16px] sm:gap-[24px]`}>
            <div className="absolute inset-0 bg-[#091741] rounded-t-[30px] sm:rounded-[16px] overflow-hidden pointer-events-none">
              <div className="absolute top-[-125px] sm:top-[-145px] left-[calc(50%-165px)] sm:left-1/2 -translate-x-1/2 w-[174px] sm:w-[173px] h-[176px] sm:h-[173px] bg-[#1463FF] blur-[40px] rounded-full" />
            </div>

            <button
              onClick={onClose}
              className="absolute top-[16px] right-[16px] w-[28px] h-[28px] rounded-full bg-[#112F82]/80 hover:bg-[#1463FF] hidden items-center justify-center text-white transition-colors sm:hidden z-50"
            >
              <X size={16} />
            </button>

            <button
              onClick={onClose}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="w-[70px] h-[6px] bg-[#112F82] rounded-[100px] sm:hidden shrink-0 z-40 cursor-pointer hover:bg-[#1463FF] transition-colors"
              aria-label="Close wallet"
            />

            <div className={`flex flex-col items-start gap-[24px] w-full ${outerBoxHeightClass} max-[639px]:flex-1 max-[639px]:min-h-0 z-40`}>
              <div className="flex flex-row justify-start md:justify-center items-start md:items-center gap-[12px] w-full h-[29px]">
                <div className="flex flex-row items-center gap-[12px] h-[29px]">
                  <div className="relative flex items-center justify-center w-[20px] h-[20px] shrink-0">
                    <Image src="/wallet.svg" width={20} height={20} alt="Wallet" className="absolute top-0 left-0" />
                  </div>
                  <h2 className="font-['Jost'] font-extrabold text-[20px] leading-[29px] tracking-[0.01em] text-white">
                    Wallet
                  </h2>
                </div>
              </div>

              <div className={`flex flex-col items-start gap-[16px] w-full ${innerBoxHeightClass} max-[639px]:flex-1 max-[639px]:min-h-0`}>
                <div className="flex flex-row items-center gap-[8px] w-full h-[30px] shrink-0 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <button
                    onClick={() => setActiveTab("deposit")}
                    className={`flex-1 min-w-[80px] min-[375px]:min-w-[85px] min-[425px]:min-w-0 h-full flex items-center justify-center rounded-[6px] transition-colors ${activeTab === "deposit" ? "bg-[#1463FF]" : "bg-[#112F82] hover:bg-[#1A3FA6]"}`}
                  >
                    <span className={`font-[family-name:var(--font-manrope)] text-[12px] leading-[16px] tracking-[0.02em] ${activeTab === "deposit" ? "font-bold text-white" : "font-semibold text-[#A5B8EF]"}`}>Deposit</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("bonuses")}
                    className={`flex-1 min-w-[80px] min-[375px]:min-w-[85px] min-[425px]:min-w-0 h-full flex items-center justify-center rounded-[6px] transition-colors ${activeTab === "bonuses" ? "bg-[#1463FF]" : "bg-[#112F82] hover:bg-[#1A3FA6]"}`}
                  >
                    <span className={`font-[family-name:var(--font-manrope)] text-[12px] leading-[16px] tracking-[0.02em] ${activeTab === "bonuses" ? "font-bold text-white" : "font-semibold text-[#A5B8EF]"}`}>Bonuses</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("withdraw")}
                    className={`flex-1 min-w-[80px] min-[375px]:min-w-[85px] min-[425px]:min-w-0 h-full flex items-center justify-center rounded-[6px] transition-colors ${activeTab === "withdraw" ? "bg-[#1463FF]" : "bg-[#112F82] hover:bg-[#1A3FA6]"}`}
                  >
                    <span className={`font-[family-name:var(--font-manrope)] text-[12px] leading-[16px] tracking-[0.02em] ${activeTab === "withdraw" ? "font-bold text-white" : "font-semibold text-[#A5B8EF]"}`}>Withdraw</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("transactions")}
                    className={`flex-1 min-w-[80px] min-[375px]:min-w-[85px] min-[425px]:min-w-0 h-full flex items-center justify-center rounded-[6px] transition-colors ${activeTab === "transactions" ? "bg-[#1463FF]" : "bg-[#112F82] hover:bg-[#1A3FA6]"}`}
                  >
                    <span className={`font-[family-name:var(--font-manrope)] text-[12px] leading-[16px] tracking-[0.02em] ${activeTab === "transactions" ? "font-bold text-white" : "font-semibold text-[#A5B8EF]"}`}>Transactions</span>
                  </button>
                </div>

                {activeTab === "deposit" && (
                  <DepositTab
                    isPending={isPending}
                    animationCompleted={animationCompleted}
                    selectedBonus={selectedBonus}
                    setSelectedBonus={setSelectedBonus}
                    selectedPayment={selectedPayment}
                    setSelectedPayment={setSelectedPayment}
                    isBonusOpen={isBonusOpen}
                    setIsBonusOpen={setIsBonusOpen}
                    isPaymentOpen={isPaymentOpen}
                    setIsPaymentOpen={setIsPaymentOpen}
                    fiatStep={fiatStep}
                    setFiatStep={setFiatStep}
                    fiatAmount={fiatAmount}
                    setFiatAmount={setFiatAmount}
                    isCountryOpen={isCountryOpen}
                    setIsCountryOpen={setIsCountryOpen}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    onClose={onClose}
                    handleCompleteDeposit={handleCompleteDeposit}
                    bonuses={bonuses}
                    payments={payments}
                    countries={countries}
                    bonusRef={bonusRef}
                    paymentRef={paymentRef}
                    countryRef={countryRef}
                  />
                )}

                {activeTab === "bonuses" && (
                  <BonusesTab
                    promoCode={promoCode}
                    setPromoCode={setPromoCode}
                    isPromoApplied={isPromoApplied}
                    setIsPromoApplied={setIsPromoApplied}
                    selectedPayment={selectedPayment}
                    setFiatStep={setFiatStep}
                    setActiveTab={setActiveTab}
                    fiatAmount={fiatAmount}
                  />
                )}

                {activeTab === "withdraw" && (
                  <WithdrawTab
                    verificationStep={verificationStep}
                    setVerificationStep={setVerificationStep}
                    withdrawAmount={withdrawAmount}
                    setWithdrawAmount={setWithdrawAmount}
                    withdrawMethod={withdrawMethod}
                    setWithdrawMethod={setWithdrawMethod}
                    withdrawAddress={withdrawAddress}
                    setWithdrawAddress={setWithdrawAddress}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    isCountryOpen={isCountryOpen}
                    setIsCountryOpen={setIsCountryOpen}
                    countries={countries}
                    countryRef={countryRef}
                  />
                )}

                {activeTab === "transactions" && (
                  <TransactionsTab />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}