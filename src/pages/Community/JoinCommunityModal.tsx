import React from 'react';

interface JoinCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  communityName: string;
  onConfirm: () => void;
}

const JoinCommunityModal: React.FC<JoinCommunityModalProps> = ({
  isOpen,
  onClose,
  communityName,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const handleJoin = () => {
    console.log(`User joined the community: ${communityName}`);
    onConfirm(); // ✅ Update state in parent
    onClose();   // ✅ Then close modal
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg max-w-md p-6 animate-fadeIn w-auto h-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-2">
          Join {communityName}?
        </h2>
        <p className="text-gray-600 mb-6">
          You will be added to the selected community.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition duration-150"
          >
            Cancel
          </button>
          <button
            onClick={handleJoin}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition duration-150"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinCommunityModal;
