// setting up tiptap editor
import { EditorProvider, BubbleMenu, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function TiptapEditor() {
  const extensions = [StarterKit];

  return (
    <div className="flex flex-col gap-4 m-8">
      <EditorProvider
        extensions={extensions}
        editorProps={{
          attributes: {
            class: "h-[200px] relative border border-gray-400 rounded-md p-4",
          },
        }}
      >
        <BubbleMenu>This is the bubble menu</BubbleMenu>
      </EditorProvider>
    </div>
  );
}

export const StepOne = () => {
  return <TiptapEditor />;
};
