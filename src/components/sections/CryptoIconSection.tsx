import React from 'react';
import Image from 'next/image';

const icons = ['c1.svg', 'c2.svg', 'c3.svg', 'c4.svg', 'c5.svg', 'c6.svg', 'c7.svg', 'c8.svg', 'c9.svg', 'c10.svg', 'c11.svg'];

export default function CryptoIconSection() {
    return (
        <section className="relative w-full md:w-full h-[100px] border-b border-[#112F82] px-[20px] md:px-[40px] flex flex-row items-center justify-center overflow-hidden isolate box-border">
            <div
                className="absolute w-[390px] h-[390px] bg-[#1463FF] pointer-events-none rounded-full"
                style={{
                    left: 'calc(50% - 195px)',
                    top: '77px',
                    filter: 'blur(50px)',
                    zIndex: 0
                }}
            />
            <div className="flex flex-row flex-wrap items-center justify-center content-center gap-x-[31px] gap-y-[16px] md:gap-[28px] w-[334px] md:w-auto h-[53.61px] md:h-auto mx-auto relative z-[1]">
                {icons.map((icon, i) => (
                    <div key={i} className="flex items-center justify-center transition-opacity cursor-pointer flex-none">
                        <Image src={`/${icon}`} alt={`Crypto ${i + 1}`} width={19} height={19} className="w-auto h-[18px] md:h-[19px] shrink-0 object-contain" />
                    </div>
                ))}
            </div>
        </section>
    );
}


