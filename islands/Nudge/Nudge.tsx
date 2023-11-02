import { useEffect, useState,  } from "preact/hooks";
import type { ComponentChildren } from "preact";

import Badge from "$store/components/Badge.tsx";
import { AvailableIcons } from "$store/components/ui/Icon.tsx";

export type Position = 'left-top' | 'left-center' | 'left-bottom' | 'bottom-center' | 'right-top' | 'right-center' | 'right-bottom' | 'top-center';

export interface Props {
  children: ComponentChildren;
  delayToShowInSeconds: number;
  accentColor?: 'emerald' | 'amber';
  position: Position;
  badgeText: string;
  badgeIcon?: AvailableIcons;
}

function Nudge({ children, delayToShowInSeconds, accentColor = 'emerald', position, badgeText, badgeIcon }: Props){
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowing(true);
    }, delayToShowInSeconds * 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

   return (
    <>
      {isShowing && (
        <div className={`flex flex-col items-start justify-start gap-3.5 p-4 shadow-2xl bg-white fixed z-50 rounded-lg max-w-[354px] ${position === 'right-top' && 'right-4 top-4'} ${position === 'right-center' && 'top-1/2 right-4 transform -translate-y-1/2'} ${position === 'right-bottom' && 'right-4 bottom-4'} ${position === 'bottom-center' && 'bottom-4 left-1/2 transform -translate-x-1/2'} ${position === 'left-top' && 'left-4 top-4'} ${position === 'left-center' && 'top-1/2 left-4 transform -translate-y-1/2'} ${position === 'left-bottom' && 'left-4 bottom-4'} ${position === 'top-center' && 'top-4 left-1/2 transform -translate-x-1/2'}`}>
          <Badge accentColor={accentColor} text={badgeText} icon={badgeIcon} />
          {children}
        </div>
      )}
    </>
  );
}

export default Nudge
