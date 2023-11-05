import Nudge, { NudgeBaseProps } from "$store/islands/Nudge/Nudge.tsx";
import TextEditor, {
  TextEditorProps,
} from "$store/components/ui/TextEditor.tsx";
import NudgeImage from "$store/islands/Nudge/NudgeImage.tsx";
import type { SectionProps } from "deco/mod.ts";

export interface LowStockProps {
  /**
   * @title Max items for low stock warning
   */
  maxQuantityToShow: number;

  textEditor?: Partial<Omit<TextEditorProps, "accentColor" | "keyProperty">>;

  /**
   * @title Product image URL
   */
  imageURL?: string;

  nudge?: NudgeBaseProps;
}

export interface Props {
  stockIntegration: {
    /**
     * @title integration url
     */
    url: string;
    /**
     * @title authentication (including type)
     */
    authentication?: string;
    /**
     * @title path to needed data
     */
    dataPath: string;
  }
}

export interface Data {
  data: string | null
}

export async function loader(
  {
    stockIntegration: {
      url,
      authentication,
      dataPath,
    },
    ...props
  }: Props & LowStockProps,
  _req: Request
): Promise<LowStockProps & Data> {
  if (!url) return { data: null };

  const headers = new Headers();

  if (authentication) {
    headers.append('Authorization', authentication);
  }

  const result = await fetch(url, { headers }).then((r) => r.json()).catch((_error) => ({}));

  return { ...props, data: result[dataPath] ?? null };
}

export default function LowStock({
  data: stock,
  maxQuantityToShow,
  textEditor,
  imageURL,
  nudge
}: SectionProps<typeof loader>) {
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
