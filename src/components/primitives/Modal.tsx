import React from "react";
import Button from "./Button";

type ModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

/* Responsive modal */
const Modal: React.FC<ModalProps> = ({ open, title, onClose, children }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
    >
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* content */}
      <div
        className="
          relative bg-white rounded-xl shadow-xl z-10
          w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%]
          max-h-[85vh] overflow-y-auto p-4 sm:p-6
        "
      >
        {title && (
          <h2 className="text-base sm:text-lg font-semibold mb-3">{title}</h2>
        )}
        <div className="mb-4 text-sm sm:text-base">{children}</div>
        <div className="flex justify-end">
          <Button
            variant="secondary"
            label="Close"
            onClick={onClose}
            className="text-sm sm:text-base"
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;