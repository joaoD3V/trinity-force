import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export interface BadgeProps {
  accentColor: 'emerald' | 'amber';
  text: string;
  icon?: AvailableIcons
}

function Badge({ accentColor, text, icon }: BadgeProps){
  return (
    <span className={`uppercase tracking-wider text-xs px-2 py-1 rounded-full font-semibold flex gap-1 items-center justify-center ${accentColor === 'emerald' && 'bg-emerald-200 text-emerald-800'} ${accentColor === 'amber' && 'bg-amber-200 text-amber-800'}`}>
      {icon ? <Icon id={icon} height={16} strokeWidth={8} width={16} /> : null}
      {text}
    </span>
  );
}

export default Badge
