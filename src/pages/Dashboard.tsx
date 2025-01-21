import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Video, Users, Activity, Heart, Upload } from 'lucide-react';
import { Header } from '../components/Header';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
}

interface VideoAnalytics {
  views: number;
  likes: number;
  comments: number;
}

interface DashboardProps {
  username?: string;  // Made optional
  avatarUrl?: string; // Made optional
  stats?: {
    videos: number;
    profileViews: number;
    liveStreams: number;
    followers: number;
  };
  videoAnalytics?: VideoAnalytics;
  downloads?: number;
  shares?: number;
}

const defaultStats = {
  videos: 0,
  profileViews: 0,
  liveStreams: 0,
  followers: 0
};

const defaultVideoAnalytics = {
  views: 0,
  likes: 0,
  comments: 0
};

const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => (
  <motion.div
    className="bg-white rounded-lg p-4 shadow-sm relative"
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <div className="absolute top-2 right-2">
      <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
        {icon}
      </div>
    </div>
    <div className="mt-6">
      <div className="text-3xl font-bold mb-1">{value.toLocaleString()}</div>
      <div className="text-gray-600 text-sm">{label}</div>
    </div>
  </motion.div>
);

const Dashboard: React.FC<DashboardProps> = ({
  username,
  avatarUrl,
  stats,
  videoAnalytics,
  downloads = 0,
  shares = 0,
}) => {
  // Handle empty or invalid username
  const displayName = username?.trim() || 'Guest User';
  const userAvatar = avatarUrl || '/api/placeholder/32/32';
  const currentStats = stats || defaultStats;
  const currentAnalytics = videoAnalytics || defaultVideoAnalytics;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <Header username={displayName} avatarUrl={userAvatar} />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Overall Stats */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Overall Stats</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <Link to="/my-dashboard/videogrid"> <StatCard 
                  icon={<Video className="w-4 h-4 text-pink-600" />} 
                  value={currentStats.videos} 
                  label="Videos Uploaded" 
                /></Link>
                <Link to="/profile"><StatCard 
                  icon={<Users className="w-4 h-4 text-pink-600" />} 
                  value={currentStats.profileViews} 
                  label="Profile Views" 
                /></Link>
                <Link to="/live"><StatCard 
                  icon={<Activity className="w-4 h-4 text-pink-600" />} 
                  value={currentStats.liveStreams} 
                  label="Live Sessions" 
                /></Link>
                <Link to="profile"><StatCard 
                  icon={<Heart className="w-4 h-4 text-pink-600" />} 
                  value={currentStats.followers} 
                  label="Followers" 
                /></Link>
              </div>
            </div>

            {/* Quick Access */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Access</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center space-x-2 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <Upload className="w-5 h-5 text-pink-600" />
                  <span className="text-gray-700">Upload Video</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center space-x-2 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <Activity className="w-5 h-5 text-pink-600" />
                  <span className="text-gray-700">Go Live</span>
                </motion.button>
              </div>
            </div>

            {/* Video Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Video Stats</h2>
                <motion.div
                  className="bg-white rounded-lg shadow-sm p-6 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="relative">
                    <img
                      src="/api/placeholder/800/320"
                      alt="Preconception Nutrition"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <h3 className="text-4xl font-bold text-white text-center">
                        Preconception<br />Nutrition
                      </h3>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Video Analytics</h2>
                <motion.div
                  className="bg-white rounded-lg shadow-sm p-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Views</span>
                      <span>{currentAnalytics.views.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Likes</span>
                      <span>{currentAnalytics.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Comments</span>
                      <span>{currentAnalytics.comments.toLocaleString()}</span>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Downloads</span>
                        <span>{downloads.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Shares</span>
                        <span>{shares.toLocaleString()}</span>
                      </div>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-between"
                    >
                      <span>Go to analytics</span>
                      <span>→</span>
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;