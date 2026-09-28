import { useCallback, useState } from "react";
import type { GreenApiCredentials } from "../../../api/greenApi.types";
import { getApiErrorMessage, sendMessage } from "../../../api/greenApi";

export function useSendTextMessage(creds: GreenApiCredentials) {
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const resetError = useCallback(() => setError(null), []);

  const sendText = useCallback(
    async (chatId: string, message: string) => {
      setError(null);
      setIsSending(true);
      try {
        await sendMessage({ creds, chatId, message });
      } catch (e) {
        const msg = getApiErrorMessage(e);
        setError(msg);
        throw e;
      } finally {
        setIsSending(false);
      }
    },
    [creds],
  );

  return { sendText, error, isSending, resetError };
}
