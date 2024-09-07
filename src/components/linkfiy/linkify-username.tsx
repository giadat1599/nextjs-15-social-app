import Link from "next/link";
import { PropsWithChildren } from "react";
import { LinkIt } from "react-linkify-it";

export default function LinkifyUsername({ children }: PropsWithChildren) {
  return (
    <LinkIt
      regex={/(@[a-zA-Z0-9_-]+)/}
      component={(match, key) => (
        <Link
          key={key}
          href={`/users/${match.slice(1)}`}
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
