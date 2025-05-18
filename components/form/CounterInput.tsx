"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { LuMinus, LuPlus } from "react-icons/lu";
import { Button } from "../ui/button";
import { useState } from "react";

function CounterInput({
   name,
   detail,
   defaultValue,
}: {
   name: string;
   detail: string;
   defaultValue?: number;
}) {
   const [count, setCount] = useState(defaultValue || 0);
   const increaseCount = () => {
      setCount((prevCount) => prevCount + 1);
   };
   const decreaseCount = () => {
      setCount((prevCount) => {
         if (prevCount > 0) {
            return prevCount - 1;
         }
         return prevCount;
      });
   };
   return (
      <Card className="mb-4 w-full">
         <input type="hidden" name={name} value={count} />
         <CardHeader className="flex flex-col gapy-5">
            <div className="w-full flex items-center justify-between flex-wrap">
               <div className="flex flex-col">
                  <h2 className="font-medium">{detail}</h2>
                  <p className="text-muted-foreground text-sm">
                     تعداد {detail} را مشخص کنید
                  </p>
               </div>
               <div className="flex items-center gap-4">
                  <Button
                     variant="outline"
                     size="icon"
                     type="button"
                     onClick={decreaseCount}
                  >
                     <LuMinus className="w-5 h-5 text-primary" />
                  </Button>
                  <span className="text-xl font-bold w-5 text-center">
                     {count}
                  </span>
                  <Button
                     variant="outline"
                     size="icon"
                     type="button"
                     onClick={increaseCount}
                  >
                     <LuPlus className="w-5 h-5 text-primary" />
                  </Button>
               </div>
            </div>
         </CardHeader>
      </Card>
   );
}

export default CounterInput;
