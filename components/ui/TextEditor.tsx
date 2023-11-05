export interface TextEditorProps {
  /**
   * @description Text can be highlighted: for bold, wrap the text in asterisks (*). For italic, wrap the text in underscores (_). For strikethrough, wrap the text in tildes (~). For apply accent color, wrap the text in brackets ({}). To include the value of the KEY PROPERTY, simply put $$.
   * @default Se apresse! Restam poucas unidades!!
   */
  highlightedText?: string;
  keyProperty?: string | number;
  accentColor?: string;
}

function TextEditor(
  { highlightedText = "", keyProperty = "", accentColor = "red" }:
    TextEditorProps,
) {
  console.log(`text-${accentColor}-800`);

  const color = `text-${accentColor}-800`;
  const formattedText = highlightedText
    .replace(/\*(.*?)\*/g, "<strong>$1</strong>") // bold
    .replace(/_(.*?)_/g, "<i>$1</i>") // italic
    .replace(/~(.*?)~/g, "<del>$1</del>") // strikethrough
    .replace(/\{(.*?)\}/g, `<span class=${color}>$1</span>`) // accent color
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
