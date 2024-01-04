import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface Props {
  children: ReactNode;
  description: string;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
}

const Hint = ({ children, description, side, sideOffset }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          sideOffset={sideOffset}
          side={side}
          className="max-w-[220px] break-words text-sm"
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Hint;
