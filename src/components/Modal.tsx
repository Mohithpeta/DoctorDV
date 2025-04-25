
interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onSave: () => void;
}

export function Modal({ title, children, onClose, onSave }: ModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        {children}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-500 border border-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-[#A32E76] text-white rounded-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
