import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Check } from 'lucide-react';

interface UploadVideosProps {
  isOpen: boolean;
  onClose: () => void;
  redirectOnClose?: string;
}

interface VideoForm {
  youtubeUrl: string;
  category: string;
  title?: string;
  description?: string;
}

export function UploadVideos({ isOpen, onClose, redirectOnClose }: UploadVideosProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<VideoForm>({
    youtubeUrl: '',
    category: '',
    description: '',
  });
  const [errors, setErrors] = useState<{ youtubeUrl?: string; category?: string }>({});
  const navigate = useNavigate();

  const categories = ['Preconception', 'Pregnancy', 'Postpartum', 'Parenting', 'Mental Health', 'Nutrition'];

  const validateForm = (): boolean => {
    const newErrors: Partial<VideoForm> = {};
    if (!formData.youtubeUrl.trim()) {
      newErrors.youtubeUrl = 'YouTube link is required';
    }
    if (!formData.category.trim()) {
      newErrors.category = 'Please select a category';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
  
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;
  
    if (!token || !user) {
      alert("Authentication error! Please log in again.");
      return;
    }
  
    const payload = {
      youtube_url: formData.youtubeUrl,  // ✅ Matches FastAPI schema
      title: formData.title || "Untitled Video",
      description: formData.description || "No description",
      category: formData.category || "Other",
      // uploaded_by: user.id,  // ✅ Sending doctor’s ID
    };
  
    console.log("Uploading video with data:", payload);  // 🔥 Debugging
  
    try {
      const response = await fetch("https://deepvital-backend.onrender.com/videos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // ✅ Sending token correctly
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Upload failed:", errorData);
        throw new Error(errorData.detail || "Failed to upload video");
      }
  
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Upload failed! Please check console for details.");
    }
  };
  
  
  

  const handleClose = () => {
    onClose();
    if (redirectOnClose) {
      navigate(redirectOnClose);
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
              Video submitted successfully
            </h3>
          </div>
        ) : (
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upload YouTube Video</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Link</label>
                <input
                  type="text"
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all"
                  placeholder="Paste YouTube video link here"
                />
                {errors.youtubeUrl && <p className="mt-1 text-sm text-red-500">{errors.youtubeUrl}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all"
                  placeholder="Write a short description (optional)"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 bg-[#5E17EB] text-white rounded-lg hover:bg-[#8E2968] transition-colors font-medium"
              >
                Submit Video
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
