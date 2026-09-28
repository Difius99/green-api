import { useCallback, useMemo, useState } from "react";
import { useReceiveTextMessages, useSendTextMessage } from "./hooks";
import type {
  ChatContainerProps,
  ChatMessage,
  ChatPreview,
  MessagesByChat,
} from "./types";
import ChatView from "./ChatView";

function uid() {
  return "randomUUID" in crypto
    ? crypto.randomUUID()
    : String(Date.now() + Math.random());
}

export default function ChatContainer({ creds }: ChatContainerProps) {
  const [phone, setPhone] = useState("");
  const [addChatError, setAddChatError] = useState("");

  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const [messagesByChat, setMessagesByChat] = useState<MessagesByChat>({});
  const [text, setText] = useState("");

  const activeMessages = useMemo<ChatMessage[]>(
    () => (activeChatId ? (messagesByChat[activeChatId] ?? []) : []),
    [messagesByChat, activeChatId],
  );

  const { sendText, error: sendError, isSending } = useSendTextMessage(creds);

  const onIncoming = useCallback(
    (m: { chatId: string; text: string; timestamp?: number }) => {
      setChats((prev) => {
        if (prev.some((c) => c.chatId === m.chatId)) return prev;
        return [
          ...prev,
          { chatId: m.chatId, phone: m.chatId.replace("@c.us", "") },
        ];
      });

      const ts =
        typeof m.timestamp === "number" ? m.timestamp * 1000 : Date.now();

      setMessagesByChat((prev) => ({
        ...prev,
        [m.chatId]: [
          ...(prev[m.chatId] ?? []),
          { id: uid(), chatId: m.chatId, direction: "in", text: m.text, ts },
        ],
      }));
    },
    [],
  );

  const { error: receiveError } = useReceiveTextMessages({
    creds,
    enabled: true,
    onMessage: onIncoming,
  });

  const onPhoneChange = useCallback(
    (v: string) => {
      setPhone(v);
      if (addChatError) setAddChatError("");
    },
    [addChatError],
  );

  const onAddChat = useCallback(() => {
    if (phone.length !== 11) {
      setAddChatError("Введите номер полностью");
      return;
    }

    const chatId = `${phone}@c.us`;

    setChats((prev) =>
      prev.some((c) => c.chatId === chatId)
        ? prev
        : [...prev, { chatId, phone }],
    );
    setActiveChatId(chatId);
    setPhone("");
    setAddChatError("");
  }, [phone]);

  const onSelectChat = useCallback((chatId: string) => {
    setActiveChatId(chatId);
    setText("");
  }, []);

  const onSend = useCallback(async () => {
    if (!activeChatId) return;

    const message = text.trim();
    if (!message) return;

    setText("");

    setMessagesByChat((prev) => ({
      ...prev,
      [activeChatId]: [
        ...(prev[activeChatId] ?? []),
        {
          id: uid(),
          chatId: activeChatId,
          direction: "out",
          text: message,
          ts: Date.now(),
        },
      ],
    }));

    try {
      await sendText(activeChatId, message);
    } catch {}
  }, [activeChatId, text, sendText]);

  return (
    <ChatView
      phone={phone}
      addChatError={addChatError}
      chats={chats}
      activeChatId={activeChatId}
      activeMessages={activeMessages}
      text={text}
      composerDisabled={!activeChatId}
      isSending={isSending}
      sendError={sendError}
      receiveError={receiveError}
      onPhoneChange={onPhoneChange}
      onTextChange={setText}
      onAddChat={onAddChat}
      onSelectChat={onSelectChat}
      onSend={onSend}
    />
  );
}
