import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { generateLogMessage } from "@/services/audit-log/generate-log-message";
import { AuditLog } from "@prisma/client";
import { format } from "date-fns";
interface Props {
  auditLog: AuditLog;
}

export const ActivityItem = ({ auditLog }: Props) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={auditLog.userImage} />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold lowercase text-neutral-700">
            {auditLog.username}
          </span>{" "}
          {generateLogMessage(auditLog)}
        </p>
        <p className="text-xs text-muted-foreground">
          {format(auditLog.createdAt, "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  );
};
