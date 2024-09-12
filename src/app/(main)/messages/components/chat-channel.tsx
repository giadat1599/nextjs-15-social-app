import { cn } from "@/lib/utils";
import {
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Window,
} from "stream-chat-react";
import ChatChannelHeader from "./chat-channel-header";

interface ChatChannelProps {
  open: boolean;
  openSidebar: () => void;
}

export default function ChatChannel({ open, openSidebar }: ChatChannelProps) {
  return (
    <div className={cn("w-full md:block", !open && "hidden")}>
      <Channel>
        <Window>
          <ChatChannelHeader openSidebar={openSidebar} />
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </div>
  );
}
