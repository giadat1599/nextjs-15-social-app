import { useSession } from "@/components/providers/session-provider";
import {
  ChannelList,
  ChannelPreviewMessenger,
  ChannelPreviewUIComponentProps,
  useChatContext,
} from "stream-chat-react";
import MenuHeader from "./menu-header";
import { cn } from "@/lib/utils";
import { useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface ChatSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function ChatSidebar({ open, onClose }: ChatSidebarProps) {
  const { user } = useSession();

  const queryClient = useQueryClient();

  const { channel } = useChatContext();

  const ChannelPreviewCustom = useCallback(
    (props: ChannelPreviewUIComponentProps) => (
      <ChannelPreviewMessenger
        {...props}
        onSelect={() => {
          props.setActiveChannel?.(props.channel, props.watchers);
          onClose();
        }}
      />
    ),
    [onClose],
  );

  useEffect(() => {
    if (channel?.id) {
      queryClient.invalidateQueries({
        queryKey: ["unread-messages-count"],
      });
    }
  }, [channel?.id, queryClient]);

  return (
    <>
      <div
        className={cn(
          "size-full flex-col border-e md:flex md:w-72",
          open ? "flex" : "hidden",
        )}
      >
        <MenuHeader onClose={onClose} />
        <ChannelList
          filters={{
            type: "messaging",
            members: { $in: [user.id] },
          }}
          showChannelSearch
          options={{
            state: true,
            presence: true,
            limit: 8,
          }}
          sort={{ last_message_at: -1 }}
          additionalChannelSearchProps={{
            searchForChannels: true,
            searchQueryParams: {
              channelFilters: {
                filters: {
                  members: { $in: [user.id] },
                },
              },
            },
          }}
          Preview={ChannelPreviewCustom}
        />
      </div>
    </>
  );
}
