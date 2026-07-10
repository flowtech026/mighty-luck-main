import { FerrisWheel } from 'lucide-react';

const steps = [
  { src: '/r1.png', alt: 'Step 1' },
  { src: '/r2.png', alt: 'Step 2' },
  { src: '/r3.png', alt: 'Step 3' },
];

export default function Refer4() {
  return (
    <div className="flex flex-col gap-3 sm:gap-8 w-full max-w-[1440px] mx-auto">
      <div className="flex flex-row items-center gap-2 sm:gap-3">
        <div className="flex items-center justify-center w-[18px] h-[18px] sm:w-[30px] sm:h-[30px]">
          <FerrisWheel className="text-[#FFC83D]" size={18} />
        </div>
        <h2 className="font-['Jost'] font-extrabold text-base sm:text-xl leading-[23px] sm:leading-[29px] tracking-[0.01em] text-white uppercase">
          How Referral Program Works
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-3 w-full">
        {steps.map((step) => (
          <div
            key={step.alt}
            className="w-full lg:flex-1 max-w-[424px] rounded-2xl overflow-hidden"
          >
            <img
              src={step.src}
              alt={step.alt}
              className="w-full h-auto object-contain aspect-[374/220] sm:aspect-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
