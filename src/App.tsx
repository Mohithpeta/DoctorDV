import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Home } from './pages/Home';
import { LifeCourseExperts } from './pages/LifeCourseExperts';
import DoctorLivePage from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Live } from './pages/Live';
import { Community } from './pages/Community';
import { DoctorProfile } from './pages/DoctorProfile';
import Dashboard from './pages/Dashboard';
import VideosUploaded from './pages/Dashboard/VideosUploaded';
// import Notification from './pages/Notification';
import PendingApproval from './pages/Dashboard/PendingApproval';
import { UploadVideos } from './pages/Dashboard/UploadVideos';
import AuthGuard from './components/AuthGuard';
import { CommunityDetails } from './pages/Community/CommunityPages';
import { CoursesPage } from './pages/CoursesPage';
import { AnalyticsPage } from './pages/Dashboard/Analytics';
import { AnnouncementsPage } from './pages/Community/AnnouncementReminders';
import { VirtualMeetupPage } from './pages/Community/VirtualCommunityMeetup';

// 🔹 Protect ALL Routes Before Register & Login
const ProtectedRoutes = () => (
  <AuthGuard>
    <Outlet />
  </AuthGuard>
);

function App() {
  const userData = {
    username: 'John Doe',
    avatarUrl: '/path/to/avatar.jpg',
    stats: {
      videos: 12,
      pendingApprovals: 5,
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
          _id: '1',
          title: 'How to Stay Healthy',
          thumbnail: '/images/video1.jpg',
          uploadDate: '2025-01-15',
          upload_date: '2025-01-15',
          views: 5000,
          duration: '12:34',
      },
      {
          id: '2',
          _id: '2',
          title: 'Top 10 Exercises for Fitness',
          thumbnail: '/images/video2.jpg',
          uploadDate: '2025-01-10',
          upload_date: '2025-01-10',
          views: 15000,
          duration: '08:20',
      },
      {
          id: '3',
          _id: '3',
          title: 'Nutrition Tips for Beginners',
          thumbnail: '/images/video4.jpg',
          uploadDate: '2025-01-05',
          upload_date: '2025-01-05',
          views: 8000,
          duration: '10:45',
      },
      {
          id: '4',
          _id: '4',
          title: 'Causes of Incontinence',
          thumbnail: '/images/video3.jpg',
          uploadDate: '2025-01-05',
          upload_date: '2025-01-05',
          views: 600,
          duration: '10:45',
      },
      {
          id: '5',
          _id: '5',
          title: 'Remedies for Back pain',
          thumbnail: '/images/video3.jpg',
          uploadDate: '2025-01-05',
          upload_date: '2025-01-05',
          views: 7500,
          duration: '10:45',
      },
      {
          id: '6',
          _id: '6',
          title: 'Reasons for Hypertension',
          thumbnail: '/images/video3.jpg',
          uploadDate: '2025-01-05',
          upload_date: '2025-01-05',
          views: 50,
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
        {/* Redirect to Login if not authenticated */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Apply authentication protection to ALL routes */}
        <Route element={<ProtectedRoutes />}>
          {/* Authentication Routes */}
          

          {/* Protected Pages */}
          <Route path="/home" element={<Home />} />
          <Route path="/my-dashboard" element={<Dashboard {...userData} />} />
          <Route path="/experts" element={<LifeCourseExperts />} />
          <Route path="/profile" element={<DoctorLivePage/>} />
          <Route path="/live" element={<Live />} />
          <Route path="/community" element={<Community />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/Analytics" element={<AnalyticsPage />} />
          <Route path="/courses/:id" element={<CoursesPage />} />
          <Route path="/profile/:id" element={<DoctorProfile />} />
          <Route path="/community/announcements" element={<AnnouncementsPage />} />
          <Route path="/community/group/1" element={<VirtualMeetupPage />} />
          {/* <Route path="/notification" element={<Notification />} /> */}
          <Route path="/pendingapproval" element={<PendingApproval />} />
          <Route path="/community/:id" element={<CommunityDetails />} />

          {/* Video Management Routes */}
          <Route
            path="/my-dashboard/uploadvideos"
            element={
              <UploadVideos
                isOpen={true}
                onClose={() => console.log('Upload modal closed')}
                redirectOnClose="/my-dashboard/videosuploaded"
              />
            }
          />
          <Route
            path="/my-dashboard/videosuploaded"
            element={
              <VideosUploaded
                videos={sampleVideos}
                onEdit={handleEditVideo}
                onDelete={handleDeleteVideo}
                onPlay={handlePlayVideo}
                type="uploaded"
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
