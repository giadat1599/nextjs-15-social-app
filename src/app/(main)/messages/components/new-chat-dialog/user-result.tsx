import UserAvatar from "@/components/user-avatar";
import { CheckIcon } from "lucide-react";
import { UserResponse } from "stream-chat";
import { DefaultStreamChatGenerics } from "stream-chat-react";

interface UserResultProps {
  user: UserResponse<DefaultStreamChatGenerics>;
  selected: boolean;
  onClick: () => void;
}

export default function UserResult({
  user,
  selected,
  onClick,
}: UserResultProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between px-4 py-2.5 transition-colors hover:bg-muted/50"
    >
      <div className="flex items-center gap-2">
        <UserAvatar avatarUrl={user.image} />
        <div className="flex flex-col text-start">
          <p className="font-bold">{user.name}</p>
          <p className="text-muted-foreground">@{user.username}</p>
        </div>
      </div>
      {selected && <CheckIcon className="size-5 text-green-500" />}
    </button>
  );
}
