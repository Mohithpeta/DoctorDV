import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Stethoscope, MessageCircle, User, Radio, LayoutDashboard, Menu, X } from 'lucide-react';  //Bell
import LifecourseLogo from '../assets/Lifecourse Logo.png';
import { BarChart } from 'lucide-react';

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive?: boolean;
  onClick?: () => void;
}

function NavLink({ icon, label, to, isActive, onClick }: NavLinkProps) {
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => {
        navigate(to);
        if (onClick) onClick();
      }}
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
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger Button for Mobile - Adjusted z-index and positioning */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md border border-gray-200 md:hidden"
        onClick={toggleMenu}
      >
        {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 p-4 transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:h-screen`}
      >
        <div className="mb-8 mt-12 md:mt-0">
          <img src={LifecourseLogo} alt="Lifecourse Logo" className="w-36 h-auto" />
        </div>
        <nav className="space-y-2">
          <NavLink
            icon={<Home className="w-5 h-5" />}
            label="Home"
            to="/home"
            isActive={currentPath === '/home'}
            onClick={() => setIsOpen(false)}
          />
          <NavLink
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="Dashboard"
            to="/my-dashboard"
            isActive={currentPath === '/my-dashboard'}
            onClick={() => setIsOpen(false)}
          />
          <NavLink
            icon={<Stethoscope className="w-5 h-5" />}
            label="LifeCourse Experts"
            to="/experts"
            isActive={currentPath === '/experts'}
            onClick={() => setIsOpen(false)}
          />
          <NavLink
            icon={<Radio className="w-5 h-5" />}
            label="Live"
            to="/live"
            isActive={currentPath === '/live'}
            onClick={() => setIsOpen(false)}
          />
          <NavLink
            icon={<MessageCircle className="w-5 h-5" />}
            label="Community"
            to="/community"
            isActive={currentPath === '/community'}
            onClick={() => setIsOpen(false)}
          />
          <NavLink
            icon={<MessageCircle className="w-5 h-5" />}
            label="Courses"
            to="/courses"
            isActive={currentPath === '/courses'}
            onClick={() => setIsOpen(false)}
          />
          <NavLink
            icon={<BarChart className="w-5 h-5" />}
            label="Analytics"
            to="/analytics"
            isActive={currentPath === '/analytics'}
            onClick={() => setIsOpen(false)}
          />
          {/* <NavLink
            icon={<Bell className="w-5 h-5" />}
            label="Notification"
            to="/notification"
            isActive={currentPath === '/notification'}
            onClick={() => setIsOpen(false)}
          /> */}
          <NavLink
            icon={<User className="w-5 h-5" />}
            label="Profile"
            to="/profile"
            isActive={currentPath === '/profile'}
            onClick={() => setIsOpen(false)}
          />
        </nav>
      </div>

      {/* Overlay for mobile when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
}