'use client';

import { ArrowLeft, Search } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export interface Game {
    id: number | string;
    title: string;
    image: string;
}

interface TabHeaderProps {
    title: string;
    count?: string | number;
    games?: Game[];
    onGameClick?: (gameId: string | number) => void;
    searchQuery?: string;
    onSearchChange?: (query: string) => void;
}

export default function TabHeader({
    title,
    count,
    games = [],
    onGameClick,
    searchQuery = '',
    onSearchChange,
}: TabHeaderProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [showBlocked, setShowBlocked] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [localSearch, setLocalSearch] = useState(searchQuery);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleBack = () => {
        router.push('/');
    };

    // Close search modal on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setLocalSearch(val);
        if (onSearchChange) {
            onSearchChange(val);
        }
    };

    // Filter games in active tab JSON data
    const cleanedQuery = (onSearchChange ? searchQuery : localSearch).trim().toLowerCase();
    const filteredGames = games.filter((g) =>
        g.title.toLowerCase().includes(cleanedQuery)
    );

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-3 sm:gap-4 min-h-[40px]">
            {/* Left Side: Back Arrow + Title + Count Badge */}
            <div className="flex items-center gap-[8px] sm:gap-[12px]">
                <button 
                    onClick={handleBack}
                    className="flex items-center justify-center w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] rounded-lg hover:bg-[#112F82] transition-colors text-white shrink-0"
                >
                    <ArrowLeft className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
                </button>
                <h2 className="font-['Jost'] font-extrabold text-[16px] sm:text-[18px] md:text-[20px] leading-none text-white uppercase whitespace-nowrap">
                    {title}
                </h2>
                {count !== undefined && (
                    <span className="flex items-center justify-center px-[8px] py-[2px] min-w-[20px] sm:min-w-[24px] h-[18px] sm:h-[20px] bg-[#FFC83D] rounded-full font-['Manrope'] font-extrabold text-[11px] sm:text-[12px] leading-none text-[#1A1404] whitespace-nowrap">
                        {count}
                    </span>
                )}
            </div>

            {/* Right Side: Show Blocked + Game Search Button */}
            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-[12px] sm:gap-[16px]">
                {/* Show Blocked Toggle */}
                <div className="flex items-center gap-[6px] sm:gap-[8px]">
                    <span className="font-['Manrope'] font-semibold text-[12px] sm:text-[14px] text-white whitespace-nowrap">
                        Show Blocked
                    </span>
                    <button
                        onClick={() => setShowBlocked(!showBlocked)}
                        className={`relative inline-flex items-center p-[2px] h-[20px] sm:h-[22px] w-[36px] sm:w-[40px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out outline-none ${
                            showBlocked ? 'bg-[#FFC83D]' : 'bg-[#112F82]'
                        }`}
                    >
                        <span
                            className={`pointer-events-none inline-block h-[16px] sm:h-[18px] w-[16px] sm:w-[18px] transform rounded-full shadow ring-0 transition duration-200 ease-in-out ${
                                showBlocked ? 'bg-[#1A1404] translate-x-full' : 'bg-white translate-x-0'
                            }`}
                        />
                    </button>
                </div>

                {/* Game Search Button & Modal */}
                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className={`flex flex-row items-center gap-[6px] px-[10px] sm:px-[12px] py-[4px] sm:py-[6px] bg-[#112F82] border ${isSearchOpen ? 'border-[#1463FF]' : 'border-transparent'} hover:border-[#1463FF] rounded-[6px] transition-all text-white font-['Manrope'] font-bold text-[12px] sm:text-[13px] whitespace-nowrap cursor-pointer`}
                    >
                        <Search className="w-3.5 h-3.5 text-white shrink-0" />
                        <span>Search: {cleanedQuery ? cleanedQuery : 'All'}</span>
                    </button>

                    {/* Game Search Modal Popup */}
                    {isSearchOpen && (
                        <div className="absolute right-0 top-full mt-2 w-[240px] sm:w-[260px] bg-[#0C1F56] border border-[#173EAD] rounded-[10px] shadow-2xl p-3 z-50 flex flex-col gap-2.5">
                            {/* Search Input Box */}
                            <div className="relative flex items-center w-full bg-[#081436] rounded-[6px] px-2.5 py-1.5 border border-[#112F82] focus-within:border-[#1463FF]">
                                <Search className="w-4 h-4 text-[#D2DCF7] shrink-0 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Search games..."
                                    value={onSearchChange ? searchQuery : localSearch}
                                    onChange={handleInputChange}
                                    className="w-full bg-transparent text-[13px] text-white placeholder-[#D2DCF7]/50 focus:outline-none font-['Manrope']"
                                    autoFocus
                                />
                            </div>

                            {/* Options List / No Results */}
                            <div className="max-h-[200px] overflow-y-auto flex flex-col gap-1 pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#112F82] [&::-webkit-scrollbar-thumb]:rounded">
                                {cleanedQuery && filteredGames.length > 0 ? (
                                    filteredGames.map((g) => (
                                        <button
                                            key={g.id}
                                            onClick={() => {
                                                if (onGameClick) onGameClick(g.id);
                                                setIsSearchOpen(false);
                                            }}
                                            className="flex items-center gap-2.5 px-2 py-1.5 rounded-[6px] text-[13px] font-['Manrope'] text-[#D2DCF7] hover:bg-[#112F82] hover:text-white transition-colors w-full text-left cursor-pointer group"
                                        >
                                            <div className="relative w-7 h-7 rounded overflow-hidden shrink-0 bg-[#081436]">
                                                <Image src={g.image} alt={g.title} fill className="object-cover" />
                                            </div>
                                            <span className="truncate font-medium">{g.title}</span>
                                        </button>
                                    ))
                                ) : (
                                    <div className="py-6 text-center text-[#D2DCF7]/60 text-[13px] font-['Manrope']">
                                        No results
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
