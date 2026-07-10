
interface GameFrameProps {
  imageSrc?: string;
  className?: string;
}

export default function GameFrame({ 
  imageSrc = '/game-frame.png',
  className = ''
}: GameFrameProps) {
  return (
    <div className={`w-full flex justify-center items-center self-stretch flex-none ${className}`}>
      <div 
        className="w-full max-w-[1136px] aspect-[1136/657] rounded-[16px] bg-cover bg-center bg-no-repeat shadow-2xl relative overflow-hidden"
        style={{ backgroundImage: `url(${imageSrc})` }}
      >
      </div>
    </div>
  );
}
