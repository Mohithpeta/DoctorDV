import React from 'react';
import Logo from '../assets/Lifecourse Logo.png'; // Adjust the path as necessary

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
            <img src= {Logo} alt="Lifecourse Logo" className="h-12 w-auto" />
        </div>
        {children}
      </div>
    </div>
  );
}