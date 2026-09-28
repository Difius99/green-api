import styled from "styled-components";
import { COLORS as _ } from "../../constants";

export const Container = styled.section`
  display: flex;
  width: 50vw;
  height: 100vh;
  background: ${_.backgroundPrimary};
  flex-direction: row;
  gap: 10px;
`;

export const MessagesArea = styled.div`
  border: 1px solid ${_.lightStroke};
  border-radius: 4px;
  background: ${_.white};
  overflow-y: auto;
  flex: 1 0;
`;

export const SideBar = styled.aside`
  display: flex;
  flex-direction: column;
  flex: 0 0 340px;
  padding: 5px;
  gap: 10px;
  background: ${_.white};
`;

export const MessageAreaWrapper = styled.section`
  display: flex;
  flex: 1 0;
  padding: 5px;
  gap: 10px;
  flex-direction: column;
  background: ${_.white};
`;

export const Composer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  gap: 10px;
`;

export const ChatButton = styled.button<{ $active?: boolean }>`
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  border-radius: 4px;

  border: 1px solid ${_.lightStroke};
  background: ${({ $active }) =>
    $active ? _.backgroundSecondary : _.backgroundPure};

  cursor: pointer;
`;

export const ChatsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0;
  margin: 12px 0 0;
  list-style: none;
`;

export const ChatItem = styled.li``;

export const Messages = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 6px;
  padding: 20px;
  overflow-y: auto;
`;

export const Time = styled.span`
  display: block;
  margin-top: 2px;
  font-size: 11px;
  text-align: right;
  opacity: 0.65;
`;

export const Bubble = styled.div<{ $direction: "in" | "out" }>`
  align-self: ${({ $direction }) =>
    $direction === "out" ? "flex-end" : "flex-start"};

  max-width: min(70%, 520px);
  padding: 8px 12px;

  border-radius: 16px;
  border-bottom-right-radius: ${({ $direction }) =>
    $direction === "out" ? "4px" : "16px"};
  border-bottom-left-radius: ${({ $direction }) =>
    $direction === "in" ? "4px" : "16px"};

  background: ${({ $direction }) =>
    $direction === "out" ? _.purple : _.backgroundPure};

  color: ${({ $direction }) => ($direction === "out" ? _.white : _.primary)};

  border: 1px solid
    ${({ $direction }) => ($direction === "out" ? _.purple : _.lightStroke)};

  box-shadow: 0 1px 2px ${_.shadow};

  word-break: break-word;
  white-space: pre-wrap;
`;
