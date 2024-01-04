"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";

interface Props {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      label,
      className,
      defaultValue = "",
      disabled,
      errors,
      onBlur,
      placeholder,
      required,
      type,
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label && (
            <Label
              htmlFor={id}
              className="text-sm font-semibold text-neutral-700"
            >
              {label}
            </Label>
          )}
          <Input
            onBlur={onBlur}
            name={id}
            required={required}
            disabled={disabled}
            defaultValue={defaultValue}
            id={id}
            placeholder={placeholder}
            type={type}
            className={cn(className, "h-7 px-2 py-1 text-sm")}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
