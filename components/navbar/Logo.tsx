import Link from 'next/link';
import { Button } from '../ui/button';
import { BsFillCarFrontFill } from "react-icons/bs";


function Logo() {
  return (
    <div className='text-2xl flex items-center gap-2'>
    <Button size='sm' asChild>
      <Link href='/'>
        <BsFillCarFrontFill style={{width: "30px", height: "30px"}}/>
      </Link>
    </Button>
      <h1 className='font-bold text-primary'>ماشینتو</h1>
    </div>
    
  )
}

export default Logo