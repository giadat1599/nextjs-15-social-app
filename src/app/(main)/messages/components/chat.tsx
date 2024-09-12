"use client";

import useInitializeChatClient from "@/hooks/useInitializeChatClient";
import { Loader2 } from "lucide-react";
import { Chat as StreamChat } from "stream-chat-react";
import ChatSidebar from "./chat-sidebar";
import ChatChannel from "./chat-channel";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function Chat() {
  const chatClient = useInitializeChatClient();
  const { resolvedTheme } = useTheme();

  const [sideBarOpen, setSidebarOpen] = useState(false);

  if (!chatClient) return <Loader2 className="mx-auto my-3 animate-spin" />;

  return (
    <main className="relative w-full overflow-hidden rounded-2xl bg-card shadow-sm">
      <div className="absolute bottom-0 top-0 flex w-full">
        <StreamChat
          client={chatClient}
          theme={
            resolvedTheme === "dark"
              ? "str-chat__theme-dark"
              : "str-chat__theme-light"
          }
        >
          <ChatSidebar
            open={sideBarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <ChatChannel
            open={!sideBarOpen}
            openSidebar={() => setSidebarOpen(true)}
          />
        </StreamChat>
      </div>
    </main>
  );
}
