import Nudge, { NudgeBaseProps } from "$store/islands/Nudge/Nudge.tsx";
import { AvailableIcons } from "$store/components/ui/Icon.tsx";

export interface Props {
  /**
   * @title Stock amount
   */
  stock: number;

  /**
   * @title Max items for low stock warning
   */
  maxQuantityToShow: number;

  nudge?: Partial<Omit<NudgeBaseProps, "isFlashOffer">>;
}

function LowStock({
  maxQuantityToShow = 100,
  stock = 100,
  nudge,
}: Props) {
  if (stock > maxQuantityToShow) return null;

  const nudgeProps: NudgeBaseProps = {
    position: nudge?.position || "bottom-center",
    delayToShowInSeconds: nudge?.delayToShowInSeconds || 0,
    badge: {
      text: nudge?.badge?.text || "ÚLTIMAS UNIDADES",
      accentColor: nudge?.badge?.accentColor || "amber",
      icon: nudge?.badge?.icon,
    },
    disappearAfterSeconds: nudge?.disappearAfterSeconds,
    persistentNudge: nudge?.persistentNudge,
  };

  return (
    <Nudge {...nudgeProps}>
      <p className="text-base font-medium text-zinc-800 tracking-wider leading-relaxed">
        <strong className="font-bold">Se apresse!</strong> Apenas{" "}
        <strong className="text-orange-500 font-bold">{stock}</strong>{" "}
        disponíveis!
      </p>
    </Nudge>
  );
}

export default LowStock;
