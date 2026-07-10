"use client";

export default function SidebarReferSection() {
    return (
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-[8px] flex-none">

            <div className="col-span-1 rounded-[10px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity sm:flex">
                <img
                    src="/raf.svg"
                    alt="Refer a Friend"
                    className="w-full h-auto sm:h-full sm:object-cover block"
                />
            </div>

            <div className="col-span-1 rounded-[10px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity sm:flex">
                <img
                    src="/vt.svg"
                    alt="VIP Transfer"
                    className="w-full h-auto sm:h-full sm:object-cover block"
                />
            </div>

            <div className="col-span-2 rounded-[10px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity sm:flex">
                <img
                    src="/wr.svg"
                    alt="Winter Rush"
                    className="w-full h-auto sm:h-full sm:object-cover block"
                />
            </div>

        </div>
    );
}
