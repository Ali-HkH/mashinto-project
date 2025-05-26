"use client";

import { useState } from "react";
import { Button } from "../ui/button";

function UserReview({ review }: { review: string }) {
   const [isFullReview, setIsFullReview] = useState(false);

   const words = review.split(" ");
   const isLongReview = words.length > 10;
   const reviewInTable =
      isLongReview && !isFullReview
         ? words.slice(0, 10).join(" ") + "..."
         : review;

   const toggleReview = () => {
      setIsFullReview(!isFullReview);
   };

   return (
      <div>
         <p className="text-muted-foreground font-light leading-loose max-w-[415px] whitespace-normal break-words">
            {reviewInTable}
         </p>
         {isLongReview && (
            <Button variant="link" onClick={toggleReview}>
               {isFullReview ? "نمایش کمتر" : "نمایش بیشتر"}
            </Button>
         )}
      </div>
   );
}

export default UserReview;
