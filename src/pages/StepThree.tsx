// setting up tiptap editor
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { RoomProvider, useRoom } from "../liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { useEffect, useState } from "react";
import * as Y from "yjs";
import LiveblocksProvider from "@liveblocks/yjs";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";

type EditorProps = {
  doc: Y.Doc;
  provider: any;
};

function TiptapEditor({ doc, provider }: EditorProps) {
  const extensions = [
    StarterKit.configure({
      history: false, // handled by extension
    }),
    Collaboration.configure({
      document: doc,
    }),
    CollaborationCursor.configure({
      provider,
    }),
  ];

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

function CollabEditor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();

  useEffect(() => {
    const yDoc = new Y.Doc();
    const provider = new LiveblocksProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(provider);

    return () => {
      yDoc.destroy();
      provider.destroy();
    };
  }, [room]);

  if (!doc || !provider) return null;

  return <TiptapEditor doc={doc} provider={provider} />;
}

export const StepThree = () => {
  return (
    <RoomProvider id="my-room" initialPresence={{}}>
      <ClientSideSuspense fallback="loading...">
        {() => <CollabEditor />}
      </ClientSideSuspense>
    </RoomProvider>
  );
};
