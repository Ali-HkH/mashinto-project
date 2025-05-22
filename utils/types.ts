export type ActionFunction = (
   prevState: any,
   formData: FormData
) => Promise<{ message: string }>;

export type CarCardProps = {
   id: string;
   company: string;
   model: string;
   tagline: string;
   image: string;
   city: string;
   price: number;
};

export type DateRangeSelect = {
  startDate: Date;
  endDate: Date;
  key: string;
};

export type Booking = {
  checkIn: Date;
  checkOut: Date;
};