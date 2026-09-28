import type { GreenApiCredentials } from "../api/greenApi.types";

const CREDS_KEY = "green_api_creds";

export function saveCreds(creds: GreenApiCredentials) {
  localStorage.setItem(CREDS_KEY, JSON.stringify(creds));
}

export function getCreds(): GreenApiCredentials | null {
  const raw = localStorage.getItem(CREDS_KEY);

  if (!raw) return null;
  try {
    const creds = JSON.parse(raw) as Partial<GreenApiCredentials>;

    if (typeof creds.idInstance !== "string") return null;
    if (typeof creds.apiTokenInstance !== "string") return null;

    return {
      idInstance: creds.idInstance,
      apiTokenInstance: creds.apiTokenInstance,
    };
  } catch (error) {
    return null;
  }
}

export function clearCreds() {
  localStorage.removeItem(CREDS_KEY);
}
