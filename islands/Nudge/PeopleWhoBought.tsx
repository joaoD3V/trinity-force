import { Color } from "https://deno.land/x/color@v0.3.0/mod.ts";
import { useEffect, useState } from "preact/hooks";

export interface Props {
  minQuantityToShow: number;
  delayToShowInSeconds: number;
  quantityOfBought: number;
  position?: 'Left' | 'Right'
}

function PeopleWhoBought({minQuantityToShow, delayToShowInSeconds, quantityOfBought, position = 'Right'}: Props){
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowing(true);
    }, delayToShowInSeconds * 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])



  return (
    <>
      {quantityOfBought >= minQuantityToShow && isShowing && (
        <div className={`flex flex-col items-start justify-start gap-3.5 p-4 shadow-2xl bg-white fixed bottom-4 z-20 rounded-lg max-w-[354px] ${position === 'Right' ? 'right-4' : 'left-4'}`}>
          <span className="bg-emerald-200 text-emerald-800 uppercase tracking-wider text-xs px-2 py-1 rounded-full font-semibold">Popular</span>
          <p className="text-base font-medium text-zinc-800 tracking-wider leading-relaxed"><strong className="text-emerald-800 font-bold">+{quantityOfBought}</strong> pessoas compraram esse produto recentemente </p>
        
          <span className="bg-emerald-800 text-white font-semibold tracking-wider text-sm px-2 py-1">Garanta já o seu antes que acabe!</span>
        </div>
      )}
    </>
  );
}

export default PeopleWhoBought