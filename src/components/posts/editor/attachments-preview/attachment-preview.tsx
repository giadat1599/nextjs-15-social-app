import { cn } from "@/lib/utils";
import { Attachment } from "../../hooks/useMediaUpload";
import Image from "next/image";
import { XIcon } from "lucide-react";

interface AttachmentPreviewProps {
  attachment: Attachment;
  onRemoveClick: () => void;
}

export default function AttachmentPreview({
  attachment: { file, isUploading },
  onRemoveClick,
}: AttachmentPreviewProps) {
  const src = URL.createObjectURL(file);

  return (
    <div
      className={cn("relative mx-auto size-fit", isUploading && "opacity-50")}
    >
      {file.type.startsWith("image") && (
        <Image
          src={src}
          alt="Attachment preview"
          width={500}
          height={500}
          className="size-fit max-h-[30rem] rounded-2xl"
        />
      )}
      {file.type.startsWith("video") && (
        <video controls className="rounde-2xl size-fit max-h-[30rem]">
          <source src={src} type={file.type} />
        </video>
      )}
      {!isUploading && (
        <button
          onClick={onRemoveClick}
          className="absolute right-3 top-3 rounded-full bg-foreground p-1.5 text-background transition-colors hover:bg-foreground/60"
        >
          <XIcon size={20} />
        </button>
      )}
    </div>
  );
}
