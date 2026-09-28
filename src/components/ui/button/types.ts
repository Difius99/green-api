import type React from "react";

export type ButtonIconPosition = "start" | "end";
export type ButtonSize = "s" | "m" | "l";
export type ButtonVariant = "primary" | "secondary";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  variant: ButtonVariant;
  iconPosition?: ButtonIconPosition;
  isLoading?: boolean;
  fullWidth: boolean;
  icon?: React.ReactNode;
};

export type ButtonStyledProps = {
  $size: ButtonSize;
  $variant: ButtonVariant;
  $iconPosition?: ButtonIconPosition;
  $isLoading?: boolean;
  $fullWidth?: boolean;
  $hasIcon?: boolean;
};
