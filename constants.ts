
import type { Passenger, Baggage } from './types';

export const CHECKPOINTS: string[] = [
  'Checked In',
  'Security Screening',
  'Sorted at Hub',
  'Loaded onto Aircraft',
  'Arrived at Destination',
  'On Carousel',
  'Collected',
];

const generateBaggage = (ids: string[]): Baggage[] => ids.map(id => ({
  id,
  location: 'Checked In',
  lastSeen: new Date().toISOString(),
  weightKg: Math.floor(Math.random() * 8) + 15, // 15-22 kg
}));

export const ALL_BAGGAGE: Baggage[] = generateBaggage([
  'FR12345', 'FR12346', 'FR23456', 'FR34567', 'FR34568',
  'FR45678', 'FR56789', 'FR67890', 'FR78901', 'FR89012',
  'FR90123', 'FR98765', 'FR87654', 'FR76543', 'FR65432',
  'FR54321', 'FR43210', 'FR19283', 'FR48576', 'FR29384',
]);

export const INITIAL_PASSENGERS: Passenger[] = [
  { pnr: 'ABC123', firstName: 'John', lastName: 'Doe', flightNumber: 'FR789', seat: '12A', baggageIds: ['FR12345', 'FR12346'] },
  { pnr: 'DEF456', firstName: 'Jane', lastName: 'Smith', flightNumber: 'FR789', seat: '12B', baggageIds: ['FR23456'] },
  { pnr: 'GHI789', firstName: 'Peter', lastName: 'Jones', flightNumber: 'FR456', seat: '18C', baggageIds: ['FR34567', 'FR34568'] },
  { pnr: 'JKL012', firstName: 'Mary', lastName: 'Williams', flightNumber: 'FR456', seat: '22D', baggageIds: ['FR45678'] },
  { pnr: 'MNO345', firstName: 'David', lastName: 'Brown', flightNumber: 'FR123', seat: '5F', baggageIds: ['FR56789'] },
  { pnr: 'PQR678', firstName: 'Susan', lastName: 'Miller', flightNumber: 'FR123', seat: '30A', baggageIds: ['FR67890'] },
  { pnr: 'STU901', firstName: 'Michael', lastName: 'Davis', flightNumber: 'FR789', seat: '14E', baggageIds: ['FR78901'] },
  { pnr: 'VWX234', firstName: 'Linda', lastName: 'Garcia', flightNumber: 'FR789', seat: '15A', baggageIds: ['FR89012'] },
  { pnr: 'YZA567', firstName: 'Robert', lastName: 'Rodriguez', flightNumber: 'FR456', seat: '19B', baggageIds: ['FR90123'] },
  { pnr: 'BCD890', firstName: 'Patricia', lastName: 'Martinez', flightNumber: 'FR456', seat: '25G', baggageIds: ['FR98765'] },
  { pnr: 'EFG123', firstName: 'James', lastName: 'Hernandez', flightNumber: 'FR123', seat: '8B', baggageIds: ['FR87654', 'FR76543'] },
  { pnr: 'HIJ456', firstName: 'Jennifer', lastName: 'Lopez', flightNumber: 'FR123', seat: '9C', baggageIds: ['FR65432'] },
  { pnr: 'KLM789', firstName: 'William', lastName: 'Gonzalez', flightNumber: 'FR789', seat: '21F', baggageIds: ['FR54321'] },
  { pnr: 'NOP012', firstName: 'Richard', lastName: 'Wilson', flightNumber: 'FR456', seat: '11A', baggageIds: ['FR43210'] },
  { pnr: 'QRS345', firstName: 'Jessica', lastName: 'Anderson', flightNumber: 'FR123', seat: '2A', baggageIds: ['FR19283'] },
];

export const ALL_PASSENGER_BAGGAGE_IDS = INITIAL_PASSENGERS.flatMap(p => p.baggageIds);
