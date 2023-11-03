import Nudge, {
  NudgeBaseProps,
  Position,
} from "$store/islands/Nudge/Nudge.tsx";
import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import { COLOR_STYLE } from "../../components/ui/Badge.tsx";

export interface Props {
  /**
   * @title Minimum value to enable free delivery
   */
  minimumCartPrice: number;

  bigIcon?: AvailableIcons;

  mainText?: string;

  nudge?: Partial<Omit<NudgeBaseProps, "isFlashOffer">>;
}

function FreeDelivery({
  minimumCartPrice,
  bigIcon,
  mainText = "Frete grátis para compras acima de ",
  nudge,
}: Props) {
  const nudgeProps: NudgeBaseProps = {
    position: nudge?.position || "right-bottom",
    delayToShowInSeconds: nudge?.delayToShowInSeconds || 0,
    badge: {
      text: nudge?.badge?.text || "De olho no frete",
      accentColor: nudge?.badge?.accentColor || "green",
      icon: nudge?.badge?.icon || "Zoom",
    },
    disappearAfterSeconds: nudge?.disappearAfterSeconds,
    persistentNudge: nudge?.persistentNudge,
  };

  return (
    <Nudge
      {...nudgeProps}
    >
      <div className="flex gap-3 items-center">
        <p className="text-base font-medium text-zinc-800 tracking-wider leading-relaxed">
          {mainText}{" "}
          <strong
            className={`font-bold text-${[nudgeProps.badge.accentColor]}-800`}
          >
            {minimumCartPrice.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </strong>
        </p>
        <div
          className={`py-2 px-4 rounded-lg box-border	${
            COLOR_STYLE[nudgeProps.badge.accentColor]
          }`}
        >
          <Icon
            id={bigIcon || "Truck"}
            size={64}
            strokeWidth={2}
          />
        </div>
      </div>
    </Nudge>
  );
}

export default FreeDelivery;
