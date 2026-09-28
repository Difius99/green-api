import styled, { css } from "styled-components";
import type { ButtonStyledProps } from "./types";
import { COLORS as _ } from "../../../constants";

const sizeStyles = {
  s: css`
    max-height: 32px;
    min-width: 70px;
    font-size: 15px;
  `,
  m: css`
    min-height: 42px;
    min-width: 70px;
    font-size: 15px;
  `,
  l: css`
    min-height: 42px;
    min-width: 142px;
    font-size: 15px;
  `,
} as const;

const variantStyles = {
  primary: css`
    background-color: ${_.purple};
    color: ${_.backgroundPure};
    &:hover:not(:disabled) {
      background-color: ${_.darkPurple};
    }
  `,
  secondary: css`
    background-color: ${_.backgroundSecondary};
    color: ${_.primary};
    &:hover:not(:disabled) {
      background-color: ${_.lightStroke};
    }
  `,
} as const;

export const ButtonStyledComponent = styled.button.attrs<ButtonStyledProps>(
  (props) => ({
    type: (props as any).type ?? "button",
  }),
)<ButtonStyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 8px;
  margin: 0;
  border-radius: 4px;
  font-weight: 500;

  cursor: pointer;
  outline: none;
  border: none;

  transition: all 0.3s;

  ${({ $size }) => sizeStyles[$size]};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  ${({ $isLoading }) =>
    $isLoading &&
    css`
      cursor: default;
      pointer-events: none;
    `}
  ${({ $variant }) => variantStyles[$variant]};

  ${({ $hasIcon }) =>
    $hasIcon &&
    css`
      & > svg {
        flex-shrink: 0;
      }
    `}

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;
