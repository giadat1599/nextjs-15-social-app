import { Suspense } from "react";
import { WhoToFollow } from "./who-to-follow";
import { Loader2 } from "lucide-react";
import TrendingTopics from "./trending-topics";

export default function TrendingSidebar() {
  return (
    <div className="sticky top-[5.25rem] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80">
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        <WhoToFollow />
        <TrendingTopics />
      </Suspense>
    </div>
  );
}
