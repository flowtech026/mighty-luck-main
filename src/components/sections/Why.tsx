import Image from 'next/image';

const features = [
    {
        image: "/j-1.svg",
        alt: "Fast Withdrawals",
    },
    {
        image: "/j-2.svg",
        alt: "Big Winners Welcome",
    },
    {
        image: "/j-3.svg",
        alt: "Weekly 10% Cashback",
    },
];

export default function Why() {
    return (
        <section className="flex flex-col items-start gap-5 md:gap-[28px] w-full">
            <div className="flex flex-row justify-between items-center w-full h-[23px] md:h-[30px]">
                <div className="flex flex-row items-center gap-[7.2px] md:gap-[12px] h-[23px] md:h-[30px]">
                    <div className="flex items-center justify-center w-[18px] h-[18px] md:w-[30px] md:h-[30px] shrink-0">
                        <Image src="/100.svg" alt="Why Join" width={30} height={30} className="w-full h-full object-contain" />
                    </div>
                    <h2 className="font-['Jost'] text-[16px] md:text-[20px] font-extrabold leading-[23px] md:leading-[30px] tracking-[0.01em] text-white uppercase whitespace-nowrap">
                        WHY JOIN MIGHTY LUCK?
                    </h2>
                </div>

                <div className="hidden md:flex flex-row items-center gap-[12px]">
                    <button className="flex flex-col justify-center items-center w-[30px] h-[30px] bg-[#112F82] opacity-40 rounded-[4px] rotate-180 hover:opacity-100 transition-opacity">
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 9L5 5L1 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button className="flex flex-col justify-center items-center w-[30px] h-[30px] bg-[#112F82] rounded-[4px] hover:bg-[#1A3FA6] transition-colors">
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 9L5 5L1 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="flex flex-row md:grid md:grid-cols-3 gap-[8.63px] md:gap-[12px] w-full overflow-x-auto md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory pb-4 md:pb-0">
                {features.map((item, index) => (
                    <div
                        key={index}
                        className={`relative shrink-0 snap-start overflow-hidden group ${index === 0
                                ? 'w-[279px] h-[158px] rounded-[10px] md:w-full md:h-auto md:aspect-[370/220] md:rounded-[16px]'
                                : index === 1
                                    ? 'w-[266.19px] h-[158.27px] rounded-[10px] md:w-full md:h-auto md:aspect-[370/220] md:rounded-[16px]'
                                    : 'w-[266.19px] h-[158.27px] rounded-[11.51px] md:w-full md:h-auto md:aspect-[370/220] md:rounded-[16px]'
                            }`}
                    >
                        <Image
                            src={item.image}
                            alt={item.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
