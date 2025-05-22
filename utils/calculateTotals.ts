import { calculateDaysBetween } from '@/utils/calendar';

type BookingDetails = {
  checkIn: Date;
  checkOut: Date;
  price: number;
};

export const calculateTotals = ({
  checkIn,
  checkOut,
  price,
}: BookingDetails) => {

  const totalDays = calculateDaysBetween({ checkIn, checkOut });
  const subTotal = totalDays * price;
  const carwash = 100000;
  const service = totalDays * 50000;
  const tax = subTotal * 0.1;
  const orderTotal = subTotal + carwash + service + tax;
  return { totalDays, subTotal, carwash, service, tax, orderTotal };
};