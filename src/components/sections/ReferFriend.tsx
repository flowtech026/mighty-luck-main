import FAQs from './FAQs';
import Refer1 from './Refer1';
import Refer2 from './Refer2';
import Refer3 from './Refer3';
import Refer4 from './Refer4';

export default function ReferFriend() {
  return (
    <div className="flex flex-col gap-[30px] md:gap-[32px] w-full max-w-[1440px] mx-auto items-stretch md:items-center pb-0 md:pb-[60px]">
      <Refer1 />
      <div className="hidden md:block w-full">
        <Refer2 />
      </div>
      <Refer3 />
      <Refer4 />
      <FAQs />
    </div>
  );
}
