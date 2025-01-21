
import { Video, Heart, History, List } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navigationItems = [
  {
    label: 'Uploaded Videos',
    icon: Video,
    path: '/dashboard/uploaded',
  },
  {
    label: 'Liked Videos',
    icon: Heart,
    path: '/dashboard/liked',
  },
  {
    label: 'Watch History',
    icon: History,
    path: '/dashboard/history',
  },
  {
    label: 'Playlists',
    icon: List,
    path: '/dashboard/playlists',
  },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-wrap gap-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#A32E76] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5 mr-2" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}