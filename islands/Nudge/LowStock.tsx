import Nudge, { NudgeBaseProps } from "$store/islands/Nudge/Nudge.tsx";
import { AvailableIcons } from "$store/components/ui/Icon.tsx";
import NudgeImage from "./NudgeImage.tsx";

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
   * @title Product image URL
   */
  imageURL?: string;

  nudge?: Partial<Omit<NudgeBaseProps, "isFlashOffer">>;
}

function LowStock({
  maxQuantityToShow = 100,
  stock = 100,
  imageURL,
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
      <div className="flex gap-3 items-center">
        <p className="text-base font-medium text-zinc-800 tracking-wider leading-relaxed">
          <strong className="font-bold">Se apresse!</strong> Apenas{" "}
          <strong
            className={`text-${[nudgeProps.badge.accentColor]}-800 font-bold`}
          >
            {stock}
          </strong>{" "}
          {stock > 1 ? "unidades disponíveis!" : "unidade disponível!"}
        </p>

        {imageURL && <NudgeImage imageURL={imageURL} />}
      </div>
    </Nudge>
  );
}

export default LowStock;
