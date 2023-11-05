import { useEffect, useState } from "preact/hooks";

import Nudge, { NudgeBaseProps } from "$store/islands/Nudge/Nudge.tsx";
import NudgeImage from "$store/islands/Nudge/NudgeImage.tsx";
import TextEditor, {
  TextEditorProps,
} from "$store/components/ui/TextEditor.tsx";

export interface Props {
  /**
   * @title Expires at date
   * @format datetime
   */
  expiresAt: string;

  /**
   * @description link
   */
  linkToSpecificOffer?: string;

  /**
   * @description Text to be displayed on the button
   */
  textLink?: string;

  /**
   * @title Product image URL
   */
  imageURL?: string;

  textEditor?: Partial<Omit<TextEditorProps, "accentColor" | "keyProperty">>;

  nudge?: NudgeBaseProps;
}

type CountdownProps = {
  time: number;
};

function Countdown({ time }: CountdownProps) {
  return (
    <span className="bg-black text-white text-base tracking-wider font-medium h-8 w-9 px-2 py-1 rounded shadow-md flex items-center justify-center">
      {String(time).padStart(2, "0")}
    </span>
  );
}

function FlashOffer({
  expiresAt,
  linkToSpecificOffer,
  textLink,
  imageURL,
  textEditor,
  nudge,
}: Props) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const nudgeProps: NudgeBaseProps = {
    position: nudge?.position || "right-bottom",
    delayToShowInSeconds: nudge?.delayToShowInSeconds || 0,
    badge: {
      text: nudge?.badge?.text || "Oferta Relâmpago",
      accentColor: nudge?.badge?.accentColor || "amber",
      icon: nudge?.badge?.icon,
    },
    disappearAfterSeconds: nudge?.disappearAfterSeconds,
    isCloseable: nudge?.isCloseable,
  };

  const textEditorProps: TextEditorProps = {
    highlightedText: textEditor?.highlightedText ||
      "Aproveite esta oferta relâmpago e compre com desconto!",
    keyProperty: "",
    accentColor: nudge?.badge?.accentColor || "amber",
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  function calculateTimeLeft() {
    const difference = expiresAt
      ? new Date(expiresAt).getTime() - new Date().getTime()
      : 0;

    if (difference <= 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }
    const days = String(Math.floor(difference / (1000 * 60 * 60 * 24)))
      .padStart(2, "0");
    const hours = String(Math.floor((difference / (1000 * 60 * 60)) % 24))
      .padStart(2, "0");
    const minutes = String(Math.floor((difference / (1000 * 60)) % 60))
      .padStart(2, "0");
    const seconds = String(Math.floor((difference / 1000) % 60)).padStart(
      2,
      "0",
    );

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  useEffect(() => {
    const { days, hours, minutes, seconds } = timeLeft;

    const hasDay = Number(days) > 0;

    document.title = hasDay
      ? `${days}:${hours}:${minutes}:${seconds}`
      : `${hours}:${minutes}:${seconds}`;
  }, [timeLeft]);

  return (
    <Nudge {...nudgeProps}>
      <div className="flex flex-col gap-3 justify-center items-center w-full">
        <div className="flex gap-3 items-center">
          <div className="flex items-center justify-center gap-1 w-full">
            {Number(timeLeft.days) > 0 && (
              <div className="flex flex-col items-center justify-center gap-0.5">
                <span className="text-xs">D</span>
                <Countdown time={Number(timeLeft.days)} />
              </div>
            )}
            <div className="flex flex-col items-center justify-center gap-0.5">
              <span className="text-xs">H</span>
              <Countdown time={Number(timeLeft.hours)} />
            </div>

            <div className="flex flex-col items-center justify-center gap-0.5">
              <span className="text-xs">Min.</span>
              <Countdown time={Number(timeLeft.minutes)} />
            </div>
            <div className="flex flex-col items-center justify-center gap-0.5">
              <span className="text-xs">Seg.</span>
              <Countdown time={Number(timeLeft.seconds)} />
            </div>
          </div>
          {imageURL && <NudgeImage imageURL={imageURL} />}
        </div>

        <TextEditor {...textEditorProps} />

        {linkToSpecificOffer && (
          <a
            href={linkToSpecificOffer}
            target="_blank"
            className={`w-full btn-sm uppercase btn btn-link text-${nudgeProps.badge.accentColor}-800 bg-${nudgeProps.badge.accentColor}-200`}
          >
            {textLink || "COMPRE AGORA"}
          </a>
        )}
      </div>
    </Nudge>
  );
}

export default FlashOffer;
