"use client";

import * as React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
import { cn } from "@/lib/utils";

export interface ButtonProps extends Omit<MuiButtonProps, "variant" | "size"> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild,
      children,
      ...props
    },
    ref,
  ) => {
    // Map custom variants to MUI variants
    let muiVariant: "contained" | "outlined" | "text" = "contained";
    let color: MuiButtonProps["color"] = "primary";

    switch (variant) {
      case "outline":
        muiVariant = "outlined";
        break;
      case "destructive":
        muiVariant = "contained";
        color = "error";
        break;
      case "secondary":
        muiVariant = "contained";
        color = "secondary";
        break;
      case "ghost":
        muiVariant = "text";
        break;
      case "link":
        muiVariant = "text";
        break;
      default:
        muiVariant = "contained";
        color = "primary";
    }

    // Map custom sizes to MUI sizes
    let muiSize: MuiButtonProps["size"] = "medium";
    if (size === "sm") muiSize = "small";
    if (size === "lg") muiSize = "large";

    return (
      <MuiButton
        ref={ref}
        variant={muiVariant}
        color={color}
        size={muiSize}
        className={cn(
          variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
          variant === "link" && "underline-offset-4 hover:underline",
          size === "icon" && "min-w-0 p-2 rounded-[5px]",
          className,
        )}
        sx={{
          textTransform: "none",
          fontWeight: 600,
          borderRadius: variant === "link" ? 0 : 1,
          ...(variant === "link" && {
            padding: 0,
            minWidth: 0,
            "&:hover": {
              background: "transparent",
              textDecoration: "underline",
            },
          }),
        }}
        {...props}
      >
        {children}
      </MuiButton>
    );
  },
);
Button.displayName = "Button";

export { Button };
