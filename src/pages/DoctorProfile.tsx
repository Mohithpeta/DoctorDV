import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { ArrowLeft, ThumbsUp, Youtube, Instagram} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

// interface Video {
//   id: string;
//   title: string;
//   thumbnail: string;
//   views: number;
//   timestamp: string;
// }

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  timestamp: string;
  likes: number;
}

export function DoctorProfile() {
  const { id: doctorId } = useParams(); 
  const [activeTab, setActiveTab] = useState<string>('All');

  useEffect(() => {
    // You can use the doctorId here to fetch doctor's data
    console.log("Doctor ID:", doctorId);
  }, [doctorId]);

  const doctor = {
    name: "DR. Anjali Kumar",
    title: "Gynecologist | Obstetrician",
    experience: "13 Yrs",
    location: "Pune, India",
    qualification: "MBBS, MD - Obstetrics & Gynecology",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400",
    about: "I am Dr. Anjali Kumar, holding an MBBS, MD in Obstetrics & Gynecology, and FICMCH, FMAS certifications. I have also completed a Certificate Course and Training in Endoscopy from the World Association of Laparoscopic Surgeons and Ethicon Endo-surgery Institute. With over 29 years of post-graduate experience, I specialize as an obstetrician, gynecologist, and laparoscopic surgeon, and I am proud to be recognized as one of the most experienced professionals in Delhi NCR.",
    socialLinks: {
      linkedin: "#",
      youtube: "#",
      instagram: "#"
    }
  };

  const videos = [
    {
      id: "1",
      title: "Exercises to avoid during the early postpartum stage",
      thumbnail: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400",
      views: 2600,
      timestamp: "4 days ago"
    },
    {
      id: "2",
      title: "Breathing exercises and mindfulness",
      thumbnail: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
      views: 1800,
      timestamp: "1 week ago"
    },
    {
      id: "3",
      title: "Practical tips for managing postpartum stress",
      thumbnail: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
      views: 3200,
      timestamp: "2 weeks ago"
    }
  ];

  const comments: Comment[] = [
    {
      id: "1",
      user: {
        name: "deepagopalkar96",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100"
      },
      text: "Thank you Dr Anjali. Found this video very useful. Can you post videos regarding some daily meds for women (in throwing preconception)?",
      timestamp: "2 days ago",
      likes: 5
    },
    {
      id: "2",
      user: {
        name: "AkiHoya",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
      },
      text: "Thankyou for Providing valuable content. Helped me to break the myths.",
      timestamp: "4 weeks ago",
      likes: 12
    }
  ];

  const tabs = ['All', 'Understanding Postpartum Hypertension', 'Warning Signs and Symptoms', 'Exercise for Hypertension'];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <Header />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <Link to="/experts" className="inline-flex items-center text-gray-600 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Experts
            </Link>

            {/* Doctor Profile Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-start gap-6">
                <img
                  src={doctor.avatar}
                  alt={doctor.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-semibold">{doctor.name}</h1>
                    {doctor.isVerified && (
                      <span className="bg-[#5E17EB]/10 text-[#5E17EB] text-xs px-2 py-1 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">{doctor.title}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {doctor.qualification} • {doctor.experience} Experience
                  </p>
                  <p className="text-sm text-gray-500">{doctor.location}</p>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <a href={doctor.socialLinks.linkedin} className="text-gray-600 hover:text-[#5E17EB]">
                      {/* <Linkedin className="w-5 h-5" /> */}
                    </a>
                    <a href={doctor.socialLinks.youtube} className="text-gray-600 hover:text-[#5E17EB]">
                      <Youtube className="w-5 h-5" />
                    </a>
                    <a href={doctor.socialLinks.instagram} className="text-gray-600 hover:text-[#5E17EB]">
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">About Me</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{doctor.about}</p>
              </div>
            </div>

            {/* Video Categories */}
            <div className="flex space-x-4 overflow-x-auto pb-4 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? 'bg-[#5E17EB] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Videos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div key={video.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <button
                        className="bg-white/90 text-[#5E17EB] px-4 py-2 rounded-full text-sm font-medium"
                      >
                        Watch Now
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 line-clamp-2">{video.title}</h3>
                    <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                      <span>{video.views.toLocaleString()} views</span>
                      <span>{video.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Comments Section */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Comments</h2>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={comment.user.avatar}
                        alt={comment.user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{comment.user.name}</span>
                          <span className="text-sm text-gray-500">{comment.timestamp}</span>
                        </div>
                        <p className="text-gray-600 mt-1">{comment.text}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <button className="text-gray-500 text-sm flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            {comment.likes}
                          </button>
                          <button className="text-gray-500 text-sm">Reply</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}