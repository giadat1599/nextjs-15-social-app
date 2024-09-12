import { Metadata } from "next";
import Chat from "./components/chat";

export const metadata: Metadata = {
  title: "Messages",
};

export default function Page() {
  return <Chat />;
}
