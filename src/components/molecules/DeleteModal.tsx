import { createPortal } from "react-dom";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  error?: string;
};

export const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  error,
  loading,
}: DeleteModalProps) => {
  if (!isOpen) return null;
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-400/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="h-[189px] w-[279px] rounded-[14px] bg-neutral-200">
        <div className="flex flex-col items-center justify-center px-6 py-5">
          <h1 className="text-body-l font-semibold text-neutral-50">
            Delete Task
          </h1>
          <p className="text-body-s text-center font-normal text-neutral-50">
            Are you sure you want to delete this task?
          </p>
          {error && (
            <p className="text-body-s text-primary-300 mt-2 text-center">
              {error}
            </p>
          )}
        </div>

        <div className="flex flex-row justify-around border-t border-t-neutral-100">
          <button
            type="button"
            className="text-body-s p-3 text-blue-200"
            onClick={onClose}
          >
            Go Back
          </button>
          <button
            type="button"
            className="text-body-s p-3 text-blue-200"
            onClick={onConfirm}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
