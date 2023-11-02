import Nudge, { Position } from "$store/islands/Nudge/Nudge.tsx"
import { AvailableIcons } from "$store/components/ui/Icon.tsx"

export interface Props {
  /**
   * @title Stock amount
   */
  stock: number;

  /**
   * @title Max items for low stock warning
   */
  maxQuantityToShow: number;

  /**
   * @title Seconds for displaying nudge
   */
  delayToShowInSeconds: number;

  /**
   * @title Nudge position
   */
  position: Position;

  /** 
   * @title Badge title
   */
  badgeText: string;

  /**
   * @title Badge color
   */
  accentColor: 'emerald' | 'amber';

  /** 
   * @title Badge icon
   */
  badgeIcon?: AvailableIcons;
}

function LowStock({
  accentColor,
  badgeText,
  delayToShowInSeconds,
  maxQuantityToShow,
  position,
  stock,
  badgeIcon,
  ...props
}: Props){

  if (stock > maxQuantityToShow) return null

  return (
    <Nudge {...props} accentColor={accentColor} position={position} badgeText={badgeText} badgeIcon={badgeIcon} delayToShowInSeconds={delayToShowInSeconds}>
      <p className="text-base font-medium text-zinc-800 tracking-wider leading-relaxed">
        <strong className="font-bold">Se apresse!</strong> Apenas <strong className="text-orange-500 font-bold">{stock}</strong> disponíveis!
      </p>
    </Nudge>
  );
}

export default LowStock
