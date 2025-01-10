import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <span className="ml-2 text-2xl font-semibold text-[#E91E63]">LifeCourse</span>
        </div>
        {children}
      </div>
    </div>
  );
}