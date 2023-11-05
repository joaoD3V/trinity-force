import Nudge, { NudgeBaseProps } from "$store/islands/Nudge/Nudge.tsx";
import { AvailableIcons } from "$store/components/ui/Icon.tsx";
import TextEditor, {
  TextEditorProps,
} from "../../components/ui/TextEditor.tsx";

export interface Props {
  /**
   * @title Max items for low stock warning
   */
  maxQuantityToShow: number;

  /**
   * @title Stock amount
   * @description KEY PROPERTY
   */
  stock: number;

  textEditor?: Partial<Omit<TextEditorProps, "accentColor" | "keyProperty">>;

  nudge?: Partial<Omit<NudgeBaseProps, "isFlashOffer">>;
}

function LowStock({
  maxQuantityToShow,
  stock,
  textEditor,
  nudge,
}: Props) {
  if (stock > maxQuantityToShow) return null;

  const nudgeProps: NudgeBaseProps = {
    position: nudge?.position || "bottom-center",
    delayToShowInSeconds: nudge?.delayToShowInSeconds || 0,
    badge: {
      text: nudge?.badge?.text || "ÚLTIMAS UNIDADES",
      accentColor: nudge?.badge?.accentColor || "amber",
      icon: nudge?.badge?.icon,
    },
    disappearAfterSeconds: nudge?.disappearAfterSeconds,
    persistentNudge: nudge?.persistentNudge,
  };

  const textEditorProps: TextEditorProps = {
    highlightedText: textEditor?.highlightedText,
    keyProperty: stock,
    accentColor: nudge?.badge?.accentColor,
  };

  return (
    <Nudge {...nudgeProps}>
      <TextEditor {...textEditorProps} />
    </Nudge>
  );
}

export default LowStock;
