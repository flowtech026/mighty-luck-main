import React, { useState } from "react";

export default function TransactionsTab() {
  const [transactionFilter, setTransactionFilter] = useState<"all" | "deposit" | "withdraw" | "bonus">("all");

  const transactionList = [
    {
      id: 1,
      type: "deposit",
      title: "Deposit",
      subtitle: "Bitcoin — Today, 14:32",
      amount: "+$100.00",
      amountColor: "#00E806",
      status: "Confirming",
      statusColor: "#FFBF1F",
      statusBg: "#3E2A09",
      icon: "/d-bit-blue.svg",
    },
    {
      id: 2,
      type: "withdraw",
      title: "Wirhdrawal",
      subtitle: "Bitcoin — Today, 10:12",
      amount: "-$250.00",
      amountColor: "#FFFFFF",
      status: "Pending review",
      statusColor: "#FFBF1F",
      statusBg: "#3E2A09",
      icon: "/d-bit-blue.svg",
    },
    {
      id: 3,
      type: "deposit",
      title: "Deposit",
      subtitle: "Bitcoin — Yesterday, 19:44",
      amount: "+$100.00",
      amountColor: "#00E806",
      status: "Completed",
      statusColor: "#00E806",
      statusBg: "#073208",
      icon: "/doller.svg",
    },
    {
      id: 4,
      type: "bonus",
      title: "Bonus",
      subtitle: "RELOAD150 — Yesterday, 19:45",
      amount: "+$75.00",
      amountColor: "#00E806",
      status: "Active",
      statusColor: "#FFFFFF",
      statusBg: "#1463FF",
      icon: "/gift-blue.svg",
    },
    {
      id: 5,
      type: "withdraw",
      title: "Wirhdrawal",
      subtitle: "Bank Transfer — May 12, 09:18",
      amount: "-$500.00",
      amountColor: "#FFFFFF",
      status: "Completed",
      statusColor: "#00E806",
      statusBg: "#073208",
      icon: "/bank.svg",
    },
    {
      id: 6,
      type: "deposit",
      title: "Deposit",
      subtitle: "Bitcoin — Yesterday, 19:44",
      amount: "+$100.00",
      amountColor: "#00E806",
      status: "Completed",
      statusColor: "#00E806",
      statusBg: "#073208",
      icon: "/doller.svg",
    },
  ];

  const filteredTransactions = transactionList.filter((tx) => {
    if (transactionFilter === "all") return true;
    return tx.type === transactionFilter;
  });

  return (
    <div className="flex flex-col items-center p-[20px_16px] gap-[16px] w-full bg-[#0C1F56] rounded-[16px] z-20 relative h-[514px] sm:h-[514px] max-[639px]:flex-1 max-[639px]:overflow-y-auto max-[639px]:min-h-0 overflow-hidden shrink-0">
      {/* Title and subtitle */}
      <div className="flex flex-col items-start gap-[4px] w-full sm:w-[428px] shrink-0">
        <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
          Transactions
        </span>
        <span className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#A5B8EF]">
          Recent wallet activity
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-row items-center gap-[8px] w-full sm:w-[428px] h-[30px] shrink-0">
        {[
          { id: "all", label: "All" },
          { id: "deposit", label: "Deposit" },
          { id: "withdraw", label: "Withdraw" },
          { id: "bonus", label: "Bonus" },
        ].map((filter) => {
          const isActive = transactionFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => setTransactionFilter(filter.id as any)}
              className={`flex flex-row justify-center items-center px-[16px] py-[10px] flex-1 h-[30px] rounded-[6px] transition-colors ${
                isActive
                  ? "bg-[#1463FF] text-white font-bold"
                  : "bg-[#112F82] text-[#A5B8EF] font-semibold hover:bg-[#1A3FA6]"
              }`}
            >
              <span className="font-[family-name:var(--font-manrope)] text-[12px] leading-[16px] tracking-[0.02em]">
                {filter.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Transaction list */}
      <div className="flex flex-col gap-[8px] w-full sm:w-[428px] h-[373px] overflow-y-auto pr-[4px] transaction-list-scrollbar">
        {filteredTransactions.map((tx) => (
          <div
            key={tx.id}
            className="flex flex-row justify-between items-center p-[10px_16px_10px_10px] gap-[12px] w-full h-[62px] bg-[#112F82] rounded-[8px] shrink-0"
          >
            <div className="flex flex-row items-center gap-[12px] flex-grow">
              {/* Icon Box */}
              <div className="flex flex-col items-center justify-center w-[40px] h-[40px] bg-[#0C1F56] rounded-[8px] shrink-0">
                <img src={tx.icon} alt={tx.title} className="w-[16px] h-[16px]" />
              </div>
              {/* Text Details */}
              <div className="flex flex-col justify-center items-start gap-[4px] flex-grow">
                <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                  {tx.title}
                </span>
                <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#BBCAF3]">
                  {tx.subtitle}
                </span>
              </div>
            </div>

            {/* Amount & Status Badge */}
            <div className="flex flex-col items-end gap-[4px] shrink-0">
              <span
                className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] text-right tracking-[0.02em]"
                style={{ color: tx.amountColor }}
              >
                {tx.amount}
              </span>
              <div
                className="flex flex-row justify-center items-center px-[8px] py-[4px] rounded-[6px] h-[22px] shrink-0"
                style={{ backgroundColor: tx.statusBg }}
              >
                <span
                  className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em]"
                  style={{ color: tx.statusColor }}
                >
                  {tx.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
