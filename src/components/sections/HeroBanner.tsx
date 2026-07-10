import Image from "next/image";

export default function HeroBanner() {
    return (
        <div className="flex flex-col items-start gap-[8px] sm:gap-[20px] w-full">
            <div className="relative w-full h-[170px] sm:h-[260px] md:h-[300px] lg:h-[356px] flex-none overflow-hidden rounded-[10px] md:rounded-[20px]">

            <div className="sm:hidden absolute w-[547.18px] h-[170.03px] left-[calc(50%-547.18px/2+71.59px)] top-[calc(50%-170.03px/2+0.02px)]">
                <Image
                    src="/new-banner.jpg"
                    alt="Hero Banner"
                    fill
                    className="object-cover"
                    sizes="547px"
                    priority
                />
            </div>

            <Image
                src="/new-banner.jpg"
                alt="Hero Banner"
                fill
                className="hidden sm:block object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1136px"
                priority
            />

            <div className="sm:hidden absolute w-[226px] h-[226px] -left-[50px] -top-[38px] z-[1] rounded-full bg-[#03123C] blur-[29.26px]" />
            <div className="hidden sm:block absolute -left-[120px] lg:-left-[161px] -top-[80px] lg:-top-[102px] z-[1] h-[420px] w-[420px] lg:h-[575px] lg:w-[575px] rounded-full bg-[#06102B] blur-[75px]" />

            <div className="sm:hidden absolute w-[62.14px] h-[62.14px] left-[501.42px] top-[130.53px] z-[1] rounded-full bg-[#010A25] blur-[12.04px]" />
            <div className="hidden sm:block absolute right-0 bottom-0 z-[1] h-[80px] w-[80px] lg:h-[129px] lg:w-[129px] rounded-full bg-[#010A25] blur-[25px]" />

            <div className="absolute left-[19.27px] sm:left-[28px] md:left-[40px] top-[calc(50%-112.47px/2+0.74px)] sm:top-[40px] md:top-[60px] lg:top-[101px] z-10 flex flex-col items-start gap-[16px] sm:gap-3 md:gap-[24px] w-[220.13px] sm:w-auto sm:max-w-[60%] lg:max-w-[457px]">

                <div className="flex flex-col items-start gap-[1.93px] sm:gap-[4px] w-full">
                    <h2 className="font-['Jost'] text-[14px] sm:text-[18px] md:text-[22px] lg:text-[28px] font-medium leading-[100%] sm:leading-tight text-white">
                        Get <span className="font-extrabold text-[#FFBF1F]">LUCKY</span> with our exclusive
                    </h2>
                    <h1 className="font-['Jost'] text-[20px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-extrabold leading-[100%] text-white">
                        250% WELCOME BONUS!
                    </h1>
                </div>

                <button className="flex items-center justify-center gap-[8.64px] px-[20.73px] py-[8.64px] w-[95px] h-[34.55px] sm:w-auto sm:h-auto sm:min-h-[36px] lg:h-[40px] sm:px-4 sm:py-0 lg:px-[24px] bg-[#FFBF1F] rounded-[6px] sm:rounded-[8px]">
                    <span className="font-bold text-[12.09px] sm:text-[13px] lg:text-[14px] leading-[17px] sm:leading-tight tracking-[0.02em] text-[#1A1404] whitespace-nowrap" style={{ fontFamily: 'var(--font-manrope)' }}>
                        Join Now
                    </span>
                </button>

            </div>
        </div>

            <div className="flex flex-col items-center w-full h-[6px]">
                <div className="flex flex-row justify-center items-center gap-[8px] h-[6px]">
                    <div style={{ width: '12px', height: '6px', background: '#D2DCF7', borderRadius: '150px' }} />
                    <div style={{ width: '6px', height: '6px', background: '#D2DCF7', borderRadius: '150px' }} />
                    <div style={{ width: '6px', height: '6px', background: '#D2DCF7', borderRadius: '150px' }} />
                </div>
            </div>
        </div>
    );
}
