import { useEffect, useRef } from "react";
import MaskedInput from "../../components/ui/input/MaskedInput";
import { Input } from "../../components/ui/input/Input";
import Button from "../../components/ui/button/Button";
import { SendIcon } from "../../components/icons/Send";
import type { ChatViewProps } from "./types";
import {
  Bubble,
  ChatButton,
  ChatItem,
  ChatsList,
  Composer,
  Container,
  MessageAreaWrapper,
  Messages,
  MessagesArea,
  SideBar,
  Time,
} from "./styled";

const formatTime = (ts: number) =>
  new Date(ts).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

export default function ChatView({
  phone,
  addChatError,
  chats,
  activeChatId,
  activeMessages,
  text,
  composerDisabled,
  isSending,
  sendError,
  receiveError,
  onPhoneChange,
  onTextChange,
  onAddChat,
  onSelectChat,
  onSend,
}: ChatViewProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChatId, activeMessages.length]);

  return (
    <Container>
      <SideBar>
        <MaskedInput
          label="Номер телефона"
          maskVariant="phone"
          isValidate={true}
          value={phone}
          onChange={onPhoneChange}
          helperText={addChatError}
          status={addChatError ? "error" : "default"}
        />

        <Button variant="secondary" fullWidth onClick={onAddChat}>
          Добавить чат
        </Button>

        <ChatsList>
          {chats.map((chat) => (
            <ChatItem key={chat.chatId}>
              <ChatButton
                type="button"
                $active={chat.chatId === activeChatId}
                onClick={() => onSelectChat(chat.chatId)}
              >
                {chat.phone}
              </ChatButton>
            </ChatItem>
          ))}
        </ChatsList>
      </SideBar>

      <MessageAreaWrapper>
        <MessagesArea>
          <Messages>
            {activeMessages.map((m) => (
              <Bubble key={m.id} $direction={m.direction}>
                {m.text}
                <Time>{formatTime(m.ts)}</Time>
              </Bubble>
            ))}
            <div ref={bottomRef} />
          </Messages>
        </MessagesArea>

        <Composer>
          <Input
            placeholder={
              composerDisabled ? "Сначала выберите чат" : "Введите сообщение..."
            }
            disabled={composerDisabled}
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
          />
          <Button
            variant="secondary"
            fullWidth={false}
            disabled={composerDisabled || !text.trim() || isSending}
            onClick={onSend}
          >
            <SendIcon />
          </Button>
        </Composer>

        {sendError ? <div>{sendError}</div> : null}
        {receiveError ? <div>{receiveError}</div> : null}
      </MessageAreaWrapper>
    </Container>
  );
}
