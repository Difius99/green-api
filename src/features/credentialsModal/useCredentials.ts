import { useCallback, useState } from "react";
import { getApiErrorMessage, getStateInstance } from "../../api/greenApi";
import { saveCreds } from "../../utils/storage";
import type { FormValues } from "../credentialsForm/types";

export function useCredentials(onSaved?: (creds: FormValues) => void) {
  const [error, setError] = useState<string | null>(null);

  const resetError = useCallback(() => setError(null), []);

  const handleSubmit = useCallback(
    async (creds: FormValues) => {
      try {
        setError(null);

        const response = await getStateInstance(creds);

        if (response.stateInstance !== "authorized") {
          throw new Error(
            `Инстанс не авторизован: ${response.stateInstance}. Подключите WhatsApp (QR) в кабинете GREEN-API.`,
          );
        }
        saveCreds(creds);
        onSaved?.(creds);
      } catch (error) {
        const message = getApiErrorMessage(error);
        setError(message);
        throw error;
      }
    },
    [onSaved],
  );

  return { error, handleSubmit, resetError };
}
