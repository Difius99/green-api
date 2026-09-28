import { useEffect } from "react";
import type { ModalProps } from "./types";
import { createPortal } from "react-dom";
import { Backdrop, Body } from "./styled";

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <Backdrop onMouseDown={onClose}>
      <Body
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </Body>
    </Backdrop>,
    document.body,
  );
}
