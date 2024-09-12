import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { ChannelHeader, ChannelHeaderProps } from "stream-chat-react";

interface ChatChannelHeaderProps extends ChannelHeaderProps {
  openSidebar: () => void;
}

export default function ChatChannelHeader({
  openSidebar,
  ...props
}: ChatChannelHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-full p-2 md:hidden">
        <Button size="icon" variant="ghost" onClick={openSidebar}>
          <MenuIcon className="size-5" />
        </Button>
      </div>
      <ChannelHeader {...props} />
    </div>
  );
}
