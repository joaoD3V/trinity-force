import Nudge, { Position } from "$store/islands/Nudge/Nudge.tsx";

export interface Props {
  minQuantityToShow: number;
  quantityOfBought: number;
  delayToShowInSeconds: number;
  accentColor?: 'emerald' | 'amber';
  position?: Position;
  badgeText: string;
}

function PeopleWhoBought({
  position = 'right-bottom',
  minQuantityToShow = 100,
  quantityOfBought = 100,
  badgeText = 'Popular',
  accentColor = 'emerald',
  ...props
}: Props){

  return (
    <>
      {quantityOfBought >= minQuantityToShow && (
        <Nudge {...props} accentColor={accentColor} position={position} badgeText={badgeText}>
          <p className="text-base font-medium text-zinc-800 tracking-wider leading-relaxed">
            <strong className="text-emerald-800 font-bold">+{quantityOfBought}</strong> pessoas compraram esse produto recentemente
          </p>
        </Nudge>
      )}
    </>
  );
}

export default PeopleWhoBought
