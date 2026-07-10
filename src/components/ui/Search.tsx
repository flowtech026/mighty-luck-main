import { Search as SearchIcon } from 'lucide-react';
import React from 'react';

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Search({ className = '', ...props }: SearchProps) {
  const handleClick = () => {
    window.dispatchEvent(new Event('openSearchModal'));
  };

  // If width is not specified in className, use default responsive width
  const widthClass = className.includes('w-') ? '' : 'w-[240px] md:w-[280px] lg:w-[200px] xl:w-[280px]';

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-[10px] h-[40px] px-[20px] py-[10px] rounded-[8px] bg-[#112F82] cursor-pointer ${widthClass} ${className}`}
    >
      <SearchIcon size={18} className="text-[#FFFFFF] shrink-0" />
      <input
        type="text"
        placeholder="What are you looking for?"
        className="bg-transparent border-none outline-none text-[#BBCAF3] placeholder:text-[#BBCAF3] w-full text-[14px] font-manrope font-semibold leading-[19px] min-w-0 cursor-pointer"
        readOnly
        {...props}
      />
    </div>
  );
}
