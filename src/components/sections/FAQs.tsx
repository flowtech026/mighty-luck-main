"use client";

import { Minus, Plus, Trophy } from 'lucide-react';
import { useState } from 'react';

const faqData = [
  {
    question: 'How do I invite a friend?',
    answer:
      'In order to participate in the Refer A Friend campaign, as a referrer you need to have an active account at Wild and have at least $50 (or currency equivalent) deposited. Multiple deposits can be summed up in order to meet the minimum deposit requirement.',
  },
  {
    question: 'How do I invite a friend?',
    answer:
      'In order to participate in the Refer A Friend campaign, as a referrer you need to have an active account at Wild and have at least $50 (or currency equivalent) deposited. Multiple deposits can be summed up in order to meet the minimum deposit requirement.',
  },
  {
    question: 'How do I invite a friend?',
    answer:
      'In order to participate in the Refer A Friend campaign, as a referrer you need to have an active account at Wild and have at least $50 (or currency equivalent) deposited. Multiple deposits can be summed up in order to meet the minimum deposit requirement.',
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-4 sm:gap-5 w-full max-w-[1440px] mx-auto">
      <div className="flex flex-row items-center gap-2 sm:gap-3">
        <div className="flex items-center justify-center w-[18px] h-[18px] sm:w-[30px] sm:h-[30px]">
          <Trophy className="text-[#FFC83D]" size={18} />
        </div>
        <h2 className="font-['Jost'] font-extrabold text-base sm:text-xl leading-[23px] sm:leading-[29px] tracking-[0.01em] text-white">
          FAQs
        </h2>
      </div>

      <div className="flex flex-col gap-4 w-full">
        {faqData.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`flex flex-col justify-center items-start p-6 sm:p-8 lg:px-10 w-full bg-[#0C1F56] rounded-lg cursor-pointer transition-all duration-300 ${isOpen ? 'gap-4' : 'gap-0'}`}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <div className="flex flex-row justify-between items-center w-full gap-4">
                <p className="font-['Jost'] font-extrabold text-lg sm:text-xl leading-[26px] sm:leading-[29px] tracking-[0.01em] text-white flex-1 min-w-0">
                  {faq.question}
                </p>
                <div className="flex items-center justify-center w-5 h-5 text-white shrink-0">
                  {isOpen ? (
                    <Minus size={20} strokeWidth={2.5} />
                  ) : (
                    <Plus size={20} strokeWidth={2.5} />
                  )}
                </div>
              </div>

              {isOpen && (
                <p className="font-['Manrope'] font-medium text-sm sm:text-base leading-[160%] text-[#A5B8EF] w-full">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
