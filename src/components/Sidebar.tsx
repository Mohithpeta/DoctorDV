import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, GraduationCap, MessageCircle, User, Radio, Bell, LayoutDashboard} from 'lucide-react';
import LifecourseLogo from '../assets/Lifecourse Logo.png';

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive?: boolean;
}

function NavLink({ icon, label, to, isActive }: NavLinkProps) {
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => navigate(to)}
      className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
        isActive
          ? 'text-[#5E17EB] bg-pink-50'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </button>
  );
}

export function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 p-4">
      <div className="mb-8">
        <img src={LifecourseLogo} alt="Lifecourse Logo" className="w-36 h-auto" />
      </div>
      <nav className="space-y-2">
      <NavLink
          icon={<Home className="w-5 h-5" />}
          label="Home"
          to="/home"
          isActive={currentPath === '/home'}
        />
        <NavLink
          icon={<LayoutDashboard className="w-5 h-5" />} 
          label="Dashboard"
          to="/my-dashboard"
          isActive={currentPath === '/my-dashboard'}
        />
        
        <NavLink
          icon={<GraduationCap className="w-5 h-5" />}
          label="LifeCourse Experts"
          to="/experts"
          isActive={currentPath === '/experts'}
        />
        <NavLink
          icon={<Radio className="w-5 h-5" />}
          label="Live"
          to="/live"
          isActive={currentPath === '/live'}
        />
        <NavLink
          icon={<MessageCircle className="w-5 h-5" />}
          label="Community"
          to="/community"
          isActive={currentPath === '/community'}
        />
        <NavLink
          icon={<Bell className="w-5 h-5" />}
          label="Notification"
          to="/notification"
          isActive={currentPath === '/notification'}
          />
        <NavLink
          icon={<User className="w-5 h-5" />}
          label="Profile"
          to="/profile"
          isActive={currentPath === '/profile'}
        />
      </nav>
    </div>
  );
}