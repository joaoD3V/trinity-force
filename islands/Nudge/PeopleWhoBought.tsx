import Nudge, { NudgeBaseProps } from "$store/islands/Nudge/Nudge.tsx";
import NudgeImage from "./NudgeImage.tsx";

export interface Props {
   /**
   * @title Minimum sales quantity to enable people who bought
   */
  minQuantityToShow: number;

  /**
   * @title Total sales quantity
   */
  quantityOfBought: number;

  /**
   * @title Product image URL
   */
  imageURL?: string;

  nudge?: Partial<Omit<NudgeBaseProps, "isFlashOffer">>;
}

function PeopleWhoBought({
  minQuantityToShow = 100,
  quantityOfBought = 100,
  imageURL,
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
      <div className="flex gap-3 items-center">
        <p className="text-base font-medium text-zinc-800 tracking-wider leading-relaxed">
          <strong
            className={`text-${[nudgeProps.badge.accentColor]}-800 font-bold`}
          >
            +{quantityOfBought}
          </strong>{" "}
          pessoas compraram esse produto recentemente
        </p>

        {imageURL && <NudgeImage imageURL={imageURL} />}
      </div>
    </Nudge>
  );
}

export default PeopleWhoBought;
