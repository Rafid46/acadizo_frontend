/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditorContent } from "@tiptap/react";
import { useEffect } from "react";
import EditButtons from "../pages/EditButtons";
import { Form } from "antd";

interface EditorWrapperProps {
  editor: any;
}

const EditorWrapper = ({ editor }: EditorWrapperProps) => {
  const form = Form.useFormInstance(); // Grab form context

  // Sync Tiptap content to AntD Form on every change
  useEffect(() => {
    if (!editor) return;

    const updateFormValue = () => {
      const html = editor.getHTML();
      form.setFieldsValue({ activityDescription: html });
    };

    editor.on("update", updateFormValue);

    return () => {
      editor.off("update", updateFormValue);
    };
  }, [editor, form]);

  if (!editor) return null;

  return (
    <div>
      <EditButtons editor={editor} />
      <EditorContent
        editor={editor}
        className="bg-gray-50 rounded-xl p-4 w-full max-w-full overflow-x-scroll"
      />
    </div>
  );
};

export default EditorWrapper;
