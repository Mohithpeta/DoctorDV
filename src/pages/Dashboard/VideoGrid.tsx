import React from 'react';

import { MoreVertical, Edit2, Trash2, Play } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  uploadDate: string;
  views: number;
  duration: string;
}

interface VideoGridProps {
  videos: Video[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onPlay?: (id: string) => void;
  type: 'uploaded' | 'liked' | 'history' | 'playlist';
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, onEdit, onDelete, onPlay, type }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <div key={video.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative group">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => onPlay?.(video.id)}
                className="bg-white/90 text-[#A32E76] px-4 py-2 rounded-full text-sm font-medium"
              >
                <Play className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-white text-xs">
              {video.duration}
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between">
              <h3 className="font-medium text-gray-900 line-clamp-2">{video.title}</h3>
              <div className="relative group">
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <MoreVertical className="w-4 h-4 text-gray-500" />
                </button>
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 hidden group-hover:block">
                  {type === 'uploaded' && (
                    <>
                      <button
                        onClick={() => onEdit?.(video.id)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit Video
                      </button>
                      <button
                        onClick={() => onDelete?.(video.id)}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Video
                      </button>
                    </>
                  )}
                  {type === 'liked' && (
                    <button
                      onClick={() => onDelete?.(video.id)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Remove from Liked
                    </button>
                  )}
                  {type === 'history' && (
                    <button
                      onClick={() => onDelete?.(video.id)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Remove from History
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
              <span>{video.views.toLocaleString()} views</span>
              <span>{video.uploadDate}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Default Export
export default VideoGrid;


