import React from "react";
import Logo from "../navbar/Logo";
import FooterList from "./FooterList";
import FooterSocials from "./FooterSocials";

function Footer() {
   return (
      <footer className="border-t mt-8 pr-6">
         <div className="py-3 flex flex-col items-start">
            <FooterList />
            <FooterSocials />
            <p className="text-sm text-gray-400"><span>&copy;</span>تمامی حقوق محفوظ است</p>
         </div>
      </footer>
   );
}

export default Footer;
