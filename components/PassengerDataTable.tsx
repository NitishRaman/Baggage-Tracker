import React from 'react';
import type { Passenger, BaggageWithDetails } from '../types';

interface PassengerDataTableProps {
  passengers: Passenger[];
  getBaggageById: (bagId: string) => BaggageWithDetails | undefined;
}

export const PassengerDataTable: React.FC<PassengerDataTableProps> = ({ passengers, getBaggageById }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-slate-500">
        <thead className="text-xs text-slate-700 uppercase bg-slate-100">
          <tr>
            <th scope="col" className="px-4 py-3">PNR</th>
            <th scope="col" className="px-4 py-3">Passenger</th>
            <th scope="col" className="px-4 py-3">Flight</th>
            <th scope="col" className="px-4 py-3">Seat</th>
            <th scope="col" className="px-4 py-3">Baggage IDs</th>
            <th scope="col" className="px-4 py-3">Baggage Location</th>
            <th scope="col" className="px-4 py-3">Weight (kg)</th>
          </tr>
        </thead>
        <tbody>
          {passengers.map((passenger) => (
            <tr key={passenger.pnr} className="bg-white border-b hover:bg-slate-50">
              <th scope="row" className="px-4 py-4 font-medium text-slate-900 whitespace-nowrap">
                {passenger.pnr}
              </th>
              <td className="px-4 py-4">{passenger.firstName} {passenger.lastName}</td>
              <td className="px-4 py-4">{passenger.flightNumber}</td>
              <td className="px-4 py-4">{passenger.seat}</td>
              <td className="px-4 py-4">{passenger.baggageIds.join(', ')}</td>
              <td className="px-4 py-4">
                {passenger.baggageIds.map(bagId => {
                    const bagDetails = getBaggageById(bagId);
                    return (
                        <div key={bagId}>
                            {bagDetails ? bagDetails.location : 'N/A'}
                        </div>
                    );
                })}
              </td>
              <td className="px-4 py-4">
                {passenger.baggageIds.map(bagId => {
                    const bagDetails = getBaggageById(bagId);
                    return (
                        <div key={bagId}>
                            {bagDetails ? bagDetails.weightKg : 'N/A'}
                        </div>
                    );
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};