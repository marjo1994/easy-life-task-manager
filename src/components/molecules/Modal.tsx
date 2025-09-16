import { type ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-400/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative h-auto w-[65%] rounded-lg bg-neutral-200 p-4 text-neutral-100 shadow-lg lg:min-h-[184px] lg:w-[580px]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};
