import { Button } from "@/components/ui/button";
import { MailPlusIcon, XIcon } from "lucide-react";

interface MenuHeaderProps {
  onClose: () => void;
}

export default function MenuHeader({ onClose }: MenuHeaderProps) {
  return (
    <div className="flex items-center gap-3 p-2">
      <div className="h-full md:hidden">
        <Button size="icon" variant="ghost" onClick={onClose}>
          <XIcon className="size-5" />
        </Button>
      </div>
      <h1 className="me-auto text-xl font-bold md:ms-2">Messages</h1>
      <Button size="icon" variant="ghost" title="Start new chat">
        <MailPlusIcon className="size-5" />
      </Button>
    </div>
  );
}
