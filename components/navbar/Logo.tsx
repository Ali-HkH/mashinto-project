import Link from 'next/link';
import { Button } from '../ui/button';
import { NounLogo } from '@/utils/icons';

function Logo() {
  return (
    <div className='text-2xl flex items-center justify-center gap-2'>
    <Button size='sm' asChild>
      <Link href='/'>
        <NounLogo style={{width: "60px", height: "80px"}}/>
      </Link>
    </Button>
      <h1 className='font-bold text-primary'>ماشینتو</h1>
    </div>
    
  )
}

export default Logo