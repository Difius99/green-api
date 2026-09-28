import type {
  GreenApiNotification,
  IncomingTextMessageBody,
  ParsedTextMessage,
} from "./greenApi.types";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

export function isIncomingTextMessageBody(
  body: unknown,
): body is IncomingTextMessageBody {
  if (!isRecord(body)) return false;

  if (body["typeWebhook"] !== "incomingMessageReceived") return false;

  const senderData = body["senderData"];
  const messageData = body["messageData"];

  if (!isRecord(senderData) || typeof senderData["chatId"] !== "string")
    return false;

  if (!isRecord(messageData) || messageData["typeMessage"] !== "textMessage")
    return false;

  const textMessageData = messageData["textMessageData"];
  if (
    !isRecord(textMessageData) ||
    typeof textMessageData["textMessage"] !== "string"
  )
    return false;

  return true;
}

export function parseIncomingText(
  n: GreenApiNotification,
): ParsedTextMessage | null {
  const { body } = n;

  if (!isIncomingTextMessageBody(body)) return null;

  return {
    chatId: body.senderData.chatId,
    text: body.messageData.textMessageData.textMessage,
    timestamp: body.timestamp,
    senderName: body.senderData.senderName,
  };
}
