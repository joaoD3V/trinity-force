import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import { TailwindColorBase } from "$store/types/Colors.ts";

export interface BadgeProps {
  accentColor: TailwindColorBase;
  icon?: AvailableIcons;
  text?: string;
}

export const COLOR_STYLE = {
  amber: "bg-amber-200 text-amber-800",
  blue: "bg-blue-200 text-blue-800",
  cyan: "bg-cyan-200 text-cyan-800",
  emerald: "bg-emerald-200 text-emerald-800",
  fuchsia: "bg-fuchsia-200 text-fuchsia-800",
  gray: "bg-gray-200 text-gray-800",
  green: "bg-green-200 text-green-800",
  indigo: "bg-indigo-200 text-indigo-800",
  lime: "bg-lime-200 text-lime-800",
  neutral: "bg-neutral-200 text-neutral-800",
  orange: "bg-orange-200 text-orange-800",
  pink: "bg-pink-200 text-pink-800",
  purple: "bg-purple-200 text-purple-800",
  red: "bg-red-200 text-red-800",
  rose: "bg-rose-200 text-rose-800",
  sky: "bg-sky-200 text-sky-800",
  slate: "bg-slate-200 text-slate-800",
  stone: "bg-stone-200 text-stone-800",
  teal: "bg-teal-200 text-teal-800",
  violet: "bg-violet-200 text-violet-800",
  yellow: "bg-yellow-200 text-yellow-800",
  zinc: "bg-zinc-200 text-zinc-800",
};

function Badge(
  { accentColor, icon, text = "" }: BadgeProps,
) {
  if (!icon && !text) return null;

  return (
    <span
      className={`uppercase tracking-wider text-xs px-2 py-1 rounded-full font-semibold flex gap-1 items-center justify-center ${
        COLOR_STYLE[accentColor]
      }`}
    >
      {icon ? <Icon id={icon} size={16} strokeWidth={1} /> : null}
      {text}
    </span>
  );
}

export default Badge;
