import Image from "next/image";
import './hero1.css';

const cryptoIcons = [
  "d1.svg", "d2.svg", "d3.svg", "d4.svg", "d5.svg",
  "d6.svg", "d7.svg", "d8.svg", "d9.svg", "d10.svg", "d11.svg"
];

export default function HeroSection1() {
  return (
    <div className="hero-section-1 relative flex flex-col sm:flex-row justify-between items-center w-full p-[20px] sm:px-6 md:px-[40px] md:py-0 h-[165px] sm:h-auto md:h-[100px] bg-[#0C1F56] rounded-[10px] sm:rounded-[16px] shrink-0 overflow-hidden gap-[20px] sm:gap-3">

      <div className="absolute left-1/2 top-[95px] sm:top-[60px] z-0 h-[416px] w-[416px] sm:h-[534px] sm:w-[534px] -translate-x-1/2 rounded-full bg-[#1463FF] blur-[38.95px] sm:blur-[100px]" />

      <div className="relative z-10 flex items-center justify-center w-full sm:w-auto">
        <h3
          className="text-[#FFFFFF] font-extrabold text-[18px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[100%] sm:leading-[1] text-center whitespace-nowrap m-0 p-0 w-[237px] h-[26px] sm:w-auto sm:h-auto"
          style={{ fontFamily: 'var(--font-jost)' }}
        >
          Want to play? Deposit Now
        </h3>
      </div>

      <div className="crypto-icons-row relative z-10 flex items-center justify-between sm:justify-center flex-wrap content-start gap-x-[12px] gap-y-[20px] sm:gap-4 md:gap-[20px] lg:gap-[28px] w-[334px] h-[19.05px] sm:w-auto sm:h-auto sm:max-w-full m-0 p-0">
        {cryptoIcons.map((icon, i) => (
          <Image key={i} src={`/${icon}`} alt={`Crypto ${i+1}`} width={19} height={19} className="w-auto h-[16px] md:h-[19px] shrink-0 object-contain" />
        ))}
      </div>

      <button className="deposit-now-btn relative z-10 flex justify-center items-center px-[30px] py-[10px] sm:px-4 md:px-[24px] gap-[10px] w-[148px] sm:w-[136px] h-[40px] bg-[#FFC83D] rounded-[8px] shrink-0">
        <span
          className="font-bold text-[14px] leading-[19px] tracking-[0.02em] text-[#1A1404] whitespace-nowrap"
          style={{ fontFamily: 'var(--font-manrope)' }}
        >
          Deposit Now
        </span>
      </button>

    </div>
  );
}
