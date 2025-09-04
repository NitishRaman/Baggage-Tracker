
export interface Baggage {
  id: string;
  location: string;
  lastSeen: string; // ISO 8601 timestamp
  weightKg: number;
}

export interface Passenger {
  pnr: string;
  firstName: string;
  lastName:string;
  flightNumber: string;
  seat: string;
  baggageIds: string[];
}

export interface BaggageWithDetails extends Baggage {
  passengerName: string;
  pnr: string;
}

export interface PassengerApi {
  getAll: () => Passenger[];
  getByPnr: (pnr: string) => Passenger | undefined;
  getBaggageById: (bagId: string) => BaggageWithDetails | undefined;
}
