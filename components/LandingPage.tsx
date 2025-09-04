
import React from 'react';
import { UserIcon } from './icons/UserIcon';
import { StaffIcon } from './icons/StaffIcon';

interface LandingPageProps {
  onSelectRole: (role: 'passenger' | 'staff') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectRole }) => {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-slate-800 mb-4">Welcome to FlyRight</h2>
      <p className="text-slate-500 mb-12 max-w-2xl mx-auto">
        The complete baggage tracking solution. Please select your role below to get started.
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        {/* Passenger Card */}
        <div
          onClick={() => onSelectRole('passenger')}
          className="bg-white p-8 rounded-xl shadow-lg w-full md:w-80 h-80 flex flex-col justify-center items-center text-center cursor-pointer transform hover:scale-105 transition-transform duration-300"
        >
          <UserIcon className="h-24 w-24 text-blue-600 mb-4" />
          <h3 className="text-2xl font-bold text-slate-800 mb-2">I am a Passenger</h3>
          <p className="text-slate-500">Track my baggage and get flight information.</p>
        </div>

        {/* Staff Card */}
        <div
          onClick={() => onSelectRole('staff')}
          className="bg-white p-8 rounded-xl shadow-lg w-full md:w-80 h-80 flex flex-col justify-center items-center text-center cursor-pointer transform hover:scale-105 transition-transform duration-300"
        >
          <StaffIcon className="h-24 w-24 text-blue-600 mb-4" />
          <h3 className="text-2xl font-bold text-slate-800 mb-2">I am Staff</h3>
          <p className="text-slate-500">Access the baggage simulator and passenger database.</p>
        </div>
      </div>
    </div>
  );
};
