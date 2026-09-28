import { useState, useRef, useEffect } from "react";
import {
  receiveNotification,
  deleteNotification,
  getApiErrorMessage,
} from "../../../api/greenApi";
import { parseIncomingText } from "../../../api/greenApi.parsers";
import type { GreenApiCredentials } from "../../../api/greenApi.types";
import type { IncomingText } from "../types";

export function useReceiveTextMessages(params: {
  creds: GreenApiCredentials;
  enabled: boolean;
  intervalMs?: number;
  onMessage: (m: IncomingText) => void;
}) {
  const { creds, enabled, intervalMs = 1500, onMessage } = params;

  const [error, setError] = useState<string | null>(null);
  const runningRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let timer = 0;

    const tick = async () => {
      if (cancelled) return;

      if (runningRef.current) {
        timer = window.setTimeout(tick, intervalMs);
        return;
      }

      runningRef.current = true;

      try {
        setError(null);

        while (!cancelled) {
          const n = await receiveNotification(creds);
          if (!n) break;

          const parsed = parseIncomingText(n);

          await deleteNotification(creds, n.receiptId);

          if (parsed) onMessage(parsed);
        }
      } catch (e) {
        setError(getApiErrorMessage(e));
      } finally {
        runningRef.current = false;
        if (!cancelled) timer = window.setTimeout(tick, intervalMs);
      }
    };

    tick();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      runningRef.current = false;
    };
  }, [
    creds.idInstance,
    creds.apiTokenInstance,
    enabled,
    intervalMs,
    onMessage,
  ]);

  return { error };
}
