
import React, { useState, useEffect } from 'react';
import { PassengerView } from './components/PassengerView';
import { StaffView } from './components/StaffView';
import { LandingPage } from './components/LandingPage';
import { PlaneIcon } from './components/icons/PlaneIcon';
import type { Passenger, PassengerApi, BaggageWithDetails } from './types';
import {
  updateBaggageLocation as updateBaggageLocationService,
  getAllPassengers,
  getPassengerByPnr,
  getRawBaggageById,
} from './services/baggageService';
import { INITIAL_PASSENGERS } from './constants';

type Role = 'passenger' | 'staff' | null;

const App: React.FC = () => {
  const [passengers] = useState<Passenger[]>(INITIAL_PASSENGERS);
  const [role, setRole] = useState<Role>(null);
  const [lastUpdated, setLastUpdated] = useState(Date.now()); // Used to force re-renders

  // Effect to listen for cross-tab updates via localStorage
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      // When baggage data changes in another tab, update state to trigger a re-render
      if (event.key === 'flyright_baggage_data') {
        setLastUpdated(Date.now());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleUpdateBaggageLocation = (bagId: string, checkpoint: string): boolean => {
    const success = updateBaggageLocationService(bagId, checkpoint);
    if (success) {
      // Update state to trigger re-render in the current tab
      setLastUpdated(Date.now());
    }
    return success;
  };

  // This function now combines data from the persistent baggage store and static passenger list
  const getBaggageById = (bagId: string): BaggageWithDetails | undefined => {
    const bag = getRawBaggageById(bagId); // Fetches latest from localStorage
    if (!bag) return undefined;

    const owner = passengers.find(p => p.baggageIds.includes(bagId));
    if (!owner) return undefined;

    return {
      ...bag,
      passengerName: `${owner.firstName} ${owner.lastName}`,
      pnr: owner.pnr,
    };
  };
  
  const passengerApi: PassengerApi = {
    getAll: () => getAllPassengers(passengers),
    getByPnr: (pnr: string) => getPassengerByPnr(passengers, pnr),
    getBaggageById: getBaggageById,
  };

  const renderContent = () => {
    switch (role) {
      case 'passenger':
        return <PassengerView passengerApi={passengerApi} />;
      case 'staff':
        return (
          <StaffView
            passengers={passengers}
            onUpdateBaggage={handleUpdateBaggageLocation}
            getBaggageById={getBaggageById}
          />
        );
      default:
        return <LandingPage onSelectRole={setRole} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <PlaneIcon className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-slate-800">FlyRight Baggage Tracker</h1>
          </div>
          {role && (
            <button
              onClick={() => setRole(null)}
              className="px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-300 bg-slate-200 text-slate-600 hover:bg-slate-300"
            >
              Switch Role
            </button>
          )}
        </nav>
      </header>
      <main className="container mx-auto p-6">
        {renderContent()}
      </main>
      <footer className="text-center py-4 text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} FlyRight Airlines. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
