"use client"
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";

export const DynamicBookingWrapper = dynamic(
   () => import("@/components/booking/BookingWrapper"),
   {
      ssr: false,
      loading: () => <Skeleton className="h-[200px] w-full" />,
   }
);
