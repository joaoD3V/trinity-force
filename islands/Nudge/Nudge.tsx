import { useEffect, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";

import Badge, { BadgeProps } from "$store/components/ui/Badge.tsx";

export type Position =
  'bottom-center'
  | 'left-bottom'
  | 'left-center'
  | 'left-top'
  | 'right-bottom'
  | 'right-center'
  | 'right-top'
  | 'top-center';

export interface NudgeBaseProps {
  delayToShowInSeconds: number;
  position: Position;
  badge: BadgeProps;
}

export interface NudgeProps extends NudgeBaseProps {
  children: ComponentChildren;
}

const POSITION_STYLE = {
  'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  'left-bottom': 'left-4 bottom-4',
  'left-center': 'top-1/2 left-4 transform -translate-y-1/2',
  'left-top': 'left-4 top-4',
  'right-bottom': 'right-4 bottom-4',
  'right-center': 'top-1/2 right-4 transform -translate-y-1/2',
  'right-top': 'right-4 top-4',
  'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
};

function Nudge({
  children,
  delayToShowInSeconds = 0,
  position = 'left-bottom',
  badge
}: NudgeProps) {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowing(true);
    }, delayToShowInSeconds * 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, []);

  if (!isShowing) return null;

   return (
    <div
      className={
        `flex flex-col content-center justify-start gap-3.5 p-4 shadow-2xl bg-white fixed z-50 rounded-lg max-w-[354px] ${POSITION_STYLE[position]}`
      }
    >
      <Badge {...badge} />
      {children}
    </div>
  );
}

export default Nudge
