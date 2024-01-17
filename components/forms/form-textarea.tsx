"use client";

import { KeyboardEventHandler, forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";
import { useFormStatus } from "react-dom";

interface Props {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      id,
      className,
      defaultValue,
      disabled,
      errors,
      label,
      onBlur,
      onClick,
      onKeyDown,
      placeholder,
      required,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="w-full space-y-2">
        <div className="space-y-1" w-ful>
          <Label
            htmlFor={id}
            className="text-sm font-semibold text-neutral-700"
          >
            {label}
          </Label>
          <Textarea
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onClick={onClick}
            ref={ref}
            placeholder={placeholder}
            id={id}
            name={id}
            required={required}
            disabled={pending || disabled}
            className={cn(
              "rin-0 resize-none shadow-sm outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0",
              className
            )}
            aria-describedby={`${id}-error`}
            defaultValue={defaultValue}
          />
          <FormErrors id={id} errors={errors} />
        </div>
      </div>
    );
  }
);
