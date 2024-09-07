import { PropsWithChildren } from "react";
import { LinkIt } from "react-linkify-it";
import UserLinkWithTooltip from "../user-link-with-toolip";

export default function LinkifyUsername({ children }: PropsWithChildren) {
  return (
    <LinkIt
      regex={/(@[a-zA-Z0-9_-]+)/}
      component={(match, key) => (
        <UserLinkWithTooltip key={key} username={match.slice(1)}>
          {match}
        </UserLinkWithTooltip>
      )}
    >
      {children}
    </LinkIt>
  );
}
