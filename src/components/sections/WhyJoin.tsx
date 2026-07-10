import Image from 'next/image';

const features = [
    {
        title: "FAST WITHDRAWALS",
        description: "Don't miss a beat! Enjoy fast withdrawals and celebrate your winnings in record time.",
        image: "/w-1.png",
        ellipse9: { right: "-61px", top: "32px" },
        imgStyle: { width: "55%", paddingBottom: "42%", right: "-4px", top: "31px", transform: "rotate(10.6deg)" },
    },
    {
        title: "BIG WINNERS WELCOME",
        description: "Win big on 4000+ casino games, high betting limits & the best sports action.",
        image: "/demo.png",
        ellipse9: { right: "-66px", top: "20px" },
        imgStyle: { width: "65%", paddingBottom: "55%", right: "-4px", top: "3px", transform: "rotate(12deg)" },
    },
    {
        title: "WEEKLY 10% CASHBACK",
        description: "Get 10% cashback from Samba Slots every Monday. No wagering. No worries.",
        image: "/w-3.png",
        ellipse9: { right: "-65px", top: "27px" },
        imgStyle: { width: "60%", paddingBottom: "44%", right: "0px", top: "41px", transform: "rotate(-1.3deg)" },
    },
];

export default function WhyJoin() {
    return (
        <section className="flex flex-col items-start gap-5 md:gap-[28px] w-full">
            <div className="flex items-center h-[30px] gap-[12px]">
                <Image src="/100.svg" alt="Why Join" width={30} height={30} className="w-[30px] h-[30px] shrink-0 object-contain" />
                <span className="font-['Jost'] text-[16px] md:text-[18px] lg:text-[20px] font-extrabold leading-[100%] tracking-[0.01em] text-white uppercase whitespace-nowrap">
                    WHY JOIN MIGHTY LUCK?
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-[12px] w-full">
                {features.map((item, index) => (
                    <div
                        key={index}
                        className="relative h-[180px] sm:h-[200px] lg:h-[220px] w-full overflow-hidden rounded-[12px]"
                    >
                        <div className="absolute inset-0 flex flex-col items-start justify-center gap-[12px] lg:gap-[16px] rounded-[16px] bg-[#0C1F56] p-[20px] lg:p-[24px] isolation-isolate overflow-hidden">

                            <div
                                className="pointer-events-none absolute rounded-full bg-[#1463FF]"
                                style={{ width: "160px", height: "160px", left: "-85px", top: "-80px", filter: "blur(50px)", zIndex: 0 }}
                            />

                            <h3
                                className="relative w-[55%] font-['Jost'] text-[18px] lg:text-[24px] font-extrabold leading-[1.1] tracking-[0.01em] text-white uppercase"
                                style={{ zIndex: 1 }}
                            >
                                {item.title}
                            </h3>

                            <p
                                className="relative w-[55%] font-['Manrope'] text-[12px] lg:text-[14px] font-medium leading-[140%] tracking-[0.02em] text-[#E8EDFB]"
                                style={{ zIndex: 2 }}
                            >
                                {item.description}
                            </p>

                            <div
                                className="pointer-events-none absolute rounded-full bg-[#1463FF]"
                                style={{
                                    width: "200px", height: "200px",
                                    right: item.ellipse9.right, top: item.ellipse9.top,
                                    filter: "blur(50px)", zIndex: 3
                                }}
                            />

                            <div
                                className="pointer-events-none absolute"
                                style={{ ...item.imgStyle, zIndex: 10 }}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 640px) 55vw, (max-width: 1024px) 40vw, 200px"
                                />
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
