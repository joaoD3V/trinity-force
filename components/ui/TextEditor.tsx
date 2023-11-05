import { TailwindColorBase } from "$store/types/Colors.ts";

export interface TextEditorProps {
  /**
   * @description Text can be highlighted: for bold, wrap the text in asterisks (*). For italic, wrap the text in underscores (_). For strikethrough, wrap the text in tildes (~). For apply accent color, wrap the text in brackets ({}). To include the value of the KEY PROPERTY, if it exists, simply put $$.
   */
  highlightedText: string;

  keyProperty?: string | number;
  accentColor: TailwindColorBase;
}

function TextEditor(
  { highlightedText, keyProperty = "", accentColor }: TextEditorProps,
) {
  const formattedText = highlightedText
    .replace(/\*(.*?)\*/g, "<strong>$1</strong>") // bold
    .replace(/_(.*?)_/g, "<i>$1</i>") // italic
    .replace(/~(.*?)~/g, "<del>$1</del>") // strikethrough
    .replace(/\{(.*?)\}/g, `<span class="text-${accentColor}-800">$1</span>`) // accent color
    .replace(
      /\$\$/g,
      `<span>${keyProperty.toString()}</span>`,
    ); // key property

  return (
    <div>
      <p
        dangerouslySetInnerHTML={{ __html: formattedText }}
        className="text-base font-medium tracking-wider leading-relaxed"
      >
      </p>
    </div>
  );
}

export default TextEditor;
