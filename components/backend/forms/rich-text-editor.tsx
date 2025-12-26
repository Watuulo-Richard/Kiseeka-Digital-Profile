"use client";

import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/extension-bubble-menu";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import { Level } from "@tiptap/extension-heading";

import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code,
  Image as ImageIcon,
  Undo,
  Redo,
  Quote,
  Eye,
  Link as LinkIcon,
  Unlink,
  Strikethrough,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
} from "lucide-react";

interface EditorProps {
  variant?: "default" | "compact";
  initialContent?: string;
  content?: string;
  setContent?: (content: string) => void;
  isEditable?: boolean;
}

export default function VEditor({
  variant = "default",
  initialContent = "<p>Start writing your document here...</p>",
  content,
  setContent,
  isEditable = true,
}: EditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline",
        },
      }),
      Subscript,
      Superscript,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      BubbleMenu.configure({
        element: document.querySelector(".bubble-menu") as HTMLElement,
      }),
    ],
    content: content || initialContent,
    editable: isEditable,
    editorProps: {
      attributes: {
        class: `${
          variant === "default" ? "min-h-[400px]" : "min-h-[200px]"
        } w-full p-4 shadow-sm border rounded-lg prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none bg-white dark:bg-[#0F0F12] overflow-y-auto`,
      },
    },
    onUpdate: ({ editor }) => {
      if (setContent) {
        setContent(editor.getHTML());
      }
    },
  });

  useEffect(() => {
    if (editor && content !== undefined) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setShowImageDialog(false);
    }
  };

  const setLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
    setShowLinkDialog(false);
    setLinkUrl("");
  };

  const toggleHeading = (level: Level) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="w-full">
        {isEditable && (
          <div className="mb-4 rounded-lg border bg-white dark:bg-[#0F0F12] shadow-sm">
            <div className="flex flex-wrap items-center gap-1 border-b p-2">
              <Select
                value={
                  editor.isActive("heading", { level: 1 })
                    ? "h1"
                    : editor.isActive("heading", { level: 2 })
                    ? "h2"
                    : editor.isActive("heading", { level: 3 })
                    ? "h3"
                    : editor.isActive("heading", { level: 4 })
                    ? "h4"
                    : "p"
                }
                onValueChange={(value) => {
                  if (value === "p")
                    editor.chain().focus().setParagraph().run();
                  if (value === "h1") toggleHeading(1);
                  if (value === "h2") toggleHeading(2);
                  if (value === "h3") toggleHeading(3);
                  if (value === "h4") toggleHeading(4);
                }}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="p">Paragraph</SelectItem>
                  <SelectItem value="h1">Heading 1</SelectItem>
                  <SelectItem value="h2">Heading 2</SelectItem>
                  <SelectItem value="h3">Heading 3</SelectItem>
                  <SelectItem value="h4">Heading 4</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-1">
                <Toggle
                  size="sm"
                  pressed={editor.isActive("bold")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleBold().run()
                  }
                  aria-label="Toggle bold"
                >
                  <Bold className="h-4 w-4" />
                </Toggle>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("italic")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleItalic().run()
                  }
                  aria-label="Toggle italic"
                >
                  <Italic className="h-4 w-4" />
                </Toggle>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("strike")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleStrike().run()
                  }
                  aria-label="Toggle strikethrough"
                >
                  <Strikethrough className="h-4 w-4" />
                </Toggle>
              </div>

              <div className="flex items-center gap-1">
                <Toggle
                  size="sm"
                  pressed={editor.isActive("subscript")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleSubscript().run()
                  }
                  aria-label="Toggle subscript"
                >
                  <SubscriptIcon className="h-4 w-4" />
                </Toggle>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("superscript")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleSuperscript().run()
                  }
                  aria-label="Toggle superscript"
                >
                  <SuperscriptIcon className="h-4 w-4" />
                </Toggle>
              </div>

              <div className="flex items-center gap-1">
                <Toggle
                  size="sm"
                  pressed={editor.isActive({ textAlign: "left" })}
                  onPressedChange={() =>
                    editor.chain().focus().setTextAlign("left").run()
                  }
                  aria-label="Align left"
                >
                  <AlignLeft className="h-4 w-4" />
                </Toggle>
                <Toggle
                  size="sm"
                  pressed={editor.isActive({ textAlign: "center" })}
                  onPressedChange={() =>
                    editor.chain().focus().setTextAlign("center").run()
                  }
                  aria-label="Align center"
                >
                  <AlignCenter className="h-4 w-4" />
                </Toggle>
                <Toggle
                  size="sm"
                  pressed={editor.isActive({ textAlign: "right" })}
                  onPressedChange={() =>
                    editor.chain().focus().setTextAlign("right").run()
                  }
                  aria-label="Align right"
                >
                  <AlignRight className="h-4 w-4" />
                </Toggle>
              </div>

              <div className="flex items-center gap-1">
                <Toggle
                  size="sm"
                  pressed={editor.isActive("bulletList")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  aria-label="Toggle bullet list"
                >
                  <List className="h-4 w-4" />
                </Toggle>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("orderedList")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  aria-label="Toggle ordered list"
                >
                  <ListOrdered className="h-4 w-4" />
                </Toggle>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("blockquote")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                  aria-label="Toggle blockquote"
                >
                  <Quote className="h-4 w-4" />
                </Toggle>
              </div>

              <div className="flex items-center gap-1">
                <Toggle
                  size="sm"
                  pressed={editor.isActive("codeBlock")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleCodeBlock().run()
                  }
                  aria-label="Toggle code block"
                >
                  <Code className="h-4 w-4" />
                </Toggle>
                <Dialog
                  open={showImageDialog}
                  onOpenChange={setShowImageDialog}
                >
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" aria-label="Insert image">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Insert Image</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image-url" className="text-right">
                          Image URL
                        </Label>
                        <Input
                          id="image-url"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <Button onClick={addImage}>Insert Image</Button>
                  </DialogContent>
                </Dialog>
                <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" aria-label="Insert link">
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Insert Link</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="link-url" className="text-right">
                          Link URL
                        </Label>
                        <Input
                          id="link-url"
                          value={linkUrl}
                          onChange={(e) => setLinkUrl(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <Button onClick={setLink}>Set Link</Button>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().undo()}
                  aria-label="Undo"
                >
                  <Undo className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().redo()}
                  aria-label="Redo"
                >
                  <Redo className="h-4 w-4" />
                </Button>
              </div>

              <Dialog open={showPreview} onOpenChange={setShowPreview}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="ml-auto">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl w-[95vw] max-h-[85vh] overflow-hidden flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                      Content Preview
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
                      Preview how your blog post content will look when
                      published
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex-1 overflow-y-auto px-1 mt-4">
                    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none dark:prose-invert prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-p:text-base prose-p:leading-7 prose-a:text-blue-500 prose-a:underline prose-strong:font-bold prose-em:italic prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-ul:list-disc prose-ol:list-decimal prose-li:my-1 prose-img:rounded-lg prose-img:shadow-md">
                      <div
                        dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}

        <div className="overflow-hidden">
          <EditorContent editor={editor} />
        </div>

        {editor && (
          <div className="mt-2 px-4 text-sm text-gray-500 dark:text-gray-400">
            {editor.storage.characterCount?.words() || 0} words
          </div>
        )}
      </div>

      {/* Bubble Menu - only shows when text is selected */}
      {isEditable && editor && (
        <div className="bubble-menu bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-1 flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={
              editor.isActive("bold") ? "bg-gray-200 dark:bg-gray-700" : ""
            }
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={
              editor.isActive("italic") ? "bg-gray-200 dark:bg-gray-700" : ""
            }
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLinkDialog(true)}
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().unsetLink().run()}
          >
            <Unlink className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
