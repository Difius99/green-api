import { styled } from "styled-components";
import { COLORS as _ } from "../../../constants";

export const Backdrop = styled.div`
  display: flex;
  position: fixed;
  inset: 0;
  background: color-mix(in srgb, ${_.black} 45%, transparent);
  align-items: center;
  justify-content: center;
`;

export const Body = styled.div`
  display: flex;
  justify-content: center;
  background: ${_.white};
  border-radius: 12px;
  padding: 20px;
`;
