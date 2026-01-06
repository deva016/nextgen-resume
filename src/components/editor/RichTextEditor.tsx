"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import {
  Bold,
  Italic,
  UnderlineIcon,
  List,
  ListOrdered,
  LinkIcon,
} from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Start typing...",
  label,
  className,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-purple-400 underline",
        },
      }),
      Underline,
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none min-h-[120px] p-4 text-gray-200",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update editor content when value changes externally
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  const toggleLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium text-gray-300">{label}</label>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 rounded-t-lg border border-b-0 border-white/10 bg-white/5 p-2 backdrop-blur-sm">
        {/* Format Dropdown */}
        <select
          onChange={(e) => {
            const level = parseInt(e.target.value);
            if (level === 0) {
              editor.chain().focus().setParagraph().run();
            } else {
              editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 }).run();
            }
          }}
          value={
            editor.isActive("heading", { level: 1 })
              ? 1
              : editor.isActive("heading", { level: 2 })
              ? 2
              : editor.isActive("heading", { level: 3 })
              ? 3
              : 0
          }
          className="rounded border border-white/10 bg-white/5 px-2 py-1 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          <option value="0">Normal</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
        </select>

        <div className="mx-1 h-6 w-px bg-white/10" />

        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "rounded p-1.5 transition-colors hover:bg-white/10",
            editor.isActive("bold") && "bg-white/20 text-purple-400"
          )}
          title="Bold (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "rounded p-1.5 transition-colors hover:bg-white/10",
            editor.isActive("italic") && "bg-white/20 text-purple-400"
          )}
          title="Italic (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </button>

        {/* Underline */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn(
            "rounded p-1.5 transition-colors hover:bg-white/10",
            editor.isActive("underline") && "bg-white/20 text-purple-400"
          )}
          title="Underline (Ctrl+U)"
        >
          <UnderlineIcon className="h-4 w-4" />
        </button>

        <div className="mx-1 h-6 w-px bg-white/10" />

        {/* Link */}
        <button
          type="button"
          onClick={toggleLink}
          className={cn(
            "rounded p-1.5 transition-colors hover:bg-white/10",
            editor.isActive("link") && "bg-white/20 text-purple-400"
          )}
          title="Insert Link"
        >
          <LinkIcon className="h-4 w-4" />
        </button>

        <div className="mx-1 h-6 w-px bg-white/10" />

        {/* Bullet List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "rounded p-1.5 transition-colors hover:bg-white/10",
            editor.isActive("bulletList") && "bg-white/20 text-purple-400"
          )}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>

        {/* Ordered List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            "rounded p-1.5 transition-colors hover:bg-white/10",
            editor.isActive("orderedList") && "bg-white/20 text-purple-400"
          )}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </button>
      </div>

      {/* Editor Content */}
      <div className="rounded-b-lg border border-white/10 bg-white/5 backdrop-blur-sm">
        <EditorContent editor={editor} placeholder={placeholder} />
      </div>
    </div>
  );
}
