import { cn } from "@/lib/utils";
import { type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export function Input({ className, error, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full px-3.5 py-[0.7rem] bg-bg-input border border-border",
        "text-text-primary font-body text-[0.85rem] outline-none",
        "transition-[border-color] duration-300",
        "placeholder:text-text-muted",
        "focus:border-accent",
        error && "border-rose",
        className,
      )}
      {...props}
    />
  );
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full px-3.5 py-[0.7rem] bg-bg-input border border-border",
        "text-text-primary font-body text-[0.85rem] outline-none",
        "transition-[border-color] duration-300 resize-y min-h-[120px] leading-relaxed",
        "placeholder:text-text-muted",
        "focus:border-accent",
        className,
      )}
      {...props}
    />
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children: React.ReactNode;
};

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "w-full px-3.5 py-[0.7rem] pr-10 bg-bg-input border border-border",
        "text-text-primary font-body text-[0.85rem] outline-none",
        "transition-[border-color] duration-300 cursor-pointer",
        "appearance-none",
        "bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2710%27%20height%3D%276%27%20viewBox%3D%270%200%2010%206%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M1%201L5%205L9%201%27%20stroke%3D%27%236b6560%27%20stroke-width%3D%271.5%27%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_0.9rem_center]",
        "focus:border-accent",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

type LabelProps = {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
};

export function Label({ children, htmlFor, className }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-[0.68rem] font-medium uppercase tracking-[0.15em] text-text-muted",
        className,
      )}
    >
      {children}
    </label>
  );
}
