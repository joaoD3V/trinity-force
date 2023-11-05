import Nudge, { NudgeBaseProps } from "$store/islands/Nudge/Nudge.tsx";
import TextEditor, {
  TextEditorProps,
} from "$store/components/ui/TextEditor.tsx";
import NudgeImage from "$store/islands/Nudge/NudgeImage.tsx";
import type { SectionProps } from "deco/mod.ts";

export interface PeopleWhoBoughtProps {
  /**
   * @title Minimum sales quantity to display nudge
   */
  minQuantityToShow: number;

  /**
   * @title Product image URL
   */
  imageURL?: string;

  textEditor?: Partial<Omit<TextEditorProps, "accentColor" | "keyProperty">>;

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
     * @title path to total sales data
     * @description Based on request result, the path to get the needed data. (KEY PROPERTY)
     */
    salesKey: string;
  };
}

export interface Data {
  data: number | null;
}

export async function loader(
  {
    dataIntegration: {
      url,
      authentication,
      salesKey,
    },
    ...props
  }: Props & PeopleWhoBoughtProps,
  _req: Request,
): Promise<PeopleWhoBoughtProps & Data> {
  if (!url) return { ...props, data: null };

  const headers = new Headers();

  if (authentication) {
    headers.append("Authorization", authentication);
  }

  const result = await fetch(url, { headers }).then((r) => r.json()).catch((
    _error,
  ) => ({}));

  return { ...props, data: result[salesKey] ?? null };
}

function PeopleWhoBought({
  minQuantityToShow,
  imageURL,
  textEditor,
  nudge,
  data: quantityOfBought,
}: SectionProps<typeof loader>) {
  if (quantityOfBought === null || quantityOfBought < minQuantityToShow) {
    return null;
  }

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
