/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEditor } from "@tiptap/react";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { useRef } from "react";

interface UseTiptapEditorProps {
  content?: string;
  shouldOptimizeRendering?: boolean;
}

export const useTiptapEditor = ({
  content = "",
  shouldOptimizeRendering = true,
}: UseTiptapEditorProps) => {
  const editorRef = useRef<any>(null);

  const editor = useEditor({
    content,
    shouldRerenderOnTransaction: !shouldOptimizeRendering,
    immediatelyRender: true,
    extensions: [
      Placeholder.configure({
        placeholder: "Write something...",
      }),
      Underline,
      TextStyle,
      Color,
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({ multicolor: true }),
    ],
    onCreate: ({ editor }) => {
      editorRef.current = editor;
    },
  });

  return editor;
};
