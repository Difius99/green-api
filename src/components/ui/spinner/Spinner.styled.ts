import styled, { keyframes } from "styled-components";
import { COLORS as _ } from "../../../constants";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid color-mix(in srgb, ${_.white} 40%, transparent);
  border-top-color: ${_.white};
  animation: ${spin} 0.6s linear infinite;
`;
