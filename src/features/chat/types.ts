import type { GreenApiCredentials } from "../../api/greenApi.types";

export type ChatMessage = {
  id: string;
  chatId: string;
  direction: "in" | "out";
  text: string;
  ts: number;
  senderName?: string;
  status?: "sending" | "sent" | "failed";
};

export type ChatDialog = {
  chatId: string;
  title: string;
  messages: ChatMessage[];
};

export type ChatContainerProps = {
  creds: GreenApiCredentials;
};

export type ChatPreview = {
  chatId: string;
  phone: string;
};

export type IncomingText = {
  chatId: string;
  text: string;
  timestamp?: number;
  senderName?: string;
};

export type ChatViewProps = {
  phone: string;
  addChatError: string;
  chats: ChatPreview[];
  activeChatId: string | null;
  activeMessages: ChatMessage[];
  text: string;
  composerDisabled: boolean;
  isSending: boolean;
  sendError: string | null;
  receiveError: string | null;
  onPhoneChange: (v: string) => void;
  onTextChange: (v: string) => void;
  onAddChat: () => void;
  onSelectChat: (chatId: string) => void;
  onSend: () => void;
};

export type MessagesByChat = Record<string, ChatMessage[]>;
