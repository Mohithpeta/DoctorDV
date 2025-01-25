import React from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Header } from '../../components/Header';
import { Play, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  uploadDate: string;
  views: number;
}

interface VideoGridProps {
  videos: Video[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onPlay?: (id: string) => void;
  type: 'uploaded' | 'liked' | 'history' | 'playlist';
}

const VideosUploaded: React.FC<VideoGridProps> = ({ videos, onPlay, onEdit, onDelete }) => {
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
            <h2 className="text-[#A32E76] font-bold text-3xl">
              Videos Uploaded
            </h2>
            <Link to="/my-dashboard/uploadvideos">
            <button className="bg-[#A32E76] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#931e5c] transition-all text-sm font-medium">
              Upload New Video
            </button>
            </Link>
          </div>

          {/* Responsive Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {videos.map((video) => (
              <div
                key={video.id}
                className="relative bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden group hover:shadow-lg transition-all"
              >
                {/* Thumbnail */}
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => onPlay?.(video.id)}
                      className="bg-[#A32E76] text-white px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      <Play className="w-5 h-5" /> Play
                    </button>
                  </div>
                </div>

                {/* Video Details */}
                <div className="p-4">
                  <h3 className="text-gray-900 font-semibold text-base line-clamp-2 mb-2">
                    {video.title}
                  </h3>
                  <div className="text-sm text-gray-500 flex justify-between mb-4">
                    <span>{video.views.toLocaleString()} views</span>
                    <span>{video.uploadDate}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => onEdit?.(video.id)}
                      className="text-[#A32E76] flex items-center gap-2 hover:text-[#931e5c] transition-all text-sm font-medium"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => onDelete?.(video.id)}
                      className="text-red-500 flex items-center gap-2 hover:text-red-600 transition-all text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideosUploaded;
