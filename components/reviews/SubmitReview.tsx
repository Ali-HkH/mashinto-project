"use client";
import { useState } from "react";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { Card } from "@/components/ui/card";
import RatingInput from "@/components/form/RatingInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { Button } from "@/components/ui/button";
import { createReviewAction } from "@/utils/actions";

function SubmitReview({ carId }: { carId: string }) {
   const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

   return (
      <div className="mt-8">
         <Button className="dark:text-white" onClick={() => setIsReviewFormVisible((prev) => !prev)}>
            بازخوردی ثبت کنید
         </Button>
         {isReviewFormVisible && (
            <Card className="p-8 mt-8">
               <FormContainer action={createReviewAction}>
                  <input type="hidden" name="carId" value={carId} />
                  <RatingInput labelText="امتیاز شما" name="rating" />
                  <TextAreaInput
                     name="comment"
                     labelText="نظر شما راجب این خودرو"
                     defaultValue="راضی بودم و کار راه انداز بود"
                  />
                  <SubmitButton text="ثبت بازخورد" className="mt-4" />
               </FormContainer>
            </Card>
         )}
      </div>
   );
}

export default SubmitReview;
