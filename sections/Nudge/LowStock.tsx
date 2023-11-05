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
  dataIntegration: {
    /**
     * @title integration url
     */
    url: string;
    /**
     * @title authentication
     * @description auth token including type (e.g: Bearer my_token)
     */
    authentication?: string;
    /**
     * @title path to stock data
     * @description Based on request result, the path to get the needed data.
     */
    stockKey: string;
  }
}

export interface Data {
  data: number | null
}

export async function loader(
  {
    dataIntegration: {
      url,
      authentication,
      stockKey,
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

  return { ...props, data: result[stockKey] ?? null };
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
