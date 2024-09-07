import { PropsWithChildren } from "react";
import LinkifyUrl from "./linkify-url";
import LinkifyUsername from "./linkify-username";
import LinkifyHashtag from "./linkify-hastag";

export default function Linkify({ children }: PropsWithChildren) {
  return (
    <LinkifyUsername>
      <LinkifyHashtag>
        <LinkifyUrl>{children}</LinkifyUrl>
      </LinkifyHashtag>
    </LinkifyUsername>
  );
}
