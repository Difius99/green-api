import axios, { AxiosError } from "axios";
import type {
  GetStateInstanceResponse,
  GreenApiCredentials,
  GreenApiErrorResponse,
  GreenApiMessage,
  GreenApiNotification,
  SendMessageResponse,
} from "./greenApi.types";

const http = axios.create({
  baseURL: "https://api.green-api.com",
  timeout: 15000,
});

function instancePrefix(creds: GreenApiCredentials) {
  return `/waInstance${creds.idInstance}`;
}

function withToken(creds: GreenApiCredentials, path: string) {
  return `${instancePrefix(creds)}${path}/${creds.apiTokenInstance}`;
}

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const e = error as AxiosError<GreenApiErrorResponse>;
    const data = e.response?.data;
    if (
      data &&
      typeof data === "object" &&
      "message" in data &&
      typeof data.message === "string"
    ) {
      return data.message;
    }

    if (typeof data === "string") {
      return data;
    }

    return e.message || "Request failed";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
}

export async function sendMessage({ creds, chatId, message }: GreenApiMessage) {
  const url = withToken(creds, "/sendMessage");
  const data = await http.post<SendMessageResponse>(url, { chatId, message });
  return data;
}

export async function receiveNotification(
  creds: GreenApiCredentials,
): Promise<GreenApiNotification | null> {
  const url = withToken(creds, "/receiveNotification");
  const { data } = await http.get<GreenApiNotification | null>(url);
  return data;
}

export async function deleteNotification(
  creds: GreenApiCredentials,
  receiptId: number,
): Promise<{ result: boolean }> {
  const url = `${withToken(creds, "/deleteNotification")}/${receiptId}`;
  const { data } = await http.delete<{ result: boolean }>(url);
  return data;
}

export async function getStateInstance(
  creds: GreenApiCredentials,
): Promise<GetStateInstanceResponse> {
  const url = withToken(creds, "/getStateInstance");
  const { data } = await http.get<GetStateInstanceResponse>(url);
  return data;
}
