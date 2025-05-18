"use client";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

export default function BookingCalendar() {
   const currentDate = new Date();
   const defaultSelected: DateRange = {
      from: undefined,
      to: undefined,
   };
   const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

   return (
      <div dir="ltr" className="p-4">
         <Calendar
            className="ltr text-left "
            classNames={calendarClassOverride}
            id="test"
            mode="range"
            defaultMonth={currentDate}
            selected={range}
            onSelect={setRange}
         />
      </div>
   );
}

const calendarClassOverride = {
   months: "relative border p-5 rounded-lg pt-2",
   month: "space-y-3",
   nav: "absolute left-0 top-5 w-full flex items-center justify-between z-10",
   button_previous: "ml-2 p-1 hover:bg-gray-300 bg-white rounded",
   button_next: "mr-2 p-1 hover:bg-gray-300 bg-white rounded",
   chevron: "h-5 w-5",
   month_caption: "flex justify-center pt-2 relative items-center",
   caption_label: "text-lg font-medium",
   dropdowns: "flex justify-center gap-x-4",
   weekdays: "grid grid-cols-7 text-center border-b",
   weekday: "py-2 text-sm font-semibold",
   week: "grid grid-cols-7 mt-3",
   day: "w-full h-full flex items-center justify-center rounded hover:bg-primary px-1",
   selected:
      "bg-primary text-black dark:text-white hover:text-white dark:hover:text-black",
   today: "border border-blue-500 text-blue-600",
   outside: "text-muted-foreground opacity-50",
   disabled: "text-muted-foreground opacity-50",
   range_middle:
      "aria-selected:bg-accent aria-selected:text-accent-foreground aria-selected:hover:bg-primary",
   hidden: "invisible",
};
