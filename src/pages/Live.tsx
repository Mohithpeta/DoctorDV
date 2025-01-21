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

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'scheduled', label: 'Scheduled' },
    { id: 'streamed', label: 'Streamed' },
  ];

  const sessions = [
    {
      title: "Mental Health in Preconception Nutrition | Mental Planning for Working Women",
      doctor: "Dr. Sarah Johnson",
      time: "15/12/24 | 5:30 PM",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=450",
      type: "scheduled"
    },
  ];

  const filteredSessions = sessions.filter(session => 
    activeTab === 'all' || session.type === activeTab
  ).filter(session =>
    searchQuery ? 
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.doctor.toLowerCase().includes(searchQuery.toLowerCase())
      : true
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
              name="Select time slot"
              placeholder="Choose time"
              type="time"
              className="flex-1 p-2 border rounded-md text-gray-500"
              value={liveSessionForm.time}
              onChange={(e) => setLiveSessionForm({...liveSessionForm, time: e.target.value})}
            />

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <FaCloudUploadAlt className="mx-auto text-pink-500 text-4xl mb-2" />
            <p className="text-sm text-gray-500">Drag and drop a thumbnail to live</p>
            <button type="button" className="mt-2 px-4 py-1 text-sm bg-pink-500 text-white rounded-full">
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
            className="w-full bg-pink-500 text-white rounded-full py-2 hover:bg-pink-600 transition"
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
          <input
              placeholder="Choose time"
              type="time"
              className="flex-1 p-2 border rounded-md text-gray-500"
              value={liveSessionForm.time}
              onChange={(e) => setLiveSessionForm({...liveSessionForm, time: e.target.value})}
            />

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <FaCloudUploadAlt className="mx-auto text-pink-500 text-4xl mb-2" />
            <p className="text-sm text-gray-500">Drag and drop a thumbnail to live</p>
            <button type="button" className="mt-2 px-4 py-1 text-sm bg-pink-500 text-white rounded-full">
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
            className="w-full bg-pink-500 text-white rounded-full py-2 hover:bg-pink-600 transition"
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
          <div className="w-20 h-20 mx-auto bg-pink-100 rounded-full flex items-center justify-center">
            <FaCheck className="text-pink-500 text-4xl" />
          </div>
        </div>
        
        <h2 className="text-xl text-pink-500 font-medium">
          {successMessage}
        </h2>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Header onSearch={(query) => setSearchQuery(query)} />
        
        <div className="px-6 py-4">
          <div className="flex justify-between mb-6">
            <div className="flex space-x-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    activeTab === tab.id 
                      ? 'bg-pink-500 text-white' 
                      : 'bg-white text-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setShowScheduleModal(true)}
                className="px-4 py-2 bg-pink-500 text-white rounded-full text-sm hover:bg-pink-600 transition"
              >
                Schedule a live
              </button>
              <button 
                onClick={() => setShowStartLiveModal(true)}
                className="px-4 py-2 bg-pink-500 text-white rounded-full text-sm hover:bg-pink-600 transition"
              >
                Start live instantly
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredSessions.map((session, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={session.image}
                    alt={session.title}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-800">{session.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{session.doctor}</p>
                    <p className="text-xs text-gray-400 mt-1">{session.time}</p>
                  </div>
                  <button className="px-4 py-2 text-pink-500 border border-pink-500 rounded-full text-sm hover:bg-pink-500 hover:text-white transition">
                    Notify Me
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showScheduleModal && <ScheduleModal />}
      {showStartLiveModal && <StartLiveModal />}
      {showSuccessModal && <SuccessModal />}
    </div>
  );
}