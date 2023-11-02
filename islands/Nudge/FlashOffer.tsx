import { useEffect, useState } from "preact/hooks";
import Nudge, { Position } from "./Nudge.tsx";

export interface Props {
  delayToShowInSeconds: number;

  /**
   * @title Expires at date
   * @format datetime
   */
  expiresAt: string;

  position?: Position;
  accentColor?: 'emerald' | 'amber';
  badgeText: string;
}

type CountdownProps = {
  time: number;
}

function Countdown({ time }: CountdownProps) {
  return (
    <span className="bg-black text-white text-base tracking-wider font-medium h-8 w-9 px-2 py-1 rounded shadow-md flex items-center justify-center">{String(time).padStart(2, '0')}</span>
  )
}

function FlashOffer({
  delayToShowInSeconds = 0,
  badgeText = 'Oferta Relâmpago',
  accentColor = 'amber',
  expiresAt,
  position = 'right-bottom'
}: Props){
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  function calculateTimeLeft() {
    const difference = expiresAt ? new Date(expiresAt).getTime() - new Date().getTime() : 0;

    if (difference <= 0) {
      return {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
      };
    }
    const days = String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0');
    const hours = String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const minutes = String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((difference / 1000) % 60)).padStart(2, '0');

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  useEffect(() => {
    const {days, hours, minutes, seconds} = timeLeft;

    const hasDay = Number(days) > 0;

    document.title = hasDay ? `${days}:${hours}:${minutes}:${seconds}` : `${hours}:${minutes}:${seconds}`;
  }, [timeLeft]);

  return (
    <Nudge delayToShowInSeconds={delayToShowInSeconds} accentColor={accentColor} position={position} badgeText={badgeText} >

      <div className="flex items-center justify-center gap-1 w-full">
        {Number(timeLeft.days) > 0 && (
          <div className="flex flex-col items-center justify-center gap-0.5">
            <span className="text-xs">D</span>
            <Countdown time={Number(timeLeft.days)}/>
          </div>
        )}

          <div className="flex flex-col items-center justify-center gap-0.5">
            <span className="text-xs">H</span>
            <Countdown time={Number(timeLeft.hours)}/>
          </div>

        <div className="flex flex-col items-center justify-center gap-0.5">
          <span className="text-xs">Min.</span>
          <Countdown time={Number(timeLeft.minutes)}/>
        </div>
        <div className="flex flex-col items-center justify-center gap-0.5">
          <span className="text-xs">Seg.</span>
          <Countdown time={Number(timeLeft.seconds)}/>
        </div>
      </div>

    </Nudge>
  );
}
export default FlashOffer
