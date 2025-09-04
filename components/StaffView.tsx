
import React, { useState } from 'react';
import type { Passenger, BaggageWithDetails } from '../types';
import { BaggageSimulator } from './BaggageSimulator';
import { PassengerDataTable } from './PassengerDataTable';
import { ALL_PASSENGER_BAGGAGE_IDS } from '../constants';

interface StaffViewProps {
  passengers: Passenger[];
  onUpdateBaggage: (bagId: string, checkpoint: string) => boolean;
  getBaggageById: (bagId: string) => BaggageWithDetails | undefined;
}

export const StaffView: React.FC<StaffViewProps> = ({ passengers, onUpdateBaggage, getBaggageById }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPassengers = passengers.filter(passenger => {
    const searchTerm = searchQuery.toLowerCase().trim();
    if (!searchTerm) return true;

    return (
      passenger.pnr.toLowerCase().includes(searchTerm) ||
      passenger.firstName.toLowerCase().includes(searchTerm) ||
      passenger.lastName.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Staff Dashboard</h2>
        <p className="text-slate-500">Manage baggage location and view passenger information.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <BaggageSimulator
            allBaggageIds={ALL_PASSENGER_BAGGAGE_IDS}
            onUpdateBaggage={onUpdateBaggage}
            getBaggageById={getBaggageById}
          />
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-lg h-full">
            <h3 className="text-2xl font-bold mb-4">Passenger Database</h3>
            <div className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by PNR, first name, or last name..."
                className="w-full px-4 py-2 bg-white text-slate-900 placeholder-slate-400 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
                aria-label="Search passengers"
              />
            </div>
            <PassengerDataTable passengers={filteredPassengers} getBaggageById={getBaggageById} />
          </div>
        </div>
      </div>
    </div>
  );
};
