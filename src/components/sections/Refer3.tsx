import React from 'react';

type BenefitItem = {
  iconPath: string;
  title: string;
  description: string;
};

const youGetItems: BenefitItem[] = [
  {
    iconPath: '/rc1.svg',
    title: 'Lifetime earnings from each deposit',
    description: 'You get a percentage of every deposit your friends complete.',
  },
  {
    iconPath: '/rc12.svg',
    title: 'Instant crediting',
    description: "Your income is credited a few minutes after your friend's deposit is completed.",
  },
  {
    iconPath: '/rc13.svg',
    title: 'No limits for earnings',
    description: "Your earnings are not capped. Sky (and your friend's wallet) is the limit!",
  },
];

const friendGetsItems: BenefitItem[] = [
  {
    iconPath: '/rc1.svg',
    title: 'Lifetime earnings from each deposit',
    description: 'You get a percentage of every deposit your friends complete.',
  },
  {
    iconPath: '/rc12.svg',
    title: 'Instant crediting',
    description: "Your income is credited a few minutes after your friend's deposit is completed.",
  },
  {
    iconPath: '/rc13.svg',
    title: 'No limits for earnings',
    description: "Your earnings are not capped. Sky (and your friend's wallet) is the limit!",
  },
];

function BenefitCard({
  title,
  items,
  glowColor,
}: {
  title: string;
  items: BenefitItem[];
  glowColor: '#57FF3D' | '#1463FF';
}) {
  return (
    <div className="flex flex-col items-start p-6 sm:p-8 lg:p-[32px_40px] gap-6 w-full lg:flex-1 bg-[#0C1F56] rounded-2xl relative overflow-hidden isolate">
      <div
        className="absolute w-[182px] h-[182px] -left-[91px] -top-[91px] blur-[60px] z-0 rounded-full pointer-events-none"
        style={{ backgroundColor: glowColor }}
      />
      <h3 className="w-full font-['Jost'] font-extrabold text-xl leading-[29px] tracking-[0.01em] text-white z-10">
        {title}
      </h3>
      <div className="flex flex-col gap-5 w-full z-10">
        {items.map((item) => (
          <div key={item.title} className="flex flex-row items-start gap-4 w-full">
            <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
              <div
                className="w-5 h-5 shrink-0"
                style={{
                  backgroundColor: glowColor,
                  maskImage: `url('${item.iconPath}')`,
                  WebkitMaskImage: `url('${item.iconPath}')`,
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                }}
              />
            </div>
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <p className="font-['Manrope'] font-bold text-base leading-[22px] tracking-[0.01em] text-white">
                {item.title}
              </p>
              <p className="font-['Manrope'] font-medium text-base leading-[160%] text-[#A5B8EF]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Refer3() {
  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-3 w-full max-w-[1440px] mx-auto">
      <BenefitCard title="WHAT YOU GET" items={youGetItems} glowColor="#57FF3D" />
      <BenefitCard title="WHAT YOUR FRIEND GETS" items={friendGetsItems} glowColor="#1463FF" />
    </div>
  );
}
