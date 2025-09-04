
import type { Passenger, Baggage } from '../types';
import { ALL_BAGGAGE } from '../constants';

const BAGGAGE_STORAGE_KEY = 'flyright_baggage_data';

// --- Baggage Data Persistence ---

const getBaggageFromStorage = (): Baggage[] => {
  try {
    const storedData = localStorage.getItem(BAGGAGE_STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData);
    }
  } catch (error) {
    console.error("Failed to read from localStorage", error);
    localStorage.removeItem(BAGGAGE_STORAGE_KEY); // Clear corrupted data
  }
  
  // Initialize from constants if no valid data is in storage
  const initialData = ALL_BAGGAGE.map(b => ({ ...b }));
  localStorage.setItem(BAGGAGE_STORAGE_KEY, JSON.stringify(initialData));
  return initialData;
};

const saveBaggageToStorage = (bags: Baggage[]): void => {
  try {
    localStorage.setItem(BAGGAGE_STORAGE_KEY, JSON.stringify(bags));
  } catch (error) {
    console.error("Failed to save to localStorage", error);
  }
};


// --- Exported Service Functions ---

// This function simulates an API call that returns all passengers. Data is static.
export const getAllPassengers = (passengers: Passenger[]): Passenger[] => {
  return passengers;
};

// This function simulates an API call to get a single passenger by PNR. Data is static.
export const getPassengerByPnr = (passengers: Passenger[], pnr: string): Passenger | undefined => {
  return passengers.find(p => p.pnr.toLowerCase() === pnr.toLowerCase());
};

// Fetches a single baggage item from the persistent store.
export const getRawBaggageById = (bagId: string): Baggage | undefined => {
  const allBags = getBaggageFromStorage();
  return allBags.find(b => b.id === bagId);
};

// Updates a bag's location in the persistent store.
export const updateBaggageLocation = (bagId: string, checkpoint: string): boolean => {
  const allBags = getBaggageFromStorage();
  const bagIndex = allBags.findIndex(b => b.id === bagId);

  if (bagIndex !== -1) {
    allBags[bagIndex] = {
      ...allBags[bagIndex],
      location: checkpoint,
      lastSeen: new Date().toISOString(),
    };
    saveBaggageToStorage(allBags);
    return true;
  }
  return false;
};
