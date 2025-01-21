import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface StatsCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  path: string;
}

export function StatsCard({ icon, value, label, path }: StatsCardProps) {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate(path)}
      className="bg-white rounded-lg p-4 shadow-sm relative w-full text-left hover:shadow-md transition-shadow"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute top-2 right-2">
        <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="mt-6">
        <div className="text-3xl font-bold mb-1">{value.toLocaleString()}</div>
        <div className="text-gray-600 text-sm">{label}</div>
      </div>
    </motion.button>
  );
}