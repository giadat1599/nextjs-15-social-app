import { validateRequest } from "@/auth";
import SessionProvider from "@/components/providers/session-provider";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import Navbar from "./components/navbar";

export default async function MainLayout({ children }: PropsWithChildren) {
  const session = await validateRequest();

  if (!session.user) redirect("/login");

  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="mx-auto max-w-7xl p-5">{children}</div>
      </div>
    </SessionProvider>
  );
}
