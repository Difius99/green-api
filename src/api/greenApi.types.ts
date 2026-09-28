export type GreenApiCredentials = {
  idInstance: string;
  apiTokenInstance: string;
};

export type SendMessageResponse = {
  idMessage: string;
};

export type DeleteNotificationResponse = {
  result: boolean;
};

export type GreenApiNotification = {
  receiptId: number;
  body: unknown;
};

export type ParsedTextMessage = {
  chatId: string;
  text: string;
  timestamp?: number;
  senderName?: string;
};

export type GreenApiErrorResponse = {
  message?: string;
};

export type GreenApiMessage = {
  creds: GreenApiCredentials;
  chatId: string;
  message: string;
};

export type GetStateInstanceResponse = {
  stateInstance: string;
};

export type IncomingTextMessageBody = {
  typeWebhook: "incomingMessageReceived";
  timestamp?: number;
  senderData: {
    chatId: string;
    senderName?: string;
  };
  messageData: {
    typeMessage: "textMessage";
    textMessageData: {
      textMessage: string;
    };
  };
};
