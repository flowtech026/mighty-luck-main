
const stats = [
  { value: '$2.5 K', label: 'Claim By the Most Active Referrer' },
  { value: '500+', label: 'Players are already earning with us' },
  { value: '19,000', label: 'Free Spins received by friends' },
];

export default function Refer2() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-[1440px] mx-auto">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col justify-center items-center p-6 gap-2 w-full min-h-[120px] sm:min-h-[136px] bg-[#0C1F56] rounded-2xl"
        >
          <div className="font-['Jost'] font-extrabold text-[32px] sm:text-[40px] leading-tight text-center tracking-[0.01em] text-white">
            {stat.value}
          </div>
          <div className="font-['Manrope'] font-semibold text-sm sm:text-base leading-[140%] text-center tracking-[0.02em] text-[#A5B8EF]">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
