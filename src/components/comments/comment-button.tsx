import { PostData } from "@/lib/types";
import { MessageSquareIcon } from "lucide-react";

interface CommentButton {
  post: PostData;
  onClick: () => void;
}

export default function CommentButton({ post, onClick }: CommentButton) {
  return (
    <button onClick={onClick} className="flex items-center gap-2">
      <MessageSquareIcon className="size-5" />
      <span className="text-sm font-medium tabular-nums">
        {post._count.comments}{" "}
        <span className="hidden sm:inline">comments</span>
      </span>
    </button>
  );
}
