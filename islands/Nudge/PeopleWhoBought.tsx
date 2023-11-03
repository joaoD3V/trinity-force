import Nudge, { NudgeBaseProps } from "$store/islands/Nudge/Nudge.tsx";

export interface Props {
  minQuantityToShow: number;
  quantityOfBought: number;
  nudge?: Partial<Omit<NudgeBaseProps, "isFlashOffer">>;
}

function PeopleWhoBought({
  minQuantityToShow = 100,
  quantityOfBought = 100,
  nudge,
}: Props) {
  if (quantityOfBought < minQuantityToShow) return null;

  const nudgeProps: NudgeBaseProps = {
    position: nudge?.position || "right-bottom",
    delayToShowInSeconds: nudge?.delayToShowInSeconds || 0,
    badge: {
      text: nudge?.badge?.text || "Popular",
      accentColor: nudge?.badge?.accentColor || "emerald",
      icon: nudge?.badge?.icon,
    },
    disappearAfterSeconds: nudge?.disappearAfterSeconds,
    persistentNudge: nudge?.persistentNudge,
  };

  return (
    <Nudge {...nudgeProps}>
      <p className="text-base font-medium text-zinc-800 tracking-wider leading-relaxed">
        <strong className="text-emerald-800 font-bold">
          +{quantityOfBought}
        </strong>{" "}
        pessoas compraram esse produto recentemente
      </p>
    </Nudge>
  );
}

export default PeopleWhoBought;
