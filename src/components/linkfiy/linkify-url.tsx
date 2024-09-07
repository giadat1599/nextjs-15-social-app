import { PropsWithChildren } from "react";
import { LinkItUrl } from "react-linkify-it";

export default function LinkifyUrl({ children }: PropsWithChildren) {
  return (
    <LinkItUrl className="text-primary hover:underline">{children}</LinkItUrl>
  );
}
