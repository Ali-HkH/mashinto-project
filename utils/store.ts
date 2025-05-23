import { create } from 'zustand';
import { Booking } from './types';
import { DateRange } from 'react-day-picker';
// Define the state's shape
type RentalCarState = {
  carId: string;
  userId?: string;
  price: number;
  bookings: Booking[];
  range: DateRange | undefined;
};

// Create the store
export const useRentalCar = create<RentalCarState>(() => {
  return {
    carId: '',
    userId: '',
    price: 0,
    bookings: [],
    range: undefined,
  };
});