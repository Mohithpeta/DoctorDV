import { useState } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { FaTimes, FaCloudUploadAlt, FaCheck } from 'react-icons/fa';

export function Live() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showStartLiveModal, setShowStartLiveModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Form states
  const [liveSessionForm, setLiveSessionForm] = useState({
    title: '',
    category: '',
    date: '',
    time: '',
    notifyFollowers: false
  });

  const [startLiveForm, setStartLiveForm] = useState({
    title: '',
    category: '',
    notifyFollowers: false
  });

  type Session = {
    title: string;
    doctor: string;
    time: string;
    image: string;
    status: 'scheduled' | 'streamed';
  };

  const sessions: Session[] = [
    {
      title: "Mental Health in Preconception Nutrition | Mental Planning for Working Women",
      doctor: "Dr. Sarah Johnson",
      time: "15/12/24 | 5:30 PM",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=450",
      status: "scheduled"
    },
  ];

  const filterSessions = (sessions: Session[]): Session[] => {
    return sessions.filter(session => 
      (activeTab === 'all' || session.status === activeTab) &&
      (searchQuery ? 
        session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.doctor.toLowerCase().includes(searchQuery.toLowerCase())
        : true)
    );
  };

  const CategoryButton = ({ category, label }: { category: string; label: string }) => (
    <button
      onClick={() => setActiveTab(category)}
      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
        activeTab === category
          ? 'bg-[#5e17eb] text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {label}
    </button>
  );

  const SessionCard = ({ session }: { session: Session }) => (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full">
      <div className="relative w-full">
        <div className="w-full aspect-video">
          <img
            src={session.image}
            alt={session.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <img
            src="/api/placeholder/32/32"
            alt={session.doctor}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="text-base font-semibold text-gray-900 line-clamp-2">{session.title}</h3>
            <p className="text-sm text-gray-600">{session.doctor}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">{session.time}</span>
          <button 
            className="px-4 py-2 rounded-full text-sm font-semibold transition-colors border border-[#5e17eb] text-[#5e17eb]"
          >
            Notify Me →
          </button>
        </div>
      </div>
    </div>
  );

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowScheduleModal(false);
    setSuccessMessage('Live scheduled Successfully');
    setShowSuccessModal(true);
    
    setTimeout(() => {
      setShowSuccessModal(false);
      setLiveSessionForm({
        title: '',
        category: '',
        date: '',
        time: '',
        notifyFollowers: false
      });
    }, 2000);
  };

  const handleStartLiveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowStartLiveModal(false);
    setSuccessMessage('Going Live Successfully');
    setShowSuccessModal(true);
    
    setTimeout(() => {
      setShowSuccessModal(false);
      setStartLiveForm({
        title: '',
        category: '',
        notifyFollowers: false
      });
    }, 2000);
  };

  const ScheduleModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px] relative">
        <button 
          onClick={() => setShowScheduleModal(false)}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>
        
        <h2 className="text-xl font-semibold mb-6">Live Topic</h2>
        
        <form onSubmit={handleScheduleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Title"
            className="w-full p-2 border rounded-md"
            value={liveSessionForm.title}
            onChange={(e) => setLiveSessionForm({...liveSessionForm, title: e.target.value})}
          />
          
          <select 
            className="w-full p-2 border rounded-md text-gray-500"
            value={liveSessionForm.category}
            onChange={(e) => setLiveSessionForm({...liveSessionForm, category: e.target.value})}
          >
            <option value="">Topic category</option>
            <option value="health">Health</option>
            <option value="nutrition">Nutrition</option>
          </select>
          
          <input
            type="date"
            placeholder="Choose date"
            className="w-full p-2 border rounded-md text-gray-500"
            value={liveSessionForm.date}
            onChange={(e) => setLiveSessionForm({...liveSessionForm, date: e.target.value})}
          />
          
          <input
            type="time"
            className="flex-1 p-2 border rounded-md text-gray-500"
            value={liveSessionForm.time}
            onChange={(e) => setLiveSessionForm({...liveSessionForm, time: e.target.value})}
          />

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <FaCloudUploadAlt className="mx-auto text-[#5e17eb] text-4xl mb-2" />
            <p className="text-sm text-gray-500">Drag and drop a thumbnail to live</p>
            <button type="button" className="mt-2 px-4 py-1 text-sm bg-[#5e17eb] text-white rounded-full">
              Select File
            </button>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <input 
              type="checkbox" 
              id="scheduleNotify" 
              checked={liveSessionForm.notifyFollowers}
              onChange={(e) => setLiveSessionForm({...liveSessionForm, notifyFollowers: e.target.checked})}
              className="rounded" 
            />
            <label htmlFor="scheduleNotify">
              Notify all my followers that I'll go live in the prescribed date & time.
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#5e17eb] text-white rounded-full py-2 hover:bg-purple-700 transition"
          >
            Schedule live
          </button>
        </form>
      </div>
    </div>
  );

  const StartLiveModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px] relative">
        <button 
          onClick={() => setShowStartLiveModal(false)}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>
        
        <h2 className="text-xl font-semibold mb-6">Live Topic</h2>
        
        <form onSubmit={handleStartLiveSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Title"
            className="w-full p-2 border rounded-md"
            value={startLiveForm.title}
            onChange={(e) => setStartLiveForm({...startLiveForm, title: e.target.value})}
          />
          
          <select 
            className="w-full p-2 border rounded-md text-gray-500"
            value={startLiveForm.category}
            onChange={(e) => setStartLiveForm({...startLiveForm, category: e.target.value})}
          >
            <option value="">Topic category</option>
            <option value="health">Health</option>
            <option value="nutrition">Nutrition</option>
          </select>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <FaCloudUploadAlt className="mx-auto text-[#5e17eb] text-4xl mb-2" />
            <p className="text-sm text-gray-500">Drag and drop a thumbnail to live</p>
            <button type="button" className="mt-2 px-4 py-1 text-sm bg-[#5e17eb] text-white rounded-full">
              Select File
            </button>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <input 
              type="checkbox" 
              id="startLiveNotify" 
              checked={startLiveForm.notifyFollowers}
              onChange={(e) => setStartLiveForm({...startLiveForm, notifyFollowers: e.target.checked})}
              className="rounded" 
            />
            <label htmlFor="startLiveNotify">
              Notify all my followers that I'll go live now.
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#5e17eb] text-white rounded-full py-2 hover:bg-purple-700 transition"
          >
            Start live instantly
          </button>
        </form>
      </div>
    </div>
  );

  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-[400px] text-center relative">
        <button 
          onClick={() => setShowSuccessModal(false)}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>
        
        <div className="mb-4">
          <div className="w-20 h-20 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
            <FaCheck className="text-[#5e17eb] text-4xl" />
          </div>
        </div>
        
        <h2 className="text-xl text-[#5e17eb] font-medium">
          {successMessage}
        </h2>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
          <Header onSearch={setSearchQuery} />
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <CategoryButton category="all" label="All" />
                <CategoryButton category="scheduled" label="Scheduled" />
                <CategoryButton category="streamed" label="Streamed" />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="px-4 py-2 bg-[#5e17eb] text-white rounded-full text-sm hover:bg-purple-700 transition"
                >
                  Schedule a live
                </button>
                <button 
                  onClick={() => setShowStartLiveModal(true)}
                  className="px-4 py-2 bg-[#5e17eb] text-white rounded-full text-sm hover:bg-purple-700 transition"
                >
                  Start live instantly
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterSessions(sessions).map((session, index) => (
              <SessionCard key={index} session={session} />
            ))}
          </div>
          {filterSessions(sessions).length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No sessions found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>

      {showScheduleModal && <ScheduleModal />}
      {showStartLiveModal && <StartLiveModal />}
      {showSuccessModal && <SuccessModal />}
    </div>
  );
}

export default Live;