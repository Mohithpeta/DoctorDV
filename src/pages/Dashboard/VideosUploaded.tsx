import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { Play, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import AxiosError for better error handling

interface Video {
  _id: string; // MongoDB ID
  title: string;
  thumbnail: string;
  upload_date: string;
  views: number;
}

const VideosUploaded: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>(''); // Added error state for better feedback

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async (): Promise<void> => {
    const token = localStorage.getItem("token"); // Ensure doctor is authenticated
    try {
      const apiBase = process.env.NODE_ENV === 'development'
        ? 'http://127.0.0.1:8000'
        : 'https://deepvital-backend.onrender.com';

      const response = await axios.get<Video[]>(`${apiBase}/videos`, {
        headers: { Authorization: `Bearer ${token}` }, // Send token to backend
      });
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.detail || 'Failed to fetch videos. Please try again.');
      } else {
        setError('An unexpected error occurred while fetching videos.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    const token = localStorage.getItem('token');
    try {
      const apiBase = process.env.NODE_ENV === 'development'
        ? 'http://127.0.0.1:8000'
        : 'https://deepvital-backend.onrender.com';

      await axios.delete(`${apiBase}/videos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos(videos.filter((video) => video._id !== id)); // Corrected `_id`
    } catch (error) {
      console.error('Error deleting video:', error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.detail || 'Failed to delete video. Please try again.');
      } else {
        setError('An unexpected error occurred while deleting the video.');
      }
    }
  };

  function handlePlay(video: Video): void {
    // Redirect to a video player page or open a modal to play the video
    window.location.href = `/my-dashboard/play-video/${video._id}`;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <div className="p-8">
          {/* Section Title */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[#A32E76] font-bold text-3xl">Videos Uploaded</h2>
            <Link to="/my-dashboard/uploadvideos">
              <button className="bg-[#A32E76] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#931e5c] transition-all text-sm font-medium">
                Upload New Video
              </button>
            </Link>
          </div>

          {/* Responsive Video Grid */}
          {loading ? (
            <p className="text-center text-gray-500">Loading videos...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {videos.map((video) => (
                <div
                  key={video._id} // Corrected `_id`
                  className="relative bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden group hover:shadow-lg transition-all"
                >
                  {/* Thumbnail */}
                  <div className="relative">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => handlePlay(video)}
                        className="bg-[#A32E76] text-white px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                      >
                        <Play className="w-5 h-5" /> Play
                      </button>
                    </div>
                  </div>

                  {/* Video Details */}
                  <div className="p-4">
                    <h3 className="text-gray-900 font-semibold text-base line-clamp-2 mb-2">{video.title}</h3>
                    <div className="text-sm text-gray-500 flex justify-between mb-4">
                      <span>{video.views ? video.views.toLocaleString() : 'N/A'} views</span>
                      <span>{new Date(video.upload_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center">
                      <Link to={`/my-dashboard/edit-video/${video._id}`}>
                        <button
                          className="text-[#A32E76] flex items-center gap-2 hover:text-[#931e5c] transition-all text-sm font-medium"
                        >
                          <Edit className="w-4 h-4" /> Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(video._id)}
                        className="text-red-500 flex items-center gap-2 hover:text-red-600 transition-all text-sm font-medium"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideosUploaded;