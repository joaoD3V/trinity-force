import Nudge, {
  NudgeBaseProps,
  Position,
} from "$store/islands/Nudge/Nudge.tsx";
import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import { COLOR_STYLE } from "$store/components/ui/Badge.tsx";
import TextEditor, {
  TextEditorProps,
} from "$store/components/ui/TextEditor.tsx";

export interface Props {
  /**
   * @title Minimum value to enable free delivery
   * @description KEY PROPERTY
   */
  minimumCartPrice: number;

  /**
   * @title Big icon
   * @description Icon to be displayed on the right side of the text
   */
  bigIcon?: AvailableIcons;

  textEditor?: Partial<Omit<TextEditorProps, "accentColor" | "keyProperty">>;

  nudge?: NudgeBaseProps;
}

function FreeDelivery({
  minimumCartPrice,
  bigIcon = "Truck",
  textEditor,
  nudge,
}: Props) {
  const nudgeProps: NudgeBaseProps = {
    position: nudge?.position || "right-bottom",
    delayToShowInSeconds: nudge?.delayToShowInSeconds || 0,
    badge: {
      text: nudge?.badge?.text || "De olho no frete",
      accentColor: nudge?.badge?.accentColor || "green",
      icon: nudge?.badge?.icon || "Zoom",
    },
    disappearAfterSeconds: nudge?.disappearAfterSeconds,
    isCloseable: nudge?.isCloseable,
  };

  const textEditorProps: TextEditorProps = {
    highlightedText: textEditor?.highlightedText ||
      "Frete grátis a partir de $$",
    keyProperty: minimumCartPrice?.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    }),
    accentColor: nudge?.badge?.accentColor || "green",
  };

  return (
    <Nudge
      {...nudgeProps}
    >
      <div className="flex gap-3 items-center">
        <TextEditor
          {...textEditorProps}
        />
        <div
          className={`py-2 px-4 rounded-lg box-border	${
            COLOR_STYLE[nudgeProps.badge.accentColor]
          }`}
        >
          <Icon
            id={bigIcon}
            size={64}
            strokeWidth={2}
          />
        </div>
      </div>
    </Nudge>
  );
}

export default FreeDelivery;
