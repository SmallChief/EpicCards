import "./RichtextArea.css";
// import { Block } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { en } from "@blocknote/core/locales";

export default function RichtextArea({ card, onUpdateDescription }) {
  const locale = en;
  const editor = useCreateBlockNote({
    dictionary: {
      ...locale,
      placeholders: {
        ...locale.placeholders,
        // We override the empty document placeholder
        emptyDocument: "Enter your description here...",
        // We override the default placeholder
        default: "Enter your description here...",
      },
    },
    initialContent: card.description,
    spellcheck: true,
    features: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "paragraph",
      "blockquote",
    ],
    editable: false,
  });

  editor.onChange(() => {
    onUpdateDescription(editor.document);
  });

  return (
    <div className="richtext-area">
      <BlockNoteView editor={editor} sideMenu={false} />
    </div>
  );
}
