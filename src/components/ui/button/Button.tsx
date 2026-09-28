import { Spinner } from "../spinner/Spinner.styled";
import { ButtonStyledComponent } from "./styled";
import type { ButtonProps } from "./types";

export default function Button({
  size = "m",
  variant = "primary",
  fullWidth,
  iconPosition = "start",
  isLoading,
  icon,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <ButtonStyledComponent
      $size={size}
      $variant={variant}
      $fullWidth={fullWidth}
      $iconPosition={iconPosition}
      $isLoading={isLoading}
      $hasIcon={!!icon}
      disabled={disabled || isLoading}
      {...rest}
    >
      {iconPosition === "start" && icon}
      {isLoading ? <Spinner /> : children}
      {iconPosition === "end" && icon}
    </ButtonStyledComponent>
  );
}
