import React from "react";

export function RenderBonusIcon({ type, className, color = 'bg-[#A5B8EF]' }: { type: string; className?: string; color?: string }) {
  let maskUrl = '';
  if (type === 'gift') maskUrl = "url('/gift.svg')";
  if (type === 'badge') maskUrl = "url('/star.svg')";
  if (type === 'coins') maskUrl = "url('/bonus.svg')";
  if (type === 'ban') maskUrl = "url('/close.svg')";

  if (!maskUrl) return null;

  return (
    <div
      className={`${color} ${className || ''}`}
      style={{
        maskImage: maskUrl,
        WebkitMaskImage: maskUrl,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  );
}

export function FiatIcons({ className, isSelected }: { className?: string; isSelected?: boolean }) {
  const colorClass = isSelected ? 'bg-[#FFC83D]' : 'bg-[#A5B8EF]';
  const maskUrl = "url('/visa.svg')";
  return (
    <div
      className={`${colorClass} ${className || ''} shrink-0 transition-colors`}
      style={{
        width: '42px',
        height: '20px',
        maskImage: maskUrl,
        WebkitMaskImage: maskUrl,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  );
}

export function CrownLightningIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 33 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M31.5969 7.13433L23.0786 10.6306C22.8177 10.7385 22.5202 10.6359 22.3766 10.3912L16.6743 0.281229C16.4525 -0.100229 15.8992 -0.0923369 15.6904 0.297014L9.71147 10.4175C9.57315 10.6753 9.25998 10.7858 8.99118 10.6701L0.788717 7.13433C0.345058 6.94228 -0.116868 7.36583 0.0266686 7.82885L4.87559 23.395C4.94866 23.6318 5.16789 23.7949 5.41581 23.7949L26.1738 23.8001C26.4113 23.8001 26.6227 23.6502 26.7062 23.4266L32.3433 7.85778C32.5103 7.39214 32.0536 6.94755 32.0995 7.13433H31.5969ZM19.6546 14.6819L15.5991 21.9165C15.5417 22.0191 15.3903 21.9796 15.3851 21.8639L15.2207 17.4837H13.8036V17.4679C13.767 17.4732 13.7305 17.4837 13.6913 17.4837H10.7502C10.664 17.4837 10.6092 17.389 10.6484 17.3127L15.0197 9.14948C15.1737 8.88114 15.4555 8.71804 15.7609 8.71804H18.7021C18.7882 8.71804 18.843 8.81275 18.8039 8.88904L15.7922 14.5109H19.5529C19.6416 14.5109 19.6964 14.6057 19.652 14.6846L19.6546 14.6819Z"
        fill="currentColor"
      />
    </svg>
  );
}
