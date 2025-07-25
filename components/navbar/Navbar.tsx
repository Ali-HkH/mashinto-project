import NavSearch from "./NavSearch";
import LinksDropdown from "./LinksDropdown";
import DarkMode from "./DarkMode";
import Logo from "./Logo";
import { Suspense } from "react";

function Navbar() {
   return (
      <nav className="border-b">
         <div className="container flex flex-col items-center md:flex-row  md:justify-between md:items-center flex-wrap gap-4 py-8">
            <Logo />
            <Suspense
               fallback={
                  <div className="w-48 h-10 bg-gray-200 animate-pulse" />
               }
            >
               <NavSearch />
            </Suspense>
            <div className="flex gap-6 items-center justify-between w-full md:w-auto">
               <DarkMode />
               <LinksDropdown />
            </div>
         </div>
      </nav>
   );
}

export default Navbar;
