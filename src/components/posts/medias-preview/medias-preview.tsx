import { cn } from "@/lib/utils";
import { Media } from "@prisma/client";
import MediaPreview from "./media-preview";

interface MediasPreviewProps {
  medias: Media[];
}

export default function MediasPreview({ medias }: MediasPreviewProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        medias.length > 1 && "sm:grid sm:grid-cols-2",
      )}
    >
      {medias.map((media) => (
        <MediaPreview key={media.id} media={media} />
      ))}
    </div>
  );
}
