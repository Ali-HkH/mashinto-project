"use client";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ModeToggle() {
   const { setTheme } = useTheme();

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
               <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
               <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
               <span className="sr-only">تغییر تم</span>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="start">
            <DropdownMenuItem className="justify-end" onClick={() => setTheme("light")}>
               روشن
            </DropdownMenuItem>
            <DropdownMenuItem className="justify-end" onClick={() => setTheme("dark")}>
               تاریک
            </DropdownMenuItem>
            <DropdownMenuItem className="justify-end" onClick={() => setTheme("system")}>
               سیستم
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
