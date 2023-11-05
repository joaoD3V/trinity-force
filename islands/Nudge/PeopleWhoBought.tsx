import Nudge, { NudgeBaseProps } from "$store/islands/Nudge/Nudge.tsx";
import TextEditor, {
  TextEditorProps,
} from "$store/components/ui/TextEditor.tsx";
import NudgeImage from "$store/islands/Nudge/NudgeImage.tsx";

export interface Props {
  /**
   * @title Minimum sales quantity to enable people who bought
   */
  minQuantityToShow: number;

  /**
   * @title Total sales quantity
   * @description KEY PROPERTY
   */
  quantityOfBought: number;

  /**
   * @title Product image URL
   */
  imageURL?: string;

  textEditor?: Partial<Omit<TextEditorProps, "accentColor" | "keyProperty">>;

  nudge?: NudgeBaseProps;
}

function PeopleWhoBought({
  minQuantityToShow = 100,
  quantityOfBought = 100,
  imageURL,
  textEditor,
  nudge,
}: Props) {
  if (quantityOfBought < minQuantityToShow) return null;

  const nudgeProps: NudgeBaseProps = {
    position: nudge?.position || "right-bottom",
    delayToShowInSeconds: nudge?.delayToShowInSeconds || 0,
    badge: {
      text: nudge?.badge?.text || "Popular",
      accentColor: nudge?.badge?.accentColor || "emerald",
      icon: nudge?.badge?.icon,
    },
    disappearAfterSeconds: nudge?.disappearAfterSeconds,
    isCloseable: nudge?.isCloseable,
  };

  const textEditorProps: TextEditorProps = {
    highlightedText: textEditor?.highlightedText ||
      "Mais de $$ pessoas compraram esse produto recentemente",
    keyProperty: quantityOfBought,
    accentColor: nudge?.badge?.accentColor || "emerald",
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

export default PeopleWhoBought;
