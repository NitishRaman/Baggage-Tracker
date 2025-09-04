import React, { useState } from 'react';
import type { Passenger, PassengerApi, BaggageWithDetails } from '../types';
import { Chatbot } from './Chatbot';
import { LuggageIcon } from './icons/LuggageIcon';

interface PassengerViewProps {
  passengerApi: PassengerApi;
}

export const PassengerView: React.FC<PassengerViewProps> = ({ passengerApi }) => {
  const [pnr, setPnr] = useState('');
  const [passenger, setPassenger] = useState<Passenger | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setPassenger(null);

    // Simulate API call
    setTimeout(() => {
      const foundPassenger = passengerApi.getByPnr(pnr);
      if (foundPassenger) {
        setPassenger(foundPassenger);
      } else {
        setError(`No reservation found for PNR: ${pnr}. Please check and try again.`);
      }
      setIsLoading(false);
    }, 500);
  };

  const getBaggageDetails = (): BaggageWithDetails[] => {
    if (!passenger) return [];
    return passenger.baggageIds
      .map(id => passengerApi.getBaggageById(id))
      .filter((b): b is BaggageWithDetails => b !== undefined);
  };

  const baggageDetails = getBaggageDetails();

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Track Your Baggage</h2>
        <p className="text-slate-500 mb-6">Enter your Passenger Name Record (PNR) to see your baggage status.</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="text"
            value={pnr}
            onChange={(e) => setPnr(e.target.value.toUpperCase())}
            placeholder="e.g., ABC123"
            className="flex-grow px-4 py-3 bg-white text-slate-900 placeholder-slate-400 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Searching...' : 'Find Baggage'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {passenger && baggageDetails.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Your Details</h3>
                <div className="space-y-2 text-slate-600">
                    <p><span className="font-semibold text-slate-800">Name:</span> {passenger.firstName} {passenger.lastName}</p>
                    <p><span className="font-semibold text-slate-800">PNR:</span> {passenger.pnr}</p>
                    <p><span className="font-semibold text-slate-800">Flight:</span> {passenger.flightNumber}</p>
                    <p><span className="font-semibold text-slate-800">Seat:</span> {passenger.seat}</p>
                </div>
                 <h3 className="text-2xl font-bold mt-6 mb-4">Your Baggage</h3>
                 <div className="space-y-4">
                    {baggageDetails.map(bag => (
                        <div key={bag.id} className="border border-slate-200 p-4 rounded-lg flex items-center gap-4">
                            <LuggageIcon className="h-10 w-10 text-blue-500 flex-shrink-0" />
                            <div>
                                <p className="font-bold text-lg">{bag.id}</p>
                                <p className="text-slate-600">Location: <span className="font-semibold text-blue-700">{bag.location}</span></p>
                                <p className="text-sm text-slate-500">Last seen: {new Date(bag.lastSeen).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
            {baggageDetails[0] && <Chatbot baggage={baggageDetails[0]} />}
        </div>
      )}
    </div>
  );
};