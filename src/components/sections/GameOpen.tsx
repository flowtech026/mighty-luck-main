'use client';

import GameFrame from './GameFrame';
import NinjaSlot from './NinjaSlot';

interface GameOpenProps {
  gameId?: string;
}

export default function GameOpen({ gameId }: GameOpenProps) {
  return (
    <div className="w-full max-w-[1136px] mx-auto px-4 sm:px-6 lg:px-0 flex flex-col gap-4">
      <GameFrame imageSrc="/game-frame.png" />
      <NinjaSlot />
    </div>
  );
}
