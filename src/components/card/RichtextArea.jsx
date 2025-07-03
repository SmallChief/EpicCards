import "./RichtextArea.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { en } from "@blocknote/core/locales";

export default function RichtextArea({ card, onUpdateDescription }) {
  const locale = en;
  const editor = useCreateBlockNote(
    {
      dictionary: {
        ...locale,
        placeholders: {
          ...locale.placeholders,
          emptyDocument: "Enter your description here...",
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
    },
    [card.id]
  );

  return (
    <div className="richtext-area">
      <BlockNoteView
        editor={editor}
        sideMenu={false}
        onChange={() => onUpdateDescription(editor.document)}
      />
    </div>
  );
}
