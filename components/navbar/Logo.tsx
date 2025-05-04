import Link from 'next/link';
import { Button } from '../ui/button';
import { BsFillCarFrontFill } from "react-icons/bs";


function Logo() {
  return (
    <Button size='icon' asChild>
      <Link href='/'>
        <BsFillCarFrontFill style={{width: "25px", height: "25px"}}/>
      </Link>
    </Button>
  )
}

export default Logo