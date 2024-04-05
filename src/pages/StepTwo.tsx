// Adding the room provider
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { RoomProvider } from "../liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";

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
        <div />
      </EditorProvider>
    </div>
  );
}

export const StepTwo = () => {
  return (
    <RoomProvider id="my-room" initialPresence={{}}>
      <ClientSideSuspense fallback="loading...">
        {() => <p>Editor goes here</p>}
        {/* {() =>  <CollabEditor/>} */}
      </ClientSideSuspense>
    </RoomProvider>
  );
};
