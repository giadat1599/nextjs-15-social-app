import { cn } from "@/lib/utils";
import { Attachment } from "../../hooks/useMediaUpload";
import AttachmentPreview from "./attachment-preview";
import { memo } from "react";

interface AttachmentsPreviewProps {
  attachments: Attachment[];
  removeAttachment: (filename: string) => void;
}

function AttachmentsPreview({
  attachments,
  removeAttachment,
}: AttachmentsPreviewProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2",
      )}
    >
      {attachments.map((attachment) => (
        <AttachmentPreview
          key={attachment.file.name}
          attachment={attachment}
          onRemoveClick={() => {
            removeAttachment(attachment.file.name);
          }}
        />
      ))}
    </div>
  );
}

export default memo(AttachmentsPreview);
