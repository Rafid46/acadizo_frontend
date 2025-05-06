import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";
import { Button, ColorPicker, Tooltip } from "antd";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import { IoMdColorFill } from "react-icons/io";

export default function EditButtons({ editor }: { editor: Editor | null }) {
  const [color, setColor] = useState("#000000");
  if (!editor) return null;

  const Options = [
    {
      icon: <Heading1 size={16} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: editor.isActive("heading", { level: 1 }),
      Tooltip: "Heading 1",
    },
    {
      icon: <Heading2 size={16} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editor.isActive("heading", { level: 2 }),
      Tooltip: "Heading 2",
    },
    {
      icon: <Heading3 size={16} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      active: editor.isActive("heading", { level: 3 }),
      Tooltip: "Heading 3",
    },
    {
      icon: <Bold size={16} />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
      Tooltip: "Bold",
    },
    {
      icon: <Italic size={16} />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
      Tooltip: "Italic",
    },
    {
      icon: <Strikethrough size={16} />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive("strike"),
      Tooltip: "Strike",
    },
    {
      icon: <AlignLeft size={16} />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      active: editor.isActive({ textAlign: "left" }),
      Tooltip: "align left",
    },
    {
      icon: <AlignCenter size={16} />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      active: editor.isActive({ textAlign: "center" }),
      Tooltip: "align center",
    },
    {
      icon: <AlignRight size={16} />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      active: editor.isActive({ textAlign: "right" }),
      Tooltip: "align right",
    },
    {
      icon: <List size={16} />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
      Tooltip: "Bullet point",
    },
    {
      icon: <ListOrdered size={16} />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
      Tooltip: "ordered list",
    },
    {
      icon: <Highlighter size={16} />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      active: editor.isActive("highlight"),
      Tooltip: "Highlight",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        background: "#f0f2f5",
        padding: 8,
        borderRadius: 10,
        marginBottom: 8,
      }}
    >
      {Options?.map((option, index) => (
        <Tooltip title={option.Tooltip} key={index}>
          <Button
            key={index}
            shape="circle"
            type={option.active ? "primary" : "default"}
            icon={option.icon}
            onClick={option.onClick}
          />
        </Tooltip>
      ))}
      <ColorPicker
        value={color}
        onChangeComplete={(color) => {
          const hex = color.toHexString();
          setColor(hex);
          editor.chain().focus().setColor(hex).run();
        }}
        showText
        presets={[
          {
            label: "Presets",
            colors: [
              "#000000",
              "#FF0000",
              "#00FF00",
              "#0000FF",
              "#FADB14",
              "#722ED1",
            ],
          },
        ]}
      >
        <Tooltip title="Text color">
          <Button shape="circle" icon={<IoMdColorFill size={16} />} />
        </Tooltip>
      </ColorPicker>
    </div>
  );
}
