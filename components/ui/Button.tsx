import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-blue-500 hover:bg-blue-600 text-white font-semibold",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline:
          "border border-gray-500 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700",
        secondary: "bg-gray-500 text-white hover:bg-gray-600",
        ghost: "hover:bg-gray-100 hover:text-gray-700",
        link: "text-blue-500 underline hover:text-blue-700",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  disabled,
  loading,
  icon,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }), {
        "opacity-50 cursor-not-allowed": disabled || loading,
      })}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="animate-spin mr-2" />}
      {icon && !loading && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

Button.displayName = "Button";

export { Button, buttonVariants };
