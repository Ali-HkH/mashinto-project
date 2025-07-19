import React from "react";
import FooterList from "./FooterList";
import FooterSocials from "./FooterSocials";

function Footer() {
   return (
      <footer className="border-t">
         <div className="container flex flex-col items-start py-6">
            <FooterList />
            <FooterSocials />
            <p className="text-sm text-gray-400"><span>&copy;</span>تمامی حقوق محفوظ است</p>
         </div>
      </footer>
   );
}

export default Footer;
