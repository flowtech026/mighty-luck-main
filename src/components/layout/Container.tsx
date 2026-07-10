import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <main className="w-full bg-[#091741] flex justify-center flex-1 overflow-x-hidden">
      <div className="w-full max-w-[1440px] pb-[40px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-6 pt-4 md:pt-6">
        {children}
      </div>
    </main>
  );
}
