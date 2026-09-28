import styled from "styled-components";
import { COLORS as _ } from "../../constants";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  padding: 10px;
  gap: 5px;
`;

export const InputsWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

export const ButtonsWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  gap: 5px;
`;

export const HelperText = styled.span<{ $isError: boolean }>`
  font-size: 13px;
  min-height: 16px;

  color: ${_.warning};
  visibility: ${({ $isError }) => ($isError ? "visible" : "hidden")};
`;
