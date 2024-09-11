"use client";

import UserAvatar from "@/components/user-avatar";
import { PostData } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";
import Link from "next/link";
import { useSession } from "../providers/session-provider";
import PostMoreButton from "./post-more-button";
import Linkify from "../linkfiy/linkify";
import UserTooltip from "../user-tooltip";
import MediasPreview from "./medias-preview/medias-preview";
import LikeButton from "../like-button";
import BookmarkButton from "../bookmark-button";
import { useState } from "react";
import CommentButton from "../comments/comment-button";
import Comments from "../comments/comments";

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  const { user } = useSession();
  const [showComments, setShowComments] = useState(false);
  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <UserTooltip user={post.user}>
            <Link href={`/users/${post.user.username}`}>
              <UserAvatar avatarUrl={post.user.avatarUrl} />
            </Link>
          </UserTooltip>
          <div>
            <UserTooltip user={post.user}>
              <Link
                href={`/users/${post.user.username}`}
                className="block font-medium hover:underline"
              >
                {post.user.displayName}
              </Link>
            </UserTooltip>

            <Link
              href={`/posts/${post.id}`}
              className="block text-sm text-muted-foreground hover:underline"
              suppressHydrationWarning
            >
              {formatRelativeDate(post.createdAt)}
            </Link>
          </div>
        </div>
        {post.user.id === user.id && (
          <PostMoreButton
            post={post}
            className="opacity-0 transition-opacity group-hover/post:opacity-100"
          />
        )}
      </div>
      <Linkify>
        <div className="whitespace-pre-line break-words">{post.content}</div>
      </Linkify>
      {!!post.attachments.length && <MediasPreview medias={post.attachments} />}
      <hr className="text-muted-foreground" />
      <div className="flex justify-between gap-5">
        <div className="flex items-center gap-5">
          <LikeButton
            postId={post.id}
            initialState={{
              likes: post._count.likes,
              isLikedByLoggedInUser: post.likes.some(
                ({ userId }) => userId === user.id,
              ),
            }}
          />
          <CommentButton
            post={post}
            onClick={() => setShowComments(!showComments)}
          />
        </div>
        <BookmarkButton
          postId={post.id}
          initialState={{
            isBookmarkedByLoggedInUser: post.bookmarks.some(
              ({ userId }) => userId === user.id,
            ),
          }}
        />
      </div>
      {showComments && <Comments post={post} />}
    </article>
  );
}
