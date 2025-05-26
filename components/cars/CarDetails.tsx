type CarDetailsProps = {
  details: {
    seats: number;
    doors: number;
    fuelType: string;
    transmission: string;
  };
};

function CarDetails({
  details: { seats, doors, fuelType, transmission },
}: CarDetailsProps) {
  return (
    <p className='flex items-center gap-x-2.5 text-sm font-light '>
      <span className="px-1 py-0.5 bg-primary text-white rounded">{`${seats} سرنشین`}</span>
      <span className="px-1 py-0.5 bg-primary text-white rounded">{`${doors} در`}</span>
      <span className="px-1 py-0.5 bg-primary text-white rounded">{`سوخت ${fuelType}`}</span>
      <span className="px-1 py-0.5 bg-primary text-white rounded">{`${transmission}`}</span>
    </p>
  );
}
export default CarDetails;