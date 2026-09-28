import Modal from "../../components/ui/modal/Modal";
import CredentialsForm from "../credentialsForm/CredentialsForm";
import type { CredentialsModalProps } from "./types";
import { useCredentials } from "./useCredentials";

export default function CredentialsModal({
  isOpen,
  handleClose,
  onSaved,
}: CredentialsModalProps) {
  const { error, handleSubmit } = useCredentials(onSaved);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <CredentialsForm
        serverError={error}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}
