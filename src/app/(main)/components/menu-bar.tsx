import { Button } from "@/components/ui/button";
import { BookmarkIcon, HomeIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import NotificationsButton from "./notifications-button";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

interface MenuBarProps {
  className?: string;
}

export default async function MenuBar({ className }: MenuBarProps) {
  const { user } = await validateRequest();

  if (!user) return null;

  const unreadNotificationCount = await prisma.notification.count({
    where: {
      recipientId: user.id,
      read: false,
    },
  });

  return (
    <div className={className}>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link href="/">
          <HomeIcon />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>
      <NotificationsButton
        initialState={{ unreadCount: unreadNotificationCount }}
      />
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Messages"
        asChild
      >
        <Link href="/messages">
          <MailIcon />
          <span className="hidden lg:inline">Messages</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Bookmarks"
        asChild
      >
        <Link href="/bookmarks">
          <BookmarkIcon />
          <span className="hidden lg:inline">Bookmarks</span>
        </Link>
      </Button>
    </div>
  );
}
