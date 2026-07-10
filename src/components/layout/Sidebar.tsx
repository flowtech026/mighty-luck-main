"use client";

import { SearchModal } from '@/components/modals/SearchModal';
import SidebarReferSection from '@/components/sections/SidebarReferSection';
import { ChevronDown, ChevronUp, X, Plus } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';

export function SidebarContent() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsMobileSearchOpen(false);
    }, [pathname, searchParams]);

    useEffect(() => {
        if (isMobileSearchOpen) {
            setIsMobileMenuOpen(false);
        }
    }, [isMobileSearchOpen]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            setIsMobileSearchOpen(false);
        }
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleToggle = () => setIsCollapsed(prev => !prev);
        window.addEventListener('toggleDesktopSidebar', handleToggle as EventListener);
        return () => window.removeEventListener('toggleDesktopSidebar', handleToggle as EventListener);
    }, []);

    useEffect(() => {
        const handleClose = () => {
            setIsMobileSearchOpen(false);
        };
        window.addEventListener('closeSearchModal', handleClose);
        return () => window.removeEventListener('closeSearchModal', handleClose);
    }, []);

    useEffect(() => {
        const handleOpen = () => {
            if (window.innerWidth < 1024) {
                setIsMobileSearchOpen(true);
            }
        };
        window.addEventListener('openSearchModal', handleOpen);
        return () => window.removeEventListener('openSearchModal', handleOpen);
    }, []);

    useEffect(() => {
        const handleClose = () => {
            setIsMobileMenuOpen(false);
        };
        window.addEventListener('closeMobileMenu', handleClose);
        return () => window.removeEventListener('closeMobileMenu', handleClose);
    }, []);

    return (
        <>
            <aside className={`hidden lg:flex flex-col gap-[10px] shrink-0 transition-[width] duration-300 ${isCollapsed ? 'w-[72px]' : 'w-[232px]'}`}>
                <div className={`flex flex-none flex-col items-start rounded-[16px] bg-[#0C1F56] overflow-hidden transition-all duration-300 ${isCollapsed ? 'h-0 p-0 opacity-0 m-0 gap-0 border-0' : 'gap-[10px] h-[134px] w-[232px] p-[16px] mb-[10px]'}`}>
                    <div className="flex w-[200px] flex-none flex-col items-start gap-[8px]">
                        <div className="flex h-[44px] w-[200px] flex-none flex-row items-center gap-[4px]">
                            <div className="relative isolate overflow-hidden flex h-[44px] w-[98px] flex-none items-center gap-[2px] rounded-[8px] bg-[#3B005F] px-[8px] py-[6px]">
                                <div className="absolute inset-0 z-[-1] overflow-hidden rounded-[8px]">
                                    <div className="absolute -left-[43px] -top-[15px] h-[97px] w-[97px] rounded-full bg-[#A92BF5] blur-[25px]" />
                                </div>

                                <div className="relative z-[1] w-[24px] h-[24px] shrink-0 flex items-center justify-center">
                                    <div
                                        className="absolute -left-[17px] -top-[4px] h-[39.33px] w-[59px] bg-contain bg-center bg-no-repeat pointer-events-none mix-blend-screen"
                                        style={{ backgroundImage: "url('/sp-1.svg')" }}
                                    />
                                </div>
                                <div className="relative z-[2] flex h-[22px] w-[52px] flex-none flex-col justify-center">
                                    <p
                                        className="text-white"
                                        style={{
                                            width: '52px',
                                            height: '22px',
                                            fontFamily: 'var(--font-jost), Jost, sans-serif',
                                            fontStyle: 'normal',
                                            fontWeight: 700,
                                            fontSize: '11px',
                                            lineHeight: '100%',
                                            flex: 'none',
                                            order: 2,
                                            flexGrow: 0,
                                            zIndex: 2
                                        }}
                                    >
                                        REFER<br />A FRIEND
                                    </p>
                                </div>
                            </div>

                            <div className="relative isolate overflow-hidden flex h-[44px] w-[98px] flex-none items-center gap-[2px] rounded-[8px] bg-[#500039] px-[8px] py-[6px]">
                                <div className="absolute inset-0 z-[-1] overflow-hidden rounded-[8px]">
                                    <div className="absolute -left-[40px] -top-[5px] h-[97px] w-[97px] rounded-full bg-[#FF3981] blur-[25px]" />
                                </div>

                                <div className="relative z-[1] w-[24px] h-[24px] shrink-0 flex items-center justify-center">
                                    <div
                                        className="absolute -left-[23px] -top-[4px] h-[33.01px] w-[64px] bg-contain bg-center bg-no-repeat pointer-events-none mix-blend-screen"
                                        style={{ transform: "rotate(11.84deg)", backgroundImage: "url('/sp-2.svg')" }}
                                    />
                                </div>
                                <div className="relative z-[2] flex h-[22px] w-[57px] flex-none flex-col justify-center">
                                    <p
                                        className="text-white"
                                        style={{
                                            width: '57px',
                                            height: '22px',
                                            fontFamily: 'var(--font-jost), Jost, sans-serif',
                                            fontStyle: 'normal',
                                            fontWeight: 700,
                                            fontSize: '11px',
                                            lineHeight: '100%',
                                            flex: 'none',
                                            order: 2,
                                            flexGrow: 0,
                                            zIndex: 2
                                        }}
                                    >
                                        VIP<br />TRANSFER
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative isolate overflow-hidden flex h-[50px] w-[200px] flex-none items-center gap-[10px] rounded-[8px] bg-[#091741] px-[10px] py-[6px]">
                            <div className="absolute inset-0 z-[-1] overflow-hidden rounded-[8px]">
                                <div className="absolute -left-[53px] -top-[22px] h-[110px] w-[110px] rounded-full bg-[#1463FF] blur-[25px]" />
                            </div>
                            <div className="relative z-[1] w-[24px] h-[24px] shrink-0 flex items-center justify-center">
                                <div
                                    className="absolute h-[50px] w-[80px] -left-[20px] -top-[12px] bg-contain bg-center bg-no-repeat pointer-events-none"
                                    style={{ backgroundImage: "url('/sp-3.svg')" }}
                                />
                            </div>
                            <div className="relative z-[3] flex h-[30px] w-[138px] flex-none flex-col items-start gap-[2px]">
                                <h3
                                    className="whitespace-nowrap text-white"
                                    style={{
                                        width: '138px',
                                        height: '14px',
                                        fontFamily: 'var(--font-jost), Jost, sans-serif',
                                        fontStyle: 'italic',
                                        fontWeight: 900,
                                        fontSize: '18px',
                                        lineHeight: '13.9px',
                                        flex: 'none',
                                        order: 0,
                                        alignSelf: 'stretch',
                                        flexGrow: 0
                                    }}
                                >
                                    WINTER RUSH
                                </h3>
                                <p
                                    className="whitespace-nowrap text-white"
                                    style={{
                                        width: '124px',
                                        height: '14px',
                                        fontFamily: 'var(--font-jost), Jost, sans-serif',
                                        fontStyle: 'italic',
                                        fontWeight: 700,
                                        fontSize: '12px',
                                        lineHeight: '13.9px',
                                        flex: 'none',
                                        order: 1,
                                        flexGrow: 0
                                    }}
                                >
                                    $2,000,000<span style={{ fontSize: '16.22px', fontWeight: 600 }}> </span><span style={{ fontSize: '11px', fontWeight: 600 }}>IN PRIZES</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`w-full bg-[#0C1F56] rounded-[16px] flex flex-col p-[16px] transition-all duration-300 ${isCollapsed ? 'items-center' : ''}`}>
                    <SidebarNav isCollapsed={isCollapsed} />
                </div>
            </aside>

            {(isMobileMenuOpen || isMobileSearchOpen) && <div className="lg:hidden fixed bottom-0 left-0 right-0 h-[76px] bg-[#0C1F56] z-[98]" />}
            <nav id="mobile-bottom-nav" className={`lg:hidden fixed bottom-0 left-0 right-0 z-[100] flex flex-row items-center justify-between w-full h-[60px] bg-[#0C1F56] pt-[8px] pr-[20px] pb-[8px] pl-[20px] rounded-t-[16px] border-b border-transparent gap-[2px] ${(isMobileSearchOpen || isMobileMenuOpen) ? '' : 'shadow-[0_-4px_10px_rgba(0,0,0,0.2)]'}`}>
                <div
                    className={`flex flex-col items-center justify-center gap-[2px] w-[39px] h-[44px] cursor-pointer transition-colors group mx-auto ${isMobileMenuOpen ? 'text-[#FFBF1F]' : 'text-[#D2DCF7] hover:text-white'}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <div className="flex items-center justify-center w-[24px] h-[24px] shrink-0">
                        <Image
                            src="/menu.svg"
                            alt="Menu"
                            width={24}
                            height={24}
                            className={`w-[22px] h-[22px] transition-all ${isMobileMenuOpen ? 'opacity-100 [filter:brightness(0)_saturate(100%)_invert(80%)_sepia(52%)_saturate(1191%)_hue-rotate(336deg)_brightness(102%)_contrast(106%)]' : 'opacity-80 group-hover:opacity-100'}`}
                        />
                    </div>
                    <span className="font-['Manrope'] font-bold text-[10px] leading-[14px] tracking-[0.02em]">Menu</span>
                </div>
                <div
                    className={`flex flex-col items-center justify-center gap-[2px] w-[50px] h-[44px] cursor-pointer transition-colors group mx-auto ${isMobileSearchOpen ? 'text-[#FFBF1F]' : 'text-[#D2DCF7] hover:text-white'}`}
                    onClick={() => setIsMobileSearchOpen(prev => !prev)}
                >
                    <div className="flex items-center justify-center w-[24px] h-[24px] shrink-0">
                        <Image src="/search.svg" alt="Search" width={24} height={24} className={`w-[22px] h-[22px] transition-all ${isMobileSearchOpen ? 'opacity-100 [filter:brightness(0)_saturate(100%)_invert(80%)_sepia(52%)_saturate(1191%)_hue-rotate(336deg)_brightness(102%)_contrast(106%)]' : 'opacity-80 group-hover:opacity-100'}`} />
                    </div>
                    <span className="font-['Manrope'] font-bold text-[10px] leading-[14px] tracking-[0.02em]">Search</span>
                </div>
                <button
                    onClick={() => {
                        window.dispatchEvent(new Event('openDepositModal'));
                        window.dispatchEvent(new Event('closeMobileMenu'));
                        window.dispatchEvent(new Event('closeSearchModal'));
                    }}
                    className="flex items-center justify-center w-[52px] h-[52px] bg-[#FFC83D] rounded-full text-[#1A1404] hover:bg-[#F2B926] active:scale-95 transition-all  cursor-pointer transform -translate-y-[14px] shrink-0 z-10"
                    aria-label="Deposit"
                >
                    <Plus size={28} strokeWidth={2.5} color="#1A1404" />
                </button>
                <div className="flex flex-col items-center justify-center gap-[2px] w-[30px] h-[44px] cursor-pointer text-[#D2DCF7] hover:text-white transition-colors group mx-auto">
                    <div className="flex items-center justify-center w-[24px] h-[24px] shrink-0">
                        <Image src="/image 20 (Traced).svg" alt="VIP" width={20} height={19} className="w-[20px] h-[19px] opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="font-['Manrope'] font-bold text-[10px] leading-[14px] tracking-[0.02em]">VIP</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-[2px] w-[65px] h-[44px] cursor-pointer text-[#D2DCF7] hover:text-white transition-colors group mx-auto">
                    <div className="flex items-center justify-center w-[24px] h-[24px] shrink-0">
                        <Image src="/image 21 (Traced).svg" alt="Tourneys" width={18} height={18} className="w-[18px] h-[18px] opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="font-['Manrope'] font-bold text-[10px] leading-[14px] tracking-[0.02em]">Tourneys</span>
                </div>
            </nav>

            {isMobileMenuOpen && (
                <div className="lg:hidden fixed top-[50px] sm:top-[60px] left-0 right-0 bottom-[60px] z-[40] bg-[#0C1F56] flex flex-col w-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] animate-in slide-in-from-left duration-300">
                    <div className="p-[20px] flex flex-col gap-[10px] w-full flex-1">
                        <div className="flex flex-row justify-end items-center w-full pb-[12px] border-b border-[#112F82] mb-[10px] shrink-0">
                            {/* <span className="font-['Jost'] font-extrabold text-[18px] text-white tracking-[0.01em] uppercase">Menu</span> */}
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-[#112F82] hover:bg-[#1463FF] text-[#D2DCF7] hover:text-white transition-colors cursor-pointer"
                                aria-label="Close menu"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <SidebarReferSection />
                        <SidebarNav isCollapsed={false} onOpenSearch={() => setIsMobileMenuOpen(false)} />
                    </div>
                </div>
            )}

            <SearchModal
                isOpen={isMobileSearchOpen}
                onClose={() => setIsMobileSearchOpen(false)}
            />
        </>
    );
}

export default function Sidebar() {
    return (
        <Suspense fallback={null}>
            <SidebarContent />
        </Suspense>
    );
}

function SidebarNavContent({ isCollapsed = false, onOpenSearch }: { isCollapsed?: boolean; onOpenSearch?: () => void }) {
    const [openDropdown, setOpenDropdown] = useState<string | null>('casino');
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const router = useRouter();

    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        setIsSearchModalOpen(false);
    }, [pathname, searchParams]);

    useEffect(() => {
        const handleClose = () => {
            setIsSearchModalOpen(false);
        };
        window.addEventListener('closeSearchModal', handleClose);
        return () => window.removeEventListener('closeSearchModal', handleClose);
    }, []);

    useEffect(() => {
        const handleOpen = () => {
            if (window.innerWidth >= 1024) {
                setIsSearchModalOpen(true);
            }
        };
        window.addEventListener('openSearchModal', handleOpen);
        return () => window.removeEventListener('openSearchModal', handleOpen);
    }, []);

    const toggleDropdown = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    return (
        <div className={`flex flex-col gap-[16px] ${isCollapsed ? 'w-[40px]' : 'w-full'}`}>
            <NavItem icon={<Image src="/image 19 (Traced).svg" alt="Promotions" width={20} height={20} className="shrink-0" />} label="Promotions" isCollapsed={isCollapsed} />
            <NavItem icon={<Image src="/image 20 (Traced).svg" alt="VIP Program" width={20} height={20} className="shrink-0" />} label="VIP Program" isCollapsed={isCollapsed} />
            <NavItem icon={<Image src="/image 21 (Traced).svg" alt="Tournaments" width={20} height={20} className="shrink-0" />} label="Tournaments" isCollapsed={isCollapsed} />

            <div className={`flex flex-col rounded-[8px] transition-colors ${openDropdown === 'casino' ? 'bg-[#112F82]' : ''} ${isCollapsed ? 'w-[40px]' : 'w-full'}`}>
                <div
                    onClick={() => toggleDropdown('casino')}
                    className={`group relative isolate overflow-hidden flex items-center cursor-pointer text-white transition-colors bg-[#1463FF] rounded-[8px] ${isCollapsed ? 'justify-center w-[40px] h-[40px] px-0' : 'justify-between px-[10px] w-full h-[50px]'}`}
                >
                    <div className={`relative z-10 flex items-center ${isCollapsed ? 'justify-center' : 'gap-[12px]'}`}>
                        <div className="flex items-center justify-center w-[20px] h-[20px] shrink-0">
                            <Image src="/Frame.svg" alt="Casino" width={20} height={20} className="shrink-0" />
                        </div>
                        {!isCollapsed && <span className="font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.02em]">Casino</span>}
                    </div>
                    {(!isCollapsed) && (openDropdown === 'casino' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}

                    {isCollapsed && (
                        <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#1463FF] text-white text-[13px] font-bold rounded-[6px] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-[100] shadow-xl">
                            Casino
                            <div className="absolute top-1/2 -translate-y-1/2 -left-[8px] border-[4px] border-transparent border-r-[#1463FF]" />
                        </div>
                    )}
                </div>
                {openDropdown === 'casino' && (
                    <div className={`flex flex-col rounded-b-[8px] ${isCollapsed ? 'items-center py-3 gap-4 px-0' : 'px-[16px] py-[20px] gap-[20px]'}`}>
                        <SubNavItem icon={<Image src="/all.svg" alt="All Games" width={20} height={20} className="w-[20px] h-[20px] shrink-0" />} label="All Games" onClick={() => { setIsSearchModalOpen(true); onOpenSearch?.(); }} isCollapsed={isCollapsed} />
                        <SubNavItem icon={<Image src="/Frame1.svg" alt="New Games" width={20} height={20} className="w-[20px] h-[20px] shrink-0" />} label="New Games" isCollapsed={isCollapsed} />
                        <SubNavItem icon={<Image src="/Frame2.svg" alt="Popular Games" width={20} height={20} className="w-[20px] h-[20px] shrink-0" />} label="Popular Games" onClick={() => { setIsSearchModalOpen(true); onOpenSearch?.(); }} isCollapsed={isCollapsed} />
                        <SubNavItem icon={<Image src="/Frame3.svg" alt="Original Games" width={20} height={20} className="w-[20px] h-[20px] shrink-0" />} label="Original Games" onClick={() => {
                            const params = new URLSearchParams(searchParams?.toString());
                            params.set('tab', 'originals');
                            router.push(`${pathname}?${params.toString()}`);
                        }} isCollapsed={isCollapsed} />
                        <SubNavItem icon={<Image src="/Vector1.svg" alt="Crash Games" width={20} height={20} className="w-[20px] h-[20px] shrink-0" />} label="Crash Games" onClick={() => {
                            const params = new URLSearchParams(searchParams?.toString());
                            params.set('tab', 'crash-games');
                            router.push(`${pathname}?${params.toString()}`);
                        }} isCollapsed={isCollapsed} />
                    </div>
                )}
            </div>

            <div className={`flex flex-col rounded-[8px] transition-colors ${openDropdown === 'live-casino' ? 'bg-[#112F82]' : ''} ${isCollapsed ? 'w-[40px]' : 'w-full'}`}>
                <div
                    onClick={() => toggleDropdown('live-casino')}
                    className={`group relative isolate overflow-hidden flex items-center cursor-pointer text-white transition-colors bg-[#1463FF] rounded-[8px] ${isCollapsed ? 'justify-center w-[40px] h-[40px] px-0' : 'justify-between px-[10px] w-full h-[50px]'}`}
                >
                    <div className={`relative z-10 flex items-center ${isCollapsed ? 'justify-center' : 'gap-[12px]'}`}>
                        <div className="flex items-center justify-center w-[20px] h-[20px] shrink-0">
                            <Image src="/Frame4.svg" alt="Live Casino" width={20} height={20} className="w-[20px] h-[17.62px] shrink-0" />
                        </div>
                        {!isCollapsed && <span className="font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.02em]">Live Casino</span>}
                    </div>
                    {(!isCollapsed) && (openDropdown === 'live-casino' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}

                    {isCollapsed && (
                        <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#1463FF] text-white text-[13px] font-bold rounded-[6px] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-[100] shadow-xl">
                            Live Casino
                            <div className="absolute top-1/2 -translate-y-1/2 -left-[8px] border-[4px] border-transparent border-r-[#1463FF]" />
                        </div>
                    )}
                </div>
                {openDropdown === 'live-casino' && (
                    <div className={`flex flex-col rounded-b-[8px] ${isCollapsed ? 'items-center py-3 gap-4 px-0' : 'px-[16px] py-[20px] gap-[20px]'}`}>
                        <SubNavItem icon={<Image src="/Frame1.svg" alt="All Live Games" width={20} height={20} className="w-[120px] h-[20px] shrink-0" />} label="All Live Games" isCollapsed={isCollapsed} />
                    </div>
                )}
            </div>

            <div className={`mt-2 ${isCollapsed ? 'flex justify-center' : ''}`}>
                <NavItem icon={<Image src="/Vector3.svg" alt="Live Support" width={20} height={20} className="shrink-0" />} label="Live Support" isCollapsed={isCollapsed} />
            </div>

            <SearchModal
                isOpen={isSearchModalOpen}
                onClose={() => setIsSearchModalOpen(false)}
            />
        </div>
    );
}

function NavItem({ icon, label, isCollapsed }: { icon: React.ReactNode; label: string; isCollapsed?: boolean }) {
    return (
        <div className={`group relative flex items-center cursor-pointer bg-[#112F82] rounded-[8px] transition-colors text-[#D2DCF7] hover:text-white ${isCollapsed ? 'justify-center w-[40px] h-[40px] px-0' : 'gap-[12px] w-full h-[50px] px-[10px]'}`}>
            <div className="relative z-10 flex items-center justify-center w-[20px] h-[20px] shrink-0">
                {icon}
            </div>
            {!isCollapsed && <span className="font-['Manrope'] font-semibold text-[16px] leading-[22px] tracking-[0.02em]">{label}</span>}
            {isCollapsed && (
                <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#1463FF] text-white text-[13px] font-bold rounded-[6px] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-[100] shadow-xl">
                    {label}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-[8px] border-[4px] border-transparent border-r-[#1463FF]" />
                </div>
            )}
        </div>
    );
}

export function SidebarNav(props: { isCollapsed?: boolean; onOpenSearch?: () => void }) {
    return (
        <Suspense fallback={null}>
            <SidebarNavContent {...props} />
        </Suspense>
    );
}

function SubNavItem({ icon, label, onClick, isCollapsed }: { icon: React.ReactNode; label: string; onClick?: () => void; isCollapsed?: boolean }) {
    return (
        <div
            onClick={onClick}
            className={`group relative flex items-center cursor-pointer transition-colors text-[#D2DCF7] hover:text-white ${isCollapsed ? 'justify-center w-[20px] h-[20px] px-0' : 'gap-[12px] w-full h-[22px]'}`}
        >
            <div className="relative z-10 flex items-center justify-center w-[20px] h-[20px] shrink-0">
                {icon}
            </div>
            {!isCollapsed && <span className="font-['Manrope'] font-semibold text-[16px] leading-[22px] tracking-[0.02em]">{label}</span>}
            {isCollapsed && (
                <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#1463FF] text-white text-[13px] font-bold rounded-[6px] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-[100] shadow-xl">
                    {label}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-[8px] border-[4px] border-transparent border-r-[#1463FF]" />
                </div>
            )}
        </div>
    );
}
