import Nudge, { NudgeBaseProps } from "$store/islands/Nudge/Nudge.tsx";
import { AvailableIcons } from "$store/components/ui/Icon.tsx";
import TextEditor, {
  TextEditorProps,
} from "$store/components/ui/TextEditor.tsx";
import NudgeImage from "$store/islands/Nudge/NudgeImage.tsx";
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

  /**
   * @title Product image URL
   */
  imageURL?: string;

  nudge?: NudgeBaseProps;
}

function LowStock({
  maxQuantityToShow,
  stock,
  textEditor,
  imageURL,

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
    isCloseable: nudge?.isCloseable,
  };

  const textEditorProps: TextEditorProps = {
    highlightedText: textEditor?.highlightedText ||
      "Se apresse! Restam apenas $$ unidades!",
    keyProperty: stock,
    accentColor: nudge?.badge?.accentColor || "amber",
  };

  return (
    <Nudge {...nudgeProps}>
      <div className="flex gap-3 items-center">
        <TextEditor {...textEditorProps} />

        {imageURL && <NudgeImage imageURL={imageURL} />}
      </div>
    </Nudge>
  );
}

export default LowStock;
