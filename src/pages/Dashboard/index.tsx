import { Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navigation } from './Navigation';
import  VideoGrid  from './VideoGrid';
import { Playlists } from './Playlists';
import { StatsCard } from './StatsCard';
import { ArrowLeft, Video, Users, Activity, Heart } from 'lucide-react';

// Mock data
const mockVideos = [
  {
    id: '1',
    title: 'Right Age to Get Pregnant',
    thumbnail: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
    uploadDate: '2 days ago',
    views: 1200,
    duration: '12:34',
  },
  {
    id: '2',
    title: 'Exercises During Pregnancy',
    thumbnail: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    uploadDate: '1 week ago',
    views: 3400,
    duration: '8:45',
  },
  {
    id: '3',
    title: 'Understanding Miscarriage',
    thumbnail: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    uploadDate: '2 weeks ago',
    views: 5600,
    duration: '15:20',
  },
];

const mockPlaylists = [
  {
    id: '1',
    title: 'Pregnancy Basics',
    thumbnail: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
    videoCount: 12,
    lastUpdated: '2 days ago',
  },
  {
    id: '2',
    title: 'Exercise Routines',
    thumbnail: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    videoCount: 8,
    lastUpdated: '1 week ago',
  },
];

export default function DashboardContent() {
  const navigate = useNavigate();

  const stats = [
    {
      icon: <Video className="w-4 h-4 text-pink-600" />,
      value: 12,
      label: 'Videos Uploaded',
      path: '/dashboard/uploaded',
    },
    {
      icon: <Users className="w-4 h-4 text-pink-600" />,
      value: 1234,
      label: 'Profile Views',
      path: '/profile',
    },
    {
      icon: <Activity className="w-4 h-4 text-pink-600" />,
      value: 4,
      label: 'Live Sessions',
      path: '/live',
    },
    {
      icon: <Heart className="w-4 h-4 text-pink-600" />,
      value: 25,
      label: 'Followers',
      path: '/profile',
    },
  ];

  const handleAction = (type: string, id: string) => {
    console.log(`${type} action triggered for ID:`, id);
  };

  return (
    <div className="p-6">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Overall Stats</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <StatsCard key={index} {...stat} />
                ))}
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Access</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <motion.button
                    onClick={() => navigate('/dashboard/uploaded')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center space-x-2 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Video className="w-5 h-5 text-pink-600" />
                    <span className="text-gray-700">Uploaded Videos</span>
                  </motion.button>
                  <motion.button
                    onClick={() => navigate('/live')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center space-x-2 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Activity className="w-5 h-5 text-pink-600" />
                    <span className="text-gray-700">Go Live</span>
                  </motion.button>
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="uploaded"
          element={
            <>
              <div className="mb-6">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Dashboard
                </button>
              </div>
              <Navigation />
              <VideoGrid
                videos={mockVideos}
                onEdit={(id) => handleAction('Edit', id)}
                onDelete={(id) => handleAction('Delete', id)}
                onPlay={(id) => handleAction('Play', id)}
                type="uploaded"
              />
            </>
          }
        />
        <Route
          path="playlists"
          element={
            <>
              <div className="mb-6">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Dashboard
                </button>
              </div>
              <Navigation />
              <Playlists
                playlists={mockPlaylists}
                onCreatePlaylist={() => handleAction('Create Playlist', '')}
                onEditPlaylist={(id) => handleAction('Edit Playlist', id)}
                onDeletePlaylist={(id) => handleAction('Delete Playlist', id)}
                onPlayPlaylist={(id) => handleAction('Play Playlist', id)}
              />
            </>
          }
        />
      </Routes>
    </div>
  );
}
