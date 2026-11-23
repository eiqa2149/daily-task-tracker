import Modal from "./Modal";

interface Props {
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeleteConfirmModal({ onConfirm, onClose }: Props) {
  return (
    <Modal title="Delete this task?" onClose={onClose}>
      <p className="mt-2 text-center text-[15px]">
        Are you sure you want to delete this task? This action cannot be undone.
      </p>
      <div className="mt-5 flex justify-center gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-rose bg-offwhite px-6 py-2 transition hover:-translate-y-0.5"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-full bg-red-700 px-6 py-2 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-red-800"
        >
          Delete Task
        </button>
      </div>
    </Modal>
  );
}
