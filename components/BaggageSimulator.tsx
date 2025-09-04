import React, { useState, DragEvent } from 'react';
import { CHECKPOINTS } from '../constants';
import type { BaggageWithDetails } from '../types';

// Base64 data URI for a suitcase icon (SVG)
const SUITCASE_IMAGE_URI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgODAiPjxyZWN0IHg9IjIiIHk9IjIiIHdpZHRoPSI5NiIgaGVpZ2h0PSI3NiIgcng9IjgiIHJ5PSI4IiBmaWxsPSIjYTY3YjViIiBzdHJva2U9IiM1YTNkMmIiIHN0cm9rZS13aWR0aD0iMiIvPjxyZWN0IHg9IjI1IiB5PSIyIiB3aWR0aD0iMTIiIGhlaWdodD0iNzYiIGZpbGw9IiNlNGI5OGQiLz48cmVjdCB4PSI2MyIgeT0iMiIgd2lkdGg9IjEyIiBoZWlnaHQ9Ijc2IiBmaWxsPSIjZTRiOThkIi8+PHJlY3QgeD0iMjUiIHk9IjE1IiB3aWR0aD0iMTIiIGhlaWdodD0iNiIgZmlsbD0iI2M3YTQ3YiIgc3Ryb2tlPSIjNWEzZDJiIiBzdHJva2Utd2lkdGg9Ii41Ii8+PHJlY3QgeD0iNjMiIHk9IjE1IiB3aWR0aD0iMTIiIGhlaWdodD0iNiIgZmlsbD0iI2M3YTQ3YiIgc3Ryb2tlPSIjNWEzZDJiIiBzdHJva2Utd2lkdGg9Ii41Ii8+PHBhdGggZD0iTSAyLDEyIEEgMTAsMTAgMCAwIDEgMTIsMiBaIiBmaWxsPSIjYzdhNDdiIiBzdHJva2U9IiM1YTNkMmIiIHN0cm9rZS13aWR0aD0iMS41Ii8+PGNpcmNsZSBjeD0iOCIgY3k9IjgiIHI9IjEuNSIgZmlsbD0iIzVhM2QyYiIvPjxjaXJjbGUgY3g9IjE1IiBjeT0iOCIgcj0iMS41IiBmaWxsPSIjNWEzZDJiIi8+PGNpcmNsZSBjeD0iOCIgY3k9IjE1IiByPSIxLjUiIGZpbGw9IiM1YTJkMmIiLz48cGF0aCBkPSJNIDk4LDEyIEEgMTAsMTAgMCAwIDAgODgsMiBaIiBmaWxsPSIjYzdhNDdiIiBzdHJva2U9IiM1YTNkMmIiIHN0cm9rZS13aWR0aD0iMS41Ii8+PGNpcmNsZSBjeD0iOTIiIGN5PSI4IiByPSIxLjUiIGZpbGw9IiM1YTJkMmIiLz48Y2lyY2xlIGN4PSI4NSIgY3k9IjgiIHI9IjEuNSIgZmlsbD0iIzVhM2QyYiIvPjxjaXJjbGUgY3g9IjkyIiBjeT0iMTUiIHI9IjEuNSIgZmlsbD0iIzVhM2QyYiIvPjxwYXRoIGQ9Ik0gMiw2OCBBIDEwLDEwIDAgMCAwIDEyLDc4IFoiIGZpbGw9IiNjN2E0N2IiIHN0cm9rZT0iIzVhM2QyYiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48Y2lyY2xlIGN4PSI4IiBjeT0iNzIiIHI9IjEuNSIgZmlsbD0iIzVhM2QyYiIvPjxjaXJjbGUgY3g9IjE1IiBjeT0iNzIiIHI9IjEuNSIgZmlsbD0iIzVhM2QyYiIvPjxjaXJjbGUgY3g9IjgiIGN5PSI2NSIgcj0iMS41IiBmaWxsPSIjNWEzZDJiIi8+PHBhdGggZD0iTSA5OCw2OCBBIDEwLDEwIDAgMCAxIDg4LDc4IFoiIGZpbGw9IiNjN2E0N2IiIHN0cm9rZT0iIzVhM2QyYiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48Y2lyY2xlIGN4PSI5MiIgY3k9IjcyIiByPSIxLjUiIGZpbGw9IiM1YTNkMmIiLz48Y2lyY2xlIGN4PSI4NSIgY3k9IjcyIiByPSIxLjUiIGZpbGw9IiM1YTJkMmIiLz48Y2lyY2xlIGN4PSI5MiIgY3k9IjY1IiByPSIxLjUiIGZpbGw9IiM1YTJkMmIiLz48cmVjdCB4PSI0NSIgeT0iNTUiIHdpZHRoPSIyNSIgaGVpZ2h0PSIxNSIgZmlsbD0iI2Y5ZTc5ZiIgc3Ryb2tlPSIjNWEzZDJiIiBzdHJva2Utd2lkdGg9Ii41IiB0cmFuc2Zvcm09InJvdGF0ZSgtMTAgNTcuNSA2Mi41KSIvPjxyZWN0IHg9IjEwIiB5PSI0MCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjE4IiBmaWxsPSIjZjBlNjhjIiBzdHJva2U9IiM1YTNkMmIiIHN0cm9rZS13aWR0aD0iLjUiIHRyYW5zZm9ybT0icm90YXRlKDE1IDE2IDQ5KSIvPjxwb2x5Z29uIHBvaW50cz0iNDUsMzAgNTUsNDUgMzUsNDUiIGZpbGw9IiNhZWQ2ZjEiIHN0cm9rZT0iIzVhM2QyYiIgc3Ryb2tlLXdpZHRoPSIuNSIvPjxjaXJjbGUgY3g9Ijg4IiBjeT0iNDAiIHI9IjQiIGZpbGw9IiNhNjdiNWIiIHN0cm9rZT0iIzVhM2QyYiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48Y2lyY2xlIGN4PSI4OCIgY3k9IjQwIiByPSIyIiBmaWxsPSIjNmI0YTM1Ii8+PC9zdmc+';

interface BaggageSimulatorProps {
  allBaggageIds: string[];
  onUpdateBaggage: (bagId: string, checkpoint: string) => boolean;
  getBaggageById: (bagId: string) => BaggageWithDetails | undefined;
}

export const BaggageSimulator: React.FC<BaggageSimulatorProps> = ({
  allBaggageIds,
  onUpdateBaggage,
  getBaggageById,
}) => {
  const [selectedBagId, setSelectedBagId] = useState<string>('');
  const [draggedBagId, setDraggedBagId] = useState<string | null>(null);
  const [dragOverCheckpoint, setDragOverCheckpoint] = useState<string | null>(null);

  const handleDragStart = (e: DragEvent<HTMLImageElement>, bagId: string) => {
    e.dataTransfer.setData('text/plain', bagId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedBagId(bagId);
    // Use a timeout to allow the DOM to update before the browser takes a snapshot for the drag image
    setTimeout(() => {
        const dragImage = e.target as HTMLElement;
        if (dragImage) {
            dragImage.style.opacity = '0.5';
        }
    }, 0);
  };

  const handleDragEnd = (e: DragEvent<HTMLImageElement>) => {
    (e.target as HTMLElement).style.opacity = '1';
    setDraggedBagId(null);
    setDragOverCheckpoint(null);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, checkpoint: string) => {
    e.preventDefault();
    const bagId = e.dataTransfer.getData('text/plain');
    if (bagId) {
      onUpdateBaggage(bagId, checkpoint);
      setSelectedBagId(''); // Reset selector after dropping
    }
    setDragOverCheckpoint(null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // This is necessary to allow dropping
  };
  
  const handleDragEnter = (checkpoint: string) => {
    if (draggedBagId) {
      setDragOverCheckpoint(checkpoint);
    }
  };

  const handleDragLeave = () => {
    setDragOverCheckpoint(null);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col">
      <h3 className="text-2xl font-bold mb-4">Baggage Simulator</h3>
      <div className="mb-4">
        <label htmlFor="baggage-select" className="block text-sm font-medium text-slate-700 mb-1">
          Select Baggage to Simulate
        </label>
        <select
          id="baggage-select"
          value={selectedBagId}
          onChange={(e) => setSelectedBagId(e.target.value)}
          className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>-- Select a Bag --</option>
          {allBaggageIds.map((id) => (
            <option key={id} value={id}>
              {id} - {getBaggageById(id)?.location || 'Unknown'}
            </option>
          ))}
        </select>
      </div>

      <div className="my-4 p-4 border-2 border-dashed border-slate-300 rounded-lg min-h-[120px] flex justify-center items-center">
        {selectedBagId ? (
          <div className="text-center">
            <img
              src={SUITCASE_IMAGE_URI}
              alt="Draggable suitcase"
              className="h-20 w-auto mx-auto cursor-grab"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, selectedBagId)}
              onDragEnd={handleDragEnd}
            />
            <p className="text-sm text-slate-500 mt-2">Drag this bag to a checkpoint</p>
          </div>
        ) : (
          <p className="text-slate-500">Select a bag to begin</p>
        )}
      </div>
      
      <div className="flex-1 space-y-2 overflow-y-auto">
        <h4 className="font-semibold text-slate-700">Checkpoints (Drop Zones)</h4>
        {CHECKPOINTS.map((checkpoint) => (
          <div
            key={checkpoint}
            onDrop={(e) => handleDrop(e, checkpoint)}
            onDragOver={handleDragOver}
            onDragEnter={() => handleDragEnter(checkpoint)}
            onDragLeave={handleDragLeave}
            className={`p-4 rounded-md transition-colors duration-200 ${
              dragOverCheckpoint === checkpoint 
              ? 'bg-blue-100 border-blue-500 border-2 border-dashed' 
              : 'bg-slate-100 border-slate-200 border'
            }`}
          >
            {checkpoint}
          </div>
        ))}
      </div>
    </div>
  );
};