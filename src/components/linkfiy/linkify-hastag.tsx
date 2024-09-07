import Link from "next/link";
import { PropsWithChildren } from "react";
import { LinkIt } from "react-linkify-it";

export default function LinkifyHashtag({ children }: PropsWithChildren) {
  return (
    <LinkIt
      regex={/(#[a-zA-Z0-9]+)/}
      component={(match, key) => (
        <Link
          key={key}
          href={`/hashtags/${match.slice(1)}`}
          className="text-primary hover:underline"
        >
          {match}
        </Link>
      )}
    >
      {children}
    </LinkIt>
  );
}
