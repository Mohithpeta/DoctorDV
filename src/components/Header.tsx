import { useState, useRef, useEffect } from 'react';
import { Search, Mic, Bell, ChevronDown } from 'lucide-react';

interface HeaderProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  username?: string;
  avatarUrl?: string;
}

export function Header({
  placeholder = "Search LifeCourse",
  onSearch,
  username = "Guest User", // Default to "Guest User"
  avatarUrl = "/api/placeholder/32/32" // Default avatar URL if none provided
}: HeaderProps) {
  const [showTopicDropdown, setShowTopicDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const topics = ['Preconception', 'Pregnancy', 'Postpartum', 'Parenting'];
  const languages = ['English', 'Telugu', 'Tamil', 'Hindi'];
  const notifications = [
    { id: 1, title: 'New live session starting', time: '5 minutes ago' },
    { id: 2, title: 'Dr. Sarah posted new content', time: '1 hour ago' },
    { id: 3, title: 'Your appointment reminder', time: '2 hours ago' },
  ];

  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);
  const topicDropdownRef = useRef<HTMLDivElement>(null);

  const useOutsideClick = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, callback]);
  };

  useOutsideClick(languageDropdownRef, () => setShowLanguageDropdown(false));
  useOutsideClick(notificationDropdownRef, () => setShowNotifications(false));
  useOutsideClick(topicDropdownRef, () => setShowTopicDropdown(false));

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguageDropdown(false); 
  };

  const handleMicClick = () => {
    setIsRecording(!isRecording);
    // Add voice recognition logic here
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Search Bar with Mic */}
          <div className="flex-1 max-w-2xl relative flex items-center">
            <div className="relative flex-1">
              <input
                type="text"
                onChange={(e) => onSearch?.(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:border-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <button 
              onClick={handleMicClick}
              className={`p-2 border-y border-r border-gray-300 rounded-r-md hover:bg-gray-50 transition-colors ${
                isRecording ? 'bg-pink-50 text-[#5E17EB]' : ''
              }`}
            >
              <Mic className={`w-5 h-5 ${isRecording ? 'text-[#5E17EB] animate-pulse' : 'text-gray-500'}`} />
            </button>
          </div>

          {/* Right Side Elements */}
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-gray-100 rounded-full relative transition-transform hover:scale-105"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#5E17EB] rounded-full animate-pulse"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div 
                  ref={notificationDropdownRef}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-fadeIn">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm font-medium text-gray-800">{notification.title}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Topic Selection */}
            <div className="relative">
              <button 
                onClick={() => setShowTopicDropdown(!showTopicDropdown)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <span>Preconception</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showTopicDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Topics Dropdown */}
              {showTopicDropdown && (
                <div 
                  ref={topicDropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-fadeIn">
                  {topics.map((topic) => (
                    <button
                      key={topic}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selection */}
            <div className="relative">
              <button 
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <span>{selectedLanguage}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Languages Dropdown */}
              {showLanguageDropdown && (
                <div 
                  ref={languageDropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-fadeIn">
                  {languages.map((language) => (
                    <button
                      key={language}
                      onClick={() => handleLanguageChange(language)} 
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" 
                    >
                      {language}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <img
                  src={avatarUrl}
                  alt={username}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-semibold text-gray-700">{username}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
