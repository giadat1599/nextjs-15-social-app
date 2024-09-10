"use client";

import { LikeInfo } from "@/lib/types";
import { useToast } from "./ui/use-toast";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { HeartIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  postId: string;
  initialState: LikeInfo;
}
export default function LikeButton({ postId, initialState }: LikeButtonProps) {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const queryKey: QueryKey = ["like-info", postId];

  const { data } = useQuery({
    queryKey,
    queryFn: () =>
      kyInstance.get(`/api/posts/${postId}/likes`).json<LikeInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  });

  const mutation = useMutation({
    mutationFn: () => {
      if (data.isLikedByLoggedInUser) {
        return kyInstance.delete(`/api/posts/${postId}/likes`);
      } else {
        return kyInstance.post(`/api/posts/${postId}/likes`);
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<LikeInfo>(queryKey);

      queryClient.setQueryData<LikeInfo>(queryKey, {
        likes:
          (previousState?.likes || 0) +
          (previousState?.isLikedByLoggedInUser ? -1 : 1),
        isLikedByLoggedInUser: !previousState?.isLikedByLoggedInUser,
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
      <HeartIcon
        className={cn(
          "size-5",
          data.isLikedByLoggedInUser && "fill-red-500 text-red-500",
        )}
      />
      <span className="text-sm font-medium tabular-nums">
        {data.likes} <span className="hidden sm:inline">likes</span>
      </span>
    </button>
  );
}
