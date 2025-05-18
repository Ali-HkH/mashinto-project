import NavSearch from "./NavSearch";
import LinksDropdown from "./LinksDropdown";
import DarkMode from "./DarkMode";
import Logo from "./Logo";
import { Suspense } from "react";

function Navbar() {
   return (
      <nav className="border-b">
         <div className="container flex flex-col sm:flex-row  sm:justify-between sm:items-center flex-wrap gap-4 py-8">
            <Logo />
            <Suspense
               fallback={
                  <div className="w-48 h-10 bg-gray-200 animate-pulse" />
               }
            >
               <NavSearch />
            </Suspense>
            <div className="flex gap-6 items-center ">
               <DarkMode />
               <LinksDropdown />
            </div>
         </div>
      </nav>
   );
}

export default Navbar;
