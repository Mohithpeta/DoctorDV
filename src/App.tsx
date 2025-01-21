import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { LifeCourseExperts } from './pages/LifeCourseExperts';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Live } from './pages/Live';
import { Community } from './pages/Community';
import { DoctorProfile } from './pages/DoctorProfile';
import Dashboard from './pages/Dashboard';
import { Navigation } from './pages/Dashboard/Navigation';
import VideoGrid from './pages/Dashboard/VideoGrid';
import DashboardContent from './pages/Dashboard/index';
import Notification from './pages/Notification';

function App() {
  const userData = {
    username: 'John Doe',
    avatarUrl: '/path/to/avatar.jpg',
    stats: {
      videos: 12,
      profileViews: 12345,
      liveStreams: 5,
      followers: 6789,
    },
    videoAnalytics: {
      views: 10000,
      likes: 5000,
      comments: 2500,
    },
    downloads: 5000,
    shares: 2500,
  };

  const sampleVideos = [
    {
      id: '1',
      title: 'How to Stay Healthy',
      thumbnail: '/images/video1.jpg',
      uploadDate: '2025-01-15',
      views: 5000,
      duration: '12:34',
    },
    {
      id: '2',
      title: 'Top 10 Exercises for Fitness',
      thumbnail: '/images/video2.jpg',
      uploadDate: '2025-01-10',
      views: 15000,
      duration: '08:20',
    },
    {
      id: '3',
      title: 'Nutrition Tips for Beginners',
      thumbnail: '/images/video3.jpg',
      uploadDate: '2025-01-05',
      views: 8000,
      duration: '10:45',
    },
  ];

  const handleEditVideo = (id: string) => {
    console.log(`Editing video with ID: ${id}`);
  };

  const handleDeleteVideo = (id: string) => {
    console.log(`Deleting video with ID: ${id}`);
  };

  const handlePlayVideo = (id: string) => {
    console.log(`Playing video with ID: ${id}`);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/my-dashboard" replace />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/my-dashboard"
          element={<Dashboard {...userData} />}
        />
        <Route path="/experts" element={<LifeCourseExperts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/live" element={<Live />} />
        <Route path="/community" element={<Community />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<DoctorProfile />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/dashboard" element={<DashboardContent /> } />
        <Route path="/notification" element={<Notification />} />
        <Route
          path="/my-dashboard/videogrid"
          element={
            <VideoGrid
              videos={sampleVideos}
              onEdit={handleEditVideo}
              onDelete={handleDeleteVideo}
              onPlay={handlePlayVideo}
              type="uploaded"
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
