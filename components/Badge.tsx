import { useEffect, useState } from "preact/hooks";
import { differenceInSeconds } from 'npm:date-fns';

export interface Props {
  accentColor: 'emerald' | 'amber';
  text: string;
}


function Badge({ accentColor, text }: Props){
  return (
    <span className={`uppercase tracking-wider text-xs px-2 py-1 rounded-full font-semibold flex items-center justify-center ${accentColor === 'emerald' && 'bg-emerald-200 text-emerald-800'} ${accentColor === 'amber' && 'bg-amber-200 text-amber-800'}`}>{text}</span>
  );
}

export default Badge