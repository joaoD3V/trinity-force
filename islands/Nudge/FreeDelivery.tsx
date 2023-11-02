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

  nudge?: Partial<NudgeBaseProps>;
}

function FreeDelivery({
  minimumCartPrice,
  bigIcon,
  mainText = "Frete grátis para compras acima de ",
  nudge,
}: Props) {
  const badgeText = nudge?.badge?.text || "De olho no frete";
  const badgeColor = nudge?.badge?.accentColor || "green";
  const badgeIcon = nudge?.badge?.icon || "Zoom";
  const nudgeDelay = nudge?.delayToShowInSeconds || 0;
  const nudgePosition = nudge?.position || "right-bottom";

  return (
    <Nudge
      position={nudgePosition}
      delayToShowInSeconds={nudgeDelay}
      badge={{
        text: badgeText,
        accentColor: badgeColor,
        icon: badgeIcon,
      }}
      disappearAfterSeconds={nudge?.disappearAfterSeconds}
      persistentNudge={nudge?.persistentNudge}
    >
      <div className="flex gap-3 items-center">
        <p className="text-base font-medium text-zinc-800 tracking-wider leading-relaxed">
          {mainText}{" "}
          <strong className={`font-bold text-${[badgeColor]}-800`}>
            {minimumCartPrice.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </strong>
        </p>
        <div
          className={`py-2 px-4 rounded-lg box-border	${
            COLOR_STYLE[badgeColor]
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
