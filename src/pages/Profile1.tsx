import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Camera, Edit2, X, Youtube, Instagram, Linkedin } from 'lucide-react';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'DR. Anjali Kumar',
    title: 'Gynecologist | Obstetrician',
    experience: '15 Yrs',
    location: 'Pune, India',
    qualification: 'MBBS, MD - Obstetrics & Gynecology',
    about: 'I am Dr. Anjali Kumar, holding an MBBS, MD in Obstetrics & Gynecology, and FICMCH, FMAS certifications. I have also completed a Certificate Course and Training in Endoscopy from the World Association of Laparoscopic Surgeons and Ethicon Endo-surgery Institute. With over 29 years of post-graduate experience, I specialize as an obstetrician, gynecologist, and laparoscopic surgeon, and I am proud to be recognized as one of the most experienced professionals in Delhi NCR.',
    socialLinks: {
      linkedin: '',
      youtube: '',
      instagram: ''
    }
  });

  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Mental Health', 'Myths vs Facts', 'PCOS', 'Diabetes Mellitus', 'Fertility Awareness'];

  const videos = [
    {
      title: 'Steps to prepare your body for a healthy pregnancy',
      image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=400',
    },
    {
      title: 'The role of counseling in preconception',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400',
    },
    {
      title: 'Importance of vaccination before conception',
      image: 'https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?auto=format&fit=crop&q=80&w=400',
    },
    {
      title: 'Debunking common preconception myths',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400',
    }
  ];

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <Header />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-start gap-6">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=150"
                    alt={formData.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 p-2 bg-[#5E17EB] text-white rounded-full">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-semibold">{formData.name}</h1>
                        <span className="bg-[#5E17EB]/10 text-[#5E17EB] text-xs px-2 py-1 rounded-full">
                          Verified
                        </span>
                      </div>
                      <p className="text-gray-600">{formData.title}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Years Of Experience: {formData.experience}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1 text-sm text-gray-600">
                          <span className="w-2 h-2 bg-[#5E17EB] rounded-full"></span>
                          {formData.location}
                        </span>
                        <span className="text-sm text-gray-600">
                          {formData.qualification}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 text-[#5E17EB] hover:bg-[#5E17EB]/10 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <a href={formData.socialLinks.linkedin} className="text-gray-600 hover:text-[#5E17EB]">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={formData.socialLinks.youtube} className="text-gray-600 hover:text-[#5E17EB]">
                      <Youtube className="w-5 h-5" />
                    </a>
                    <a href={formData.socialLinks.instagram} className="text-gray-600 hover:text-[#5E17EB]">
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">About Me</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{formData.about}</p>
              </div>
            </div>

            {/* Content Tabs */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videos.map((video, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="relative">
                    <img
                      src={video.image}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <button className="bg-white/90 text-[#5E17EB] px-4 py-2 rounded-full text-sm font-medium">
                        View
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 line-clamp-2">{video.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[600px] max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Edit Profile</h2>
                <button onClick={() => setIsEditing(false)}>
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialization*</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Years Of Experience*</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qualification*</label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
                  <textarea
                    value={formData.about}
                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700">Social Handles</h3>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">LinkedIn (Optional)</label>
                    <input
                      type="url"
                      value={formData.socialLinks.linkedin}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                      })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter LinkedIn URL"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">YouTube (Optional)</label>
                    <input
                      type="url"
                      value={formData.socialLinks.youtube}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, youtube: e.target.value }
                      })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter YouTube URL"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Instagram (Optional)</label>
                    <input
                      type="url"
                      value={formData.socialLinks.instagram}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, instagram: e.target.value }
                      })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter Instagram URL"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-[#5E17EB] text-white rounded-md hover:bg-[#8E2968]"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}