import { FaStar } from 'react-icons/fa';

async function CarRating({
  carId,
  inPage,
}: {
  carId: string;
  inPage: boolean;
}) {
  // temp
  const rating = 4.7;
  const count = 100;
  const id =  carId

  const className = `flex gap-1 items-center ${inPage ? 'text-md' : 'text-xs'} ${id}`;
  const countText = count > 1 ? 'بازخوردها' : 'بازخورد';
  const countValue = `(${count}) ${inPage ? countText : ''}`;
  return (
    <span className={className}>
      <FaStar className='w-3 h-3' style={{color:"#408BFF"}}/>
      {rating} {countValue}
    </span>
  );
}

export default CarRating;