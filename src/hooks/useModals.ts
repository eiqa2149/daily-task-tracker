import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

export function useModals() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModals must be used inside <ModalProvider>");
  return ctx;
}
