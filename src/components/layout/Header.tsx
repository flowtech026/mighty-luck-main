"use client";

import { SidebarNav } from '@/components/layout/Sidebar';
import { DepositModal } from '@/components/modals/DepositModal';
import { LogOut, Users, X } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Search } from '../ui/Search';
// import './header.css';

export function HeaderContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data: session, status } = useSession();
  const profileRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsProfileOpen(false);
    setIsDepositModalOpen(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(false);
    };
    window.addEventListener('openSearchModal', handleOpen);
    return () => window.removeEventListener('openSearchModal', handleOpen);
  }, []);



  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleOpenDeposit = () => {
      setIsDepositModalOpen(true);
      setIsOpen(false);
    };
    window.addEventListener('openDepositModal', handleOpenDeposit);
    return () => window.removeEventListener('openDepositModal', handleOpenDeposit);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-[110] w-full bg-[#0C1F56] h-[50px] sm:h-[60px] border-b border-[#112F82] sm:border-none">
      <div className="relative mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className="absolute rounded-full hidden sm:block left-[12px] md:left-[24px] lg:left-[114px]"
            style={{ width: '143px', height: '143px', top: '37px', background: '#1463FF', filter: 'blur(25px)' }}
          ></div>
          <div
            className="absolute rounded-full sm:hidden"
            style={{ width: '71.5px', height: '71.5px', left: '6px', top: '33px', background: '#1463FF', filter: 'blur(12.5px)' }}
          ></div>
        </div>

        <div className="flex items-center gap-[8px] md:gap-4 lg:gap-[30px] xl:gap-[51px] min-w-0 z-10">
          <button
            className="hidden lg:flex items-center justify-center min-h-[36px] min-w-[36px] min-[375px]:min-h-[44px] min-[375px]:min-w-[44px] text-white hover:opacity-80 transition-opacity shrink-0"
            onClick={() => {
              window.dispatchEvent(new Event('toggleDesktopSidebar'));
              window.dispatchEvent(new Event('closeSearchModal'));
            }}
            aria-label="Open menu"
          >
            <Image
              src="/men-icons.png"
              alt="Menu"
              width={22}
              height={22}
              className="object-contain"
            />
          </button>

          <Link
            href="/"
            className="flex items-center shrink-0"
            onClick={() => {
              setIsDepositModalOpen(false);
              setIsProfileOpen(false);
              window.dispatchEvent(new Event('closeSearchModal'));
              window.dispatchEvent(new Event('closeMobileMenu'));
            }}
          >
            <Image
              src="/king.svg"
              alt="Mighty Luck"
              width={44}
              height={30}
              className="sm:hidden object-contain relative z-10 shrink-0"
              style={{ width: '44px', height: '30px' }}
            />
            <Image
              src="/Horizontal logo.png"
              alt="Mighty Luck"
              width={150}
              height={28}
              className="hidden sm:block object-contain sm:w-[150px] md:w-[170px] lg:w-[150px] xl:w-[190px] h-auto relative z-10"
            />
          </Link>

          <div className="hidden lg:flex">
            <Search />
          </div>
        </div>

        {status === 'authenticated' ? (
          <div className="flex flex-row justify-end items-center gap-[16px] lg:gap-[8px] xl:gap-4 shrink-0 z-[2]">
             <div className="hidden lg:flex flex-row items-center gap-1">
              <button
                className="flex flex-row justify-center items-center px-[30px] py-[10px] gap-[10px] w-[116px] h-[40px] bg-[#112F82] hover:bg-[#153B9D] active:bg-[#0D2463] transition-colors rounded-[8px]"
                onClick={() => {
                  setIsDepositModalOpen(true);
                  window.dispatchEvent(new Event('closeSearchModal'));
                }}
              >
                <span className="font-manrope font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                  $105,98
                </span>
              </button>

              <button
                className="flex flex-row justify-center items-center px-[16px] py-[10px] gap-[8px] w-[110px] h-[40px] bg-[#FFC83D] rounded-[8px] hover:bg-[#F2B926] transition-colors"
                onClick={() => {
                  setIsDepositModalOpen(true);
                  window.dispatchEvent(new Event('closeSearchModal'));
                }}
              >
                <Image src="/wallet-dark.svg" width={16} height={16} alt="Wallet" />
                <span className="font-manrope font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#1A1404]">
                  Deposit
                </span>
              </button>
            </div>

            <div className="flex lg:hidden flex-row items-center gap-[4px] h-[30px]">
              <button
                className="flex flex-row justify-center items-center px-[12px] h-[30px] bg-[#112F82] hover:bg-[#153B9D] active:bg-[#0D2463] transition-colors rounded-[6px]"
                onClick={() => {
                  setIsDepositModalOpen(true);
                  window.dispatchEvent(new Event('closeSearchModal'));
                  window.dispatchEvent(new Event('closeMobileMenu'));
                }}
              >
                <span className="font-manrope font-bold text-[13px] leading-[18px] tracking-[0.02em] text-white">
                  $105,98
                </span>
              </button>
            </div>

            <div className="flex flex-row items-center gap-[8px] h-[30px] lg:h-auto">
              <button className="flex flex-row justify-center items-center p-[7.5px] w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] bg-[#173EAD] rounded-[6px] relative hover:bg-[#112F82] transition-colors">
                <Image src="/noti.svg" width={10.3} height={12} alt="Notifications" className="w-[10.3px] h-[12px] lg:w-[16px] lg:h-[16px]" />
                <div className="flex flex-col justify-center items-center p-[2.3px] absolute left-[22px] top-0 lg:left-auto lg:right-0 lg:top-0 w-[8px] h-[8px] lg:w-[10px] lg:h-[10px] bg-[#FF0E0E] rounded-[50px] z-10"></div>
              </button>

              <button className="flex flex-row justify-center items-center p-[7.5px] w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] bg-[#173EAD] rounded-[6px] relative hover:bg-[#112F82] transition-colors">
                <Image src="/gift-light.svg" width={12} height={12} alt="Gifts" className="w-[12px] h-[12px] lg:w-[16px] lg:h-[16px]" />
                <div className="flex flex-col justify-center items-center p-[2.3px] absolute left-[22px] top-0 lg:left-auto lg:right-0 lg:top-0 w-[8px] h-[8px] lg:w-[10px] lg:h-[10px] bg-[#FF0E0E] rounded-[50px] z-10"></div>
              </button>

              <div className="relative" ref={profileRef}>
                <button
                  className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] rounded-full overflow-hidden shrink-0 transition-opacity hover:opacity-80 flex items-center justify-center"
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                  }}
                >
                  <Image src="/user.png" alt="User" width={30} height={30} className="object-cover w-[30px] h-[30px] lg:w-[40px] lg:h-[40px]" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 top-[calc(100%+12px)] w-[240px] bg-[#112F82] rounded-[16px] shadow-lg border border-[#173EAD] overflow-hidden flex flex-col z-50">
                    <div className="flex flex-col gap-1 p-4 border-b border-[#173EAD]">
                      <span className="font-['Jost'] font-bold text-[16px] leading-[23px] text-white">Player</span>
                      <span className="font-['Manrope'] font-normal text-[14px] leading-[19px] text-[#A5B8EF] truncate">
                        {session?.user?.email || 'john@example.com'}
                      </span>
                    </div>
                    <div className="flex flex-col p-2">
                      <Link
                        href="?view=refer"
                        onClick={() => {
                          setIsProfileOpen(false);
                          window.dispatchEvent(new Event('closeSearchModal'));
                        }}
                        className="flex flex-row items-center gap-3 px-3 py-2.5 rounded-[8px] hover:bg-[#173EAD] transition-colors w-full text-left"
                      >
                        <Users size={18} color="#D2DCF7" />
                        <span className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#D2DCF7] hover:text-white transition-colors">Refer a Friend</span>
                      </Link>
                      <button
                        className="flex flex-row items-center gap-3 px-3 py-2.5 rounded-[8px] hover:bg-[#173EAD] transition-colors w-full text-left mt-1"
                        onClick={() => {
                          setIsProfileOpen(false);
                          signOut({ callbackUrl: '/' });
                        }}
                      >
                        <LogOut size={18} color="#D2DCF7" />
                        <span className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#D2DCF7] hover:text-white transition-colors">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-[7.5px] sm:gap-2 md:gap-4 xl:gap-[10px] shrink-0 z-10">
            <Link href="?auth=login" className="flex items-center justify-center w-[74px] h-[30px] sm:w-auto sm:min-h-[40px] sm:h-[40px] sm:px-6 md:px-[30px] xl:w-[99px] xl:h-[40px] xl:px-[30px] xl:py-[10px] rounded-[6px] sm:rounded-[8px] xl:rounded-[8px] font-['Manrope'] font-bold sm:font-semibold xl:font-bold text-[10.5px] sm:text-sm xl:text-[14px] leading-[100%] sm:leading-normal xl:leading-[19px] tracking-[0.02em] transition-colors bg-[#1463FF] text-white whitespace-nowrap">
              Login
            </Link>
            <Link href="?auth=register" className="flex items-center justify-center w-[67px] h-[30px] sm:w-auto sm:min-h-[40px] sm:h-[40px] sm:px-6 md:px-[30px] xl:w-[90px] xl:h-[40px] xl:px-[30px] xl:py-[10px] rounded-[6px] sm:rounded-[8px] xl:rounded-[8px] font-['Manrope'] font-bold sm:font-semibold xl:font-bold text-[10.5px] sm:text-sm xl:text-[14px] leading-[100%] sm:leading-normal xl:leading-[19px] tracking-[0.02em] transition-colors bg-[#FFC83D] text-[#1A1404] whitespace-nowrap">
              Join
            </Link>
          </div>
        )}
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-[280px] bg-[#0C1F56] z-50 flex flex-col transform transition-transform duration-300 translate-x-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden">
            <div className="flex items-center justify-between p-4 border-b border-[#112F82]">
              <Link href="/" onClick={() => setIsOpen(false)} className="shrink-0">
                <Image
                  src="/Horizontal logo.png"
                  alt="Mighty Luck"
                  width={140}
                  height={26}
                  className="object-contain h-auto"
                />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center min-h-[44px] min-w-[44px] text-white hover:opacity-80"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <div className="p-4">
              <Search className="w-full md:w-full" />
            </div>
            <nav className="flex flex-col px-4 pb-6 w-full">
              <SidebarNav />
            </nav>
            {status === 'authenticated' ? (
              <div className="flex flex-col mt-auto w-full">
                <div className="flex items-center gap-4 px-4 pb-5">
                  <Image src="/user.png" alt="User" width={48} height={48} className="rounded-full object-cover shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-['Jost'] font-bold text-[18px] text-white truncate">Player</span>
                    <span className="font-['Manrope'] font-medium text-[14px] text-[#A5B8EF] truncate">
                      {session?.user?.email || 'hra.opash@gmail.com'}
                    </span>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-[#112F82]" />

                <div className="flex flex-col pt-4 pb-6 px-4 gap-2">
                  <Link
                    href="?view=refer"
                    onClick={() => {
                      setIsOpen(false);
                      window.dispatchEvent(new Event('closeSearchModal'));
                    }}
                    className="flex flex-row items-center gap-4 px-2 py-2 rounded-[8px] hover:bg-[#173EAD] transition-colors w-full text-left"
                  >
                    <Users size={20} color="#D2DCF7" />
                    <span className="font-['Manrope'] font-medium text-[15px] text-white hover:text-white transition-colors">Refer a Friend</span>
                  </Link>
                  <button
                    className="flex flex-row items-center gap-4 px-2 py-2 rounded-[8px] hover:bg-[#173EAD] transition-colors w-full text-left"
                    onClick={() => {
                      setIsOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                  >
                    <LogOut size={20} color="#D2DCF7" />
                    <span className="font-['Manrope'] font-medium text-[15px] text-white hover:text-white transition-colors">Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-4 pb-6 flex flex-col gap-3 mt-auto">
                <Link href="?auth=login" onClick={() => setIsOpen(false)} className="flex items-center justify-center min-h-[44px] w-full rounded-[8px] font-semibold text-[15px] transition-colors bg-[#1463FF] text-white">
                  Login
                </Link>
                <Link href="?auth=register" onClick={() => setIsOpen(false)} className="flex items-center justify-center min-h-[44px] w-full rounded-[8px] font-semibold text-[15px] transition-colors bg-[#FFC83D] text-[#1A1404]">
                  Join
                </Link>
              </div>
            )}
          </div>
        </>
      )}

      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
      />
    </header>
  );
}

export default function Header() {
  return (
    <Suspense fallback={<div className="h-[50px] sm:h-[60px] bg-[#0C1F56] w-full" />}>
      <HeaderContent />
    </Suspense>
  );
}