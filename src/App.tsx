import { useState } from "react";
import "./App.css";

import CredentialsModal from "./features/credentialsModal/CredentialsModal";
import { GlobalStyle } from "./globalStyle";
import type { GreenApiCredentials } from "./api/greenApi.types";
import { getCreds } from "./utils/storage";
import ChatContainer from "./features/chat/ChatContainer";
import Button from "./components/ui/button/Button";

function App() {
  const [creds, setCreds] = useState<GreenApiCredentials | null>(getCreds);
  const [isOpen, setIsOpen] = useState<boolean>(!creds);

  return (
    <>
      <GlobalStyle />

      {creds && <ChatContainer creds={creds} />}
      <CredentialsModal
        isOpen={isOpen}
        handleClose={() => {
          if (creds) {
            setIsOpen(false);
          }
        }}
        onSaved={(creds: GreenApiCredentials) => {
          setCreds(creds);
          setIsOpen(false);
        }}
      />
      <Button
        fullWidth={true}
        variant="secondary"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Log in
      </Button>
    </>
  );
}

export default App;
