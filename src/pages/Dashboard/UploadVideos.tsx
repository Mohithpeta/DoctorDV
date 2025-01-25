import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Upload, Check } from 'lucide-react';

interface UploadVideosProps {
  isOpen: boolean;
  onClose: () => void;
  redirectOnClose?: string; // Add this prop for conditional routing
}

interface VideoForm {
  title: string;
  category: string;
  file: File | null; // 'File' for video file, default is null
}

export function UploadVideos({ isOpen, onClose, redirectOnClose }: UploadVideosProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<VideoForm>({
    title: '',
    category: '',
    file: null,
  });
  const [errors, setErrors] = useState<Partial<VideoForm>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const categories = [
    'Preconception',
    'Pregnancy',
    'Postpartum',
    'Parenting',
    'Mental Health',
    'Nutrition',
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<VideoForm> = {};
    if (!formData.title || formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    if (!formData.file) {
      newErrors.file = 'Please select a video file';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]; // Capture selected file
    if (selectedFile) {
      const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo']; // Supported formats
      if (!validTypes.includes(selectedFile.type)) {
        setErrors({ ...errors, file: 'Please select a valid video file (mp4, mov, or avi)' });
        return;
      }
      if (selectedFile.size > 100 * 1024 * 1024) {
        setErrors({ ...errors, file: 'File size must be less than 100MB' });
        return;
      }

      // Set file only if valid
      setFormData((prev) => ({ ...prev, file: selectedFile }));
      setErrors({ ...errors, file: undefined }); // Clear file errors
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate submission success
      setTimeout(() => {
        setIsSubmitted(true);
      }, 500);
    }
  };

  const handleClose = () => {
    onClose();
    if (redirectOnClose) {
      navigate(redirectOnClose); // Redirect based on the passed prop
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-[500px] relative">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {isSubmitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Video submitted successfully for admin approval
            </h3>
          </div>
        ) : (
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upload Your Video</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32E76] focus:border-transparent transition-all"
                  placeholder="Enter Title"
                />
                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A32E76] focus:border-transparent transition-all"
                >
                  <option value="">Choose video category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
              </div>

              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".mp4,.mov,.avi"
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#A32E76] transition-all"
                >
                  {formData.file ? (
  <div className="text-gray-600">
    <Check className="w-8 h-8 mx-auto mb-2 text-green-500" />
    <p>{formData.file.name}</p> {/* Display file name here */}
  </div>


                  ) : (
                    <div className="text-gray-500">
                      <Upload className="w-10 h-10 mx-auto mb-2 text-[#A32E76]" />
                      <p className="text-sm">Drag and drop video files to upload</p>
                      <button
                        type="button"
                        className="mt-2 px-4 py-2 text-sm bg-[#A32E76] text-white rounded-full hover:bg-[#8E2968] transition-colors"
                      >
                        Select Files
                      </button>
                    </div>
                  )}
                </div>
                {errors.file && <p className="mt-1 text-sm text-red-500">{errors.file}</p>}
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 bg-[#A32E76] text-white rounded-lg hover:bg-[#8E2968] transition-colors font-medium"
              >
                Submit for admin approval
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
