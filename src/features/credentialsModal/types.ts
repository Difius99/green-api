import type { GreenApiCredentials } from "../../api/greenApi.types";

export type CredentialsModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  onSaved: (creds: GreenApiCredentials) => void;
};
