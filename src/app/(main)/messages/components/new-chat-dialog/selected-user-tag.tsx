import UserAvatar from "@/components/user-avatar";
import { XIcon } from "lucide-react";
import { UserResponse } from "stream-chat";
import { DefaultStreamChatGenerics } from "stream-chat-react";

interface SelectedUserTagProps {
  user: UserResponse<DefaultStreamChatGenerics>;
  onRemove: () => void;
}

export default function SelectedUserTag({
  user,
  onRemove,
}: SelectedUserTagProps) {
  return (
    <button
      onClick={onRemove}
      className="flex items-center gap-2 rounded-full border p-1 hover:bg-muted/50"
    >
      <UserAvatar avatarUrl={user.image} size={24} />
      <p className="font-bold">{user.username}</p>
      <XIcon className="mx-2 size-5 text-muted-foreground" />
    </button>
  );
}
