import React from "react";
import {
   BsFacebook,
   BsInstagram,
   BsLinkedin,
   BsTwitterX,
} from "react-icons/bs";

function FooterSocials() {
   return (
      <div className="flex items-center justify-start py-2">
         <h3 className="font-bold ml-4">در ارتباط باشید:</h3>
         <ul className="flex flex-wrap items-center justify-center gap-2">
            <li className="text-primary duration-300 hover:animate-bounce hover:cursor-pointer">
               <BsLinkedin size={20}/>
            </li>
            <li className="text-primary duration-300 hover:animate-bounce hover:cursor-pointer">
               <BsInstagram size={20}/>
            </li>
            <li className="text-primary duration-300 hover:animate-bounce hover:cursor-pointer">
               <BsTwitterX size={20}/>
            </li>
            <li className="text-primary duration-300 hover:animate-bounce hover:cursor-pointer">
               <BsFacebook size={20}/>
            </li>
         </ul>
      </div>
   );
}

export default FooterSocials;
