"use client";

import gamesData from '@/data/games.json';
import providerData from '@/data/providerData.json';
import {
  Search,
  X
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState('All Games');
  const [searchQuery, setSearchQuery] = useState('');
  const providersScrollRef = useRef<HTMLDivElement>(null);
  const [activeProviderPage, setActiveProviderPage] = useState(0);

  const handleGameClick = (gameId: string | number) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (status === 'authenticated') {
      params.set('game', gameId.toString());
    } else {
      params.set('auth', 'login');
    }
    router.push(`${pathname}?${params.toString()}`);
    onClose();
  };

  const handleProviderScroll = () => {
    if (providersScrollRef.current) {
      const scrollLeft = providersScrollRef.current.scrollLeft;
      const scrollWidth = providersScrollRef.current.scrollWidth;
      const clientWidth = providersScrollRef.current.clientWidth;
      const maxScrollLeft = scrollWidth - clientWidth;

      if (maxScrollLeft <= 0) {
        setActiveProviderPage(0);
        return;
      }

      const page = Math.round((scrollLeft / maxScrollLeft) * 2); // 3 dots = indices 0, 1, 2
      setActiveProviderPage(page);
    }
  };

  const scrollToProviderPage = (pageIndex: number) => {
    if (providersScrollRef.current) {
      const scrollWidth = providersScrollRef.current.scrollWidth;
      const clientWidth = providersScrollRef.current.clientWidth;
      const maxScrollLeft = scrollWidth - clientWidth;

      const targetScrollLeft = (pageIndex / 2) * maxScrollLeft;

      providersScrollRef.current.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
      setActiveProviderPage(pageIndex);
    }
  };

  const handlePrevProvider = () => {
    if (activeProviderPage > 0) {
      scrollToProviderPage(activeProviderPage - 1);
    }
  };

  const handleNextProvider = () => {
    if (activeProviderPage < 2) {
      scrollToProviderPage(activeProviderPage + 1);
    }
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const topCategories = [
    { name: 'All Games', icon: '/all.svg' },
    { name: 'Recently Played', icon: '/recent.svg' },
    { name: 'Favorites', icon: '/fav.svg' },
    { name: 'New Releases', icon: '/new.svg' },
  ];

  const bottomCategories = [
    { name: 'Original', icon: '/orignals.svg' },
    { name: 'Slots', icon: '/slots.svg' },
    { name: 'Roulette', icon: '/roulette.svg' },
    { name: 'Crash Games', icon: '/crashgame.svg' },
    { name: 'Table Games', icon: '/tg.svg' },
    { name: 'Live Casino', icon: '/live.svg' },
    { name: 'Baccarat', icon: '/baccarat.svg' },
    { name: 'Blackjack', icon: '/blackjet.svg' },
  ];

  const searchResults = gamesData.filter(game => game.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const popularGames = gamesData.filter(game => game.isPopular);

  return createPortal(
    <div className="fixed top-[50px] sm:top-[60px] lg:top-0 bottom-[60px] lg:bottom-0 left-0 right-0 z-[60] lg:z-[120] flex items-center justify-center lg:overflow-y-auto py-0 lg:py-[16px] px-0 lg:px-[12px] bg-[#0C1F56] lg:bg-transparent">
      <div
        className="fixed inset-0 bg-transparent lg:bg-[#0C1733]/70 lg:backdrop-blur-[8px]"
        onClick={onClose}
      />

      <div className="relative w-full max-w-[1056px] my-auto pointer-events-none flex justify-center px-0 lg:px-[60px] xl:px-0 h-full lg:h-auto">
        <div className="relative pointer-events-auto w-full h-full lg:h-auto">
          <button
            onClick={onClose}
            className="absolute -right-[44px] top-0 z-10 text-white hover:opacity-70 transition-opacity hidden lg:block"
          >
            <X size={24} />
          </button>

          <div
            className="relative flex flex-col lg:flex-row items-start lg:items-start p-[0px] lg:p-[24px] gap-[0px] lg:gap-[20px] w-full max-w-[1056px] h-full lg:h-auto lg:min-h-[636px] lg:max-h-[calc(100vh-80px)] bg-[#0C1F56] lg:bg-[#091741] rounded-none lg:rounded-[20px] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="hidden lg:flex flex-col justify-center items-start gap-[12px] w-[180px] h-[588px] shrink-0">
              <div className="flex flex-row items-start p-[16px] gap-[10px] w-[180px] h-[200px] bg-[#0C1F56] rounded-[12px]">
                <div className="flex flex-col items-start gap-[8px] w-[148px] h-[168px]">
                  {topCategories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setActiveCategory(cat.name)}
                      className={`flex flex-row items-center p-[10px] gap-[8px] w-[148px] h-[36px] bg-[#112F82] rounded-[8px] transition-colors ${activeCategory === cat.name ? 'opacity-100 border border-[#1463FF]' : 'hover:opacity-80'}`}
                    >
                      <div className="flex flex-row justify-center items-center p-0 w-[16px] h-[16px]">
                        <span className={`flex justify-center items-center w-full h-full ${activeCategory === cat.name ? 'text-white' : 'text-[#A5B8EF]'}`}>
                          <div
                            className="w-full h-full bg-current"
                            style={{ WebkitMaskImage: `url(${cat.icon})`, WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskImage: `url(${cat.icon})`, maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }}
                          />
                        </span>
                      </div>
                      <span className={`font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] ${activeCategory === cat.name ? 'text-white' : 'text-[#A5B8EF]'}`}>
                        {cat.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-row items-start p-[16px] gap-[10px] w-[180px] h-[376px] bg-[#0C1F56] rounded-[12px]">
                <div className="flex flex-col items-start gap-[8px] w-[148px] h-[344px]">
                  {bottomCategories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setActiveCategory(cat.name)}
                      className={`flex flex-row items-center p-[10px] gap-[8px] w-[148px] h-[36px] bg-[#112F82] rounded-[8px] transition-colors ${activeCategory === cat.name ? 'opacity-100 border border-[#1463FF]' : 'hover:opacity-80'}`}
                    >
                      <div className="flex flex-row justify-center items-center p-0 w-[16px] h-[16px]">
                        <span className={`flex justify-center items-center w-full h-full ${activeCategory === cat.name ? 'text-white' : 'text-[#A5B8EF]'}`}>
                          <div
                            className="w-full h-full bg-current"
                            style={{ WebkitMaskImage: `url(${cat.icon})`, WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskImage: `url(${cat.icon})`, maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }}
                          />
                        </span>
                      </div>
                      <span className={`font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] ${activeCategory === cat.name ? 'text-white' : 'text-[#A5B8EF]'}`}>
                        {cat.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[20px] lg:gap-[32px] w-full lg:max-w-[808px] overflow-y-auto overflow-x-hidden pb-[16px] lg:pb-0 [&::-webkit-scrollbar]:hidden px-4 sm:px-6 md:px-8 lg:px-0 py-[20px] lg:py-0 flex-1 min-h-0 lg:self-stretch">
              <div className="flex flex-row items-center gap-[10px] w-full order-first lg:order-none">
                <div className={`flex flex-row items-center flex-1 lg:w-full ${searchQuery ? 'justify-between py-[10px] pl-[20px] pr-[10px] border border-[#1463FF] rounded-[12px]' : 'p-[10px_20px] rounded-[8px]'
                  } gap-[10px] h-[50px] lg:h-[40px] bg-[#112F82] shrink-0 box-border transition-all duration-200`}>
                  <div className="flex flex-row items-center gap-[10px] w-full">
                    <div className="flex flex-col items-start w-[16px] h-[15.99px]">
                      <Search size={16} className="text-white" strokeWidth={2.5} />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="What are you looking for?"
                      className={`bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] text-[16px] lg:text-[14px] leading-[22px] lg:leading-[19px] w-full transition-colors placeholder:text-[12px] placeholder:leading-[16px] sm:placeholder:text-[14px] sm:placeholder:leading-[19px] ${searchQuery ? 'font-bold text-[#FFFFFF] placeholder:text-[#FFFFFF]' : 'font-semibold text-[#BBCAF3] placeholder:text-[#BBCAF3]'
                        }`}
                    />
                  </div>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="flex flex-row justify-center items-center px-[16px] gap-[8px] w-[64px] h-[30px] bg-[#1463FF] rounded-[6px] hover:opacity-80 transition-opacity shrink-0 box-border"
                    >
                      <span className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#FFFFFF]">
                        Clear
                      </span>
                    </button>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="lg:hidden flex flex-row justify-center items-center w-[50px] h-[50px] bg-[#112F82] rounded-[8px] hover:opacity-85 transition-opacity shrink-0 text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex lg:hidden flex-row gap-[8px] overflow-x-auto w-full [&::-webkit-scrollbar]:hidden snap-x shrink-0">
                {topCategories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`flex flex-row items-center p-[10px] gap-[8px] h-[40px] rounded-[8px] shrink-0 snap-start transition-colors ${activeCategory === cat.name ? 'bg-[#1463FF]' : 'bg-[#112F82]'
                      }`}
                  >
                    <div className="flex flex-col justify-center items-center w-[16px] h-[16px]">
                      <div
                        className="w-full h-full bg-[#A5B8EF]"
                        style={{ WebkitMaskImage: `url(${cat.icon})`, WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskImage: `url(${cat.icon})`, maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }}
                      />
                    </div>
                    <span className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#A5B8EF] whitespace-nowrap">
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>

              {searchQuery === '' ? (
                <div className="flex flex-col gap-[30px] lg:gap-[32px] w-full">
                  <div className="flex flex-col gap-[12px] w-full">
                    <div className="flex flex-row justify-between items-center w-full lg:max-w-[808px] h-auto lg:h-[29px] self-stretch shrink-0">
                      <div className="flex flex-row items-center gap-[7.2px] lg:gap-[8px] w-auto lg:w-[209px] h-auto lg:h-[29px] shrink-0">
                        <div className="w-[18px] lg:w-[20px] h-[18px] lg:h-[20px] flex items-center justify-center text-[#FFBF1F] shrink-0">
                          <div
                            className="w-full lg:w-[15.86px] h-full lg:h-[20px] bg-current"
                            style={{ WebkitMaskImage: 'url(/popular.svg)', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskImage: 'url(/popular.svg)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }}
                          />
                        </div>
                        <h3 className="font-[family-name:var(--font-jost)] font-extrabold text-[16px] lg:text-[20px] leading-[23px] lg:leading-[29px] tracking-[0.01em] uppercase text-white whitespace-nowrap w-auto lg:w-[181px] h-auto lg:h-[29px]">
                          Popular Games
                        </h3>
                      </div>
                      <span className="font-['Manrope'] font-bold lg:hidden text-[12px] leading-[16px] tracking-[0.02em] text-[#FFBF1F] cursor-pointer hover:text-white transition-colors whitespace-nowrap flex w-[46px] h-[16px] items-center justify-center shrink-0">
                        View all
                      </span>
                    </div>

                    <div className="flex flex-row gap-[8px] lg:gap-[12px] overflow-x-auto w-full [&::-webkit-scrollbar]:hidden snap-x snap-mandatory pr-[16px] lg:pr-0">
                      {popularGames.map((game) => (
                        <div key={game.id} onClick={() => handleGameClick(game.id)} className="w-[121.6px] lg:w-[152px] h-[160px] lg:h-[200px] shrink-0 rounded-[9.6px] lg:rounded-[12px] overflow-hidden relative bg-[#CDCDCD] snap-start group cursor-pointer">
                          <Image unoptimized src={game.image} alt={game.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-[12px] w-full">
                    <div className="flex flex-row justify-between items-center w-full lg:max-w-[808px] h-[23px] lg:h-[30px]">
                      <div className="flex flex-row items-center gap-[7.2px] lg:gap-[8px] w-[176.2px] lg:w-[217px] h-[23px] lg:h-[29px]">
                        <div className="w-[18px] lg:w-[20px] h-[18px] lg:h-[20px] flex items-center justify-center text-[#FFC83D] shrink-0">
                          <div
                            className="w-full h-full bg-current"
                            style={{ WebkitMaskImage: 'url(/gameprovider.svg)', WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskImage: 'url(/gameprovider.svg)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }}
                          />
                        </div>
                        <h3 className="font-[family-name:var(--font-jost)] font-extrabold text-[16px] lg:text-[20px] leading-[23px] lg:leading-[29px] tracking-[0.01em] uppercase text-white whitespace-nowrap w-[151px] lg:w-[189px] h-[23px] lg:h-[29px]">
                          Game Providers
                        </h3>
                      </div>

                      <div className="lg:hidden">
                        <span className="font-['Manrope'] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-[#FFBF1F] cursor-pointer hover:text-white transition-colors whitespace-nowrap flex w-[46px] h-[16px] items-center justify-center">
                          View all
                        </span>
                      </div>

                      <div className="hidden lg:flex flex-row items-center gap-[8px] w-[68px] h-[30px] shrink-0">
                        <button
                          onClick={handlePrevProvider}
                          disabled={activeProviderPage === 0}
                          className={`flex flex-col justify-center items-center p-0 w-[30px] h-[30px] bg-[#112F82] rounded-[4px] transition-opacity ${activeProviderPage === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-80'}`}
                        >
                          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[6px] h-[10px]">
                            <path d="M5 1L1 5L5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <button
                          onClick={handleNextProvider}
                          disabled={activeProviderPage === 2}
                          className={`flex flex-col justify-center items-center p-0 w-[30px] h-[30px] bg-[#112F82] rounded-[4px] transition-opacity ${activeProviderPage === 2 ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-80'}`}
                        >
                          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[6px] h-[10px]">
                            <path d="M1 1L5 5L1 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-[16px] w-full relative">
                      <div
                        ref={providersScrollRef}
                        onScroll={handleProviderScroll}
                        className="flex flex-row gap-[8px] lg:gap-[12px] overflow-x-auto w-full [&::-webkit-scrollbar]:hidden snap-x snap-mandatory scroll-smooth pr-[16px] lg:pr-0"
                      >
                        {providerData.map((provider) => (
                          <div key={provider.id} className="flex flex-col justify-center items-center p-[10px_16px] lg:p-[12px_24px] gap-[6px] lg:gap-[8px] w-[116px] lg:w-[152px] h-[76px] lg:h-[100px] bg-[#112F82] lg:bg-[#0C1F56] rounded-[8px] lg:rounded-[12px] shrink-0 snap-start cursor-pointer group">
                            <div className="w-[64px] lg:w-[80px] h-[30px] lg:h-[40px] relative transition-transform duration-300 group-hover:scale-105">
                              <Image unoptimized src={provider.image} alt={provider.name} fill className="object-contain" />
                            </div>
                            <div className="flex flex-row justify-center items-center gap-[6px] w-[90px] lg:w-[110px] h-[16px]">
                              <span className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] text-center text-[#FFC83D]">
                                {provider.gamesCount} Games
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="flex flex-col gap-[12px] w-full">
                  <div className="flex flex-row justify-between items-center w-full h-[23px] lg:h-[29px]">
                    <h3
                      className="font-[family-name:var(--font-jost)] font-extrabold tracking-[0.01em] uppercase text-white"
                      style={{ fontSize: '16px', lineHeight: '23px' }}
                    >
                      {activeCategory}
                    </h3>
                  </div>

                  <div
                    className="grid md:hidden"
                    style={{
                      gridTemplateColumns: 'repeat(3, 119.43px)',
                      gap: '7.86px',
                    }}
                  >
                    {searchResults.map((game) => (
                      <div
                        key={game.id}
                        onClick={() => handleGameClick(game.id)}
                        style={{
                          width: '119.43px',
                          height: '157.14px',
                          borderRadius: '9.42857px',
                          overflow: 'hidden',
                          position: 'relative',
                          background: '#CDCDCD',
                          cursor: 'pointer',
                          flexShrink: 0,
                        }}
                      >
                        <Image unoptimized src={game.image} alt={game.title} fill className="object-cover" />
                      </div>
                    ))}
                  </div>

                  <div className="hidden md:grid lg:hidden gap-[10px] w-full pb-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}>
                    {searchResults.map((game) => (
                      <div key={game.id} onClick={() => handleGameClick(game.id)} className="w-full aspect-[119/157] rounded-[9.6px] overflow-hidden relative bg-[#CDCDCD] group cursor-pointer">
                        <Image unoptimized src={game.image} alt={game.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                      </div>
                    ))}
                  </div>

                  <div className="hidden lg:grid gap-[12px] w-full pb-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
                    {searchResults.map((game) => (
                      <div key={game.id} onClick={() => handleGameClick(game.id)} className="w-full aspect-[152/200] rounded-[12px] overflow-hidden relative bg-[#CDCDCD] group cursor-pointer">
                        <Image unoptimized src={game.image} alt={game.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className="flex lg:hidden flex-col items-start"
                    style={{ gap: '30px', width: '100%' }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', width: '100%' }}>
                      <div style={{ width: '100%' }}>
                        <p style={{
                          fontFamily: "var(--font-manrope), Manrope, sans-serif",
                          fontWeight: 800,
                          fontSize: '16px',
                          lineHeight: '22px',
                          textAlign: 'center',
                          color: '#FFFFFF',
                          width: '100%',
                        }}>
                          No Results for your Search
                        </p>
                      </div>
                      <div style={{ width: '100%' }}>
                        <p style={{
                          fontFamily: "var(--font-manrope), Manrope, sans-serif",
                          fontWeight: 500,
                          fontSize: '16px',
                          lineHeight: '22px',
                          textAlign: 'center',
                          color: '#7795E8',
                          width: '100%',
                        }}>
                          There are no results in this category for your search term, please select a different category or try searching for something else
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:flex flex-col justify-center items-center py-[60px] gap-[16px] w-full mt-[40px]">
                    <h3 className="font-[family-name:var(--font-jost)] font-bold text-[20px] leading-[29px] text-white">
                      No Results for your Search
                    </h3>
                    <p className="font-[family-name:var(--font-manrope)] font-medium text-[14px] leading-[19px] text-center text-[#A5B8EF] max-w-[480px]">
                      There are no results in this category for your search term, please select a different category or try searching for something else
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
