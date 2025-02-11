import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { Play, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Video {
  _id: string;  // MongoDB ID
  title: string;
  thumbnail: string;
  upload_date: string;
  views: number;
}

const VideosUploaded: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const token = localStorage.getItem("token"); // Ensure doctor is authenticated
    try {
      const response = await axios.get("http://127.0.0.1:8000/videos", {
        headers: { Authorization: `Bearer ${token}` }, // Send token to backend
      });
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://127.0.0.1:8000/videos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos(videos.filter((video) => video._id !== id));  // Corrected `_id`
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

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
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {videos.map((video) => (
                <div
                  key={video._id}  // Corrected `_id`
                  className="relative bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden group hover:shadow-lg transition-all"
                >
                  {/* Thumbnail */}
                  <div className="relative">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
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
                      <span>{video.upload_date}</span>  {/* Corrected to `upload_date` */}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center">
                      <button
                        className="text-[#A32E76] flex items-center gap-2 hover:text-[#931e5c] transition-all text-sm font-medium"
                      >
                        <Edit className="w-4 h-4" /> Edit
                      </button>
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
