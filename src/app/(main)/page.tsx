import PostEditor from "../../components/posts/editor/post-editor";

import TrendingSidebar from "@/components/trending-sidebar/trending-sidebar";
import ForYouFeed from "./components/for-you-feed";

export default function Home() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <ForYouFeed />
      </div>
      <TrendingSidebar />
    </main>
  );
}
