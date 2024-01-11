"use client";

import { ReactNode } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "primary";
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant = "primary",
}: Props) => {
  return (
    <Button
      disabled={disabled}
      className={cn(className)}
      type="submit"
      variant={variant}
    >
      {children}
    </Button>
  );
};
