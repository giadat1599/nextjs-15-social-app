"use client";

import { BookmarkInfo } from "@/lib/types";
import { useToast } from "./ui/use-toast";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { BookmarkIcon, HeartIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  postId: string;
  initialState: BookmarkInfo;
}
export default function BookmarkButton({
  postId,
  initialState,
}: BookmarkButtonProps) {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const queryKey: QueryKey = ["bookmark-info", postId];

  const { data } = useQuery({
    queryKey,
    queryFn: () =>
      kyInstance.get(`/api/posts/${postId}/bookmarks`).json<BookmarkInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  });

  const mutation = useMutation({
    mutationFn: () => {
      if (data.isBookmarkedByLoggedInUser) {
        return kyInstance.delete(`/api/posts/${postId}/bookmarks`);
      } else {
        return kyInstance.post(`/api/posts/${postId}/bookmarks`);
      }
    },
    onMutate: async () => {
      toast({
        description: `Post ${data.isBookmarkedByLoggedInUser ? "un" : ""}bookmarked`,
      });
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<BookmarkInfo>(queryKey);

      queryClient.setQueryData<BookmarkInfo>(queryKey, {
        isBookmarkedByLoggedInUser: !previousState?.isBookmarkedByLoggedInUser,
      });

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    },
  });

  return (
    <button
      onClick={() => mutation.mutate()}
      className="flex items-center gap-2"
    >
      <BookmarkIcon
        className={cn(
          "size-5",
          data.isBookmarkedByLoggedInUser && "fill-primary text-primary",
        )}
      />
    </button>
  );
}
