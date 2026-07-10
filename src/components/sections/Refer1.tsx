"use client";

import { DollarSign, Users } from 'lucide-react';
import React, { useRef, useState } from 'react';

const MAX_FRIENDS = 50;
const EARNINGS_PER_FRIEND = 50;

function StatItem({
  label,
  value,
  icon,
  action,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 w-full min-w-0">
      <div className="font-['Manrope'] font-semibold text-[12px] leading-4 tracking-[0.02em] text-[#BBCAF3]">
        {label}
      </div>
      <div className="flex flex-row items-center justify-between gap-3 p-[10px_16px] w-full min-h-[50px] xl:min-h-[40px] bg-[#112F82] rounded-[8px]">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-5 h-5 rounded-full bg-[#FFC83D] flex items-center justify-center shrink-0">
            {icon}
          </div>
          <span className="font-['Manrope'] font-bold text-base leading-[22px] tracking-[0.02em] text-white truncate">
            {value}
          </span>
        </div>
        {action}
      </div>
    </div>
  );
}

function EarningsSlider({
  friends,
  percentage,
  trackRef,
  onPointerDown,
  onPointerMove,
}: {
  friends: number;
  percentage: number;
  trackRef: React.RefObject<HTMLDivElement | null>;
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="font-['Manrope'] font-semibold text-[12px] leading-4 tracking-[0.02em] text-[#BBCAF3]">
        Invited Friends
      </div>
      <div
        ref={trackRef}
        className="w-full h-10 relative flex flex-col justify-center cursor-pointer touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
      >
        <div className="absolute w-full h-[6px] bg-[#112F82] rounded-full top-[17px] left-0 pointer-events-none" />
        <div
          className="absolute h-[6px] bg-[#1463FF] rounded-l-full top-[17px] left-0 pointer-events-none transition-all duration-75"
          style={{ width: `calc(${percentage} * (100% - 54px) + 27px)` }}
        />
        <div
          className="absolute flex justify-center items-center px-3 py-1 gap-1 w-[54px] h-[30px] bg-[#1463FF] rounded-full top-[5px] shadow-md pointer-events-none transition-all duration-75"
          style={{ left: `calc(${percentage} * (100% - 54px))` }}
        >
          <Users size={14} className="text-white" strokeWidth={2.5} />
          <span className="font-['Manrope'] font-bold text-base leading-[22px] tracking-[0.02em] text-white select-none">
            {friends}
          </span>
        </div>
      </div>
    </div>
  );
}

function InviteForm({ stacked = false }: { stacked?: boolean }) {
  if (stacked) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <input
          type="email"
          placeholder="Enter email address"
          className="w-full h-[50px] px-4 bg-[#112F82] rounded-[8px] font-['Manrope'] font-semibold text-sm leading-[19px] tracking-[0.02em] text-white placeholder-[#7795E8] outline-none border border-transparent focus:border-[#1463FF] transition-colors"
        />
        <button className="flex justify-center items-center w-full h-[50px] bg-[#FFC83D] rounded-[8px] hover:bg-[#F2B926] transition-colors cursor-pointer">
          <span className="font-['Manrope'] font-bold text-base leading-[22px] tracking-[0.02em] text-[#1A1404] whitespace-nowrap">
            Send Invite
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-start gap-2 w-full">
      <input
        type="email"
        placeholder="Enter email address"
        className="flex-1 min-w-0 h-10 px-4 bg-[#112F82] rounded-[8px] font-['Manrope'] font-semibold text-sm leading-[19px] tracking-[0.02em] text-[#7795E8] placeholder-[#7795E8] outline-none border border-transparent focus:border-[#1463FF] transition-colors"
      />
      <button className="flex justify-center items-center shrink-0 px-[30px] h-10 bg-[#FFC83D] rounded-[8px] hover:bg-[#F2B926] transition-colors cursor-pointer">
        <span className="font-['Manrope'] font-bold text-sm leading-[19px] tracking-[0.02em] text-[#1A1404] whitespace-nowrap">
          Send Invite
        </span>
      </button>
    </div>
  );
}

export default function Refer1() {
  const [friends, setFriends] = useState(5);
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const percentage = friends / MAX_FRIENDS;
  const earnings = friends * EARNINGS_PER_FRIEND;

  const updateSlider = (clientX: number, isMobile: boolean) => {
    const activeRef = isMobile ? mobileTrackRef : desktopTrackRef;
    if (!activeRef.current) return;
    const rect = activeRef.current.getBoundingClientRect();
    const newX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setFriends(Math.round((newX / rect.width) * MAX_FRIENDS));
  };

  const handlePointerDown = (e: React.PointerEvent, isMobile: boolean) => {
    const activeRef = isMobile ? mobileTrackRef : desktopTrackRef;
    if (!activeRef.current) return;
    activeRef.current.setPointerCapture(e.pointerId);
    updateSlider(e.clientX, isMobile);
  };

  const handlePointerMove = (e: React.PointerEvent, isMobile: boolean) => {
    if (e.buttons !== 1) return;
    updateSlider(e.clientX, isMobile);
  };

  const stats = (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 w-full">
      <StatItem
        label="Total Referrals"
        value="12"
        icon={<Users size={12} strokeWidth={3} className="text-[#1A1404]" />}
      />
      <StatItem
        label="Total Deposits"
        value="$5000.00"
        icon={<DollarSign size={12} strokeWidth={3} className="text-[#1A1404]" />}
      />
      <StatItem
        label="Total Earnings"
        value="$500.00"
        icon={<DollarSign size={12} strokeWidth={3} className="text-[#1A1404]" />}
      />
      <StatItem
        label="Pending Income"
        value="$150.00"
        icon={<DollarSign size={12} strokeWidth={3} className="text-[#1A1404]" />}
        action={
          <button className="flex justify-center items-center shrink-0 px-4 h-[30px] xl:h-6 bg-[#1463FF] rounded-[6px] hover:bg-[#114CD6] transition-colors cursor-pointer">
            <span className="font-['Manrope'] font-semibold text-xs leading-4 tracking-[0.02em] text-white">
              Claim
            </span>
          </button>
        }
      />
    </div>
  );

  const calculatorBody = (stacked: boolean, isMobile: boolean) => (
    <div className="flex flex-col gap-4 w-full">
      <EarningsSlider
        friends={friends}
        percentage={percentage}
        trackRef={isMobile ? mobileTrackRef : desktopTrackRef}
        onPointerDown={(e) => handlePointerDown(e, isMobile)}
        onPointerMove={(e) => handlePointerMove(e, isMobile)}
      />
      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-row flex-wrap justify-center items-center gap-3 p-[10px_16px] w-full min-h-[60px] bg-[#112F82] rounded-[8px]">
          <span className="font-['Manrope'] font-bold text-sm leading-[19px] tracking-[0.02em] text-white">
            Your monthly earnings:
          </span>
          <span className="font-['Manrope'] font-bold text-2xl leading-[33px] tracking-[0.02em] text-white">
            ${earnings}
          </span>
        </div>
        <p className="font-['Manrope'] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8]">
          * Calculations are based on average player activity and may vary in individual cases
        </p>
      </div>
      <InviteForm stacked={stacked} />
    </div>
  );

  return (
    <div className="w-full">
      <div
        className="hidden xl:flex flex-col gap-5 w-full p-8 xl:p-[32px_40px] rounded-2xl overflow-hidden relative"
        style={{
          background:
            'linear-gradient(95.59deg, #06102B 13.87%, rgba(6, 16, 43, 0) 35.34%), url(/refer.png) center/cover, #2A0B3E',
        }}
      >
        <div className="flex flex-row justify-between items-center gap-6 w-full z-10">
          <div className="flex flex-col gap-1 max-w-[457px] text-left">
            <p className="font-['Jost'] font-medium text-[28px] leading-10 text-white">
              Get <span className="text-[#FFC83D] font-bold">PAID</span> every time
            </p>
            <h2 className="font-['Jost'] font-extrabold text-[48px] leading-[48px] text-white">
              YOUR FRIEND PLAYS!
            </h2>
          </div>

          <div className="flex flex-col items-center p-5 gap-6 w-full max-w-[430px] bg-[#091741] rounded-2xl relative isolate overflow-hidden shrink-0">
            <div className="absolute w-[173px] h-[173px] bg-[#1463FF] blur-[40px] -top-[118px] left-1/2 -translate-x-1/2 rounded-full pointer-events-none z-0" />
            <div className="relative z-10 flex flex-col items-center gap-6 w-full">
              <h3 className="max-w-[300px] font-['Jost'] font-extrabold text-xl leading-[29px] text-center tracking-[0.01em] text-white">
                How much can you earn with Mighty Luck?
              </h3>
              <div className="w-full">{calculatorBody(false, false)}</div>
            </div>
          </div>
        </div>

        <div className="p-5 xl:px-6 bg-[#091741] rounded-2xl z-10">{stats}</div>
      </div>

      <div className="flex xl:hidden flex-col gap-5 w-full">
        <div className="w-full aspect-[374/170] min-h-[150px] max-h-[200px] rounded-[10px] overflow-hidden relative">
          <img
            src="/refer.svg"
            alt="Referral Banner"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute w-[226px] h-[226px] -left-[74px] -top-[43px] bg-[#03123C] blur-[29px] pointer-events-none" />
          <div className="absolute left-5 top-1/2 -translate-y-1/2 max-w-[55%] pointer-events-none">
            <p className="font-['Jost'] font-medium text-sm sm:text-base leading-5 text-white">
              Get <span className="font-bold text-[#FFC83D]">PAID</span> every time
            </p>
            <h2 className="font-['Jost'] font-extrabold text-xl sm:text-2xl leading-tight text-white mt-0.5">
              YOUR FRIEND
              <br />
              PLAYS!
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-center p-5 gap-6 w-full bg-[#0C1F56] rounded-2xl relative isolate overflow-hidden">
          <div className="absolute w-[173px] h-[173px] left-1/2 -translate-x-1/2 -top-[127px] bg-[#1463FF] blur-[40px] rounded-full pointer-events-none z-0" />
          <div className="relative z-10 flex flex-col items-center gap-6 w-full">
            <h3 className="font-['Jost'] font-extrabold text-lg sm:text-xl leading-[26px] text-center tracking-[0.01em] text-white max-w-[300px]">
              How much can you earn with Mighty Luck?
            </h3>
            <div className="w-full">{calculatorBody(true, true)}</div>
          </div>
        </div>

        <div className="p-5 sm:px-6 bg-[#0C1F56] rounded-2xl">{stats}</div>
      </div>
    </div>
  );
}
