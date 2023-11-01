import { useEffect, useState } from "preact/hooks";
import Nudge, { Position } from "../../components/Nudge.tsx";

export interface Props {
  minQuantityToShow: number;
  quantityOfBought: number;
  delayToShowInSeconds: number;
  position?: Position;
}

function PeopleWhoBought({position = 'right-bottom', minQuantityToShow, quantityOfBought, ...props }: Props){

  return (
    <>
      {quantityOfBought >= minQuantityToShow && (
        <Nudge {...props} accentColor="emerald" position={position} badgeText="Popular">
          <p className="text-base font-medium text-zinc-800 tracking-wider leading-relaxed"><strong className="text-emerald-800 font-bold">+{quantityOfBought}</strong> pessoas compraram esse produto recentemente </p>

        </Nudge>
      )}
    </>
  );
}

export default PeopleWhoBought