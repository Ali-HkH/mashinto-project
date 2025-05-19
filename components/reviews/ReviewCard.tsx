import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Rating from "./Rating";
import Comment from "./Comment";

type ReviewCardProps = {
   reviewInfo: {
      comment: string;
      rating: number;
      company: string;
      model: string;
      image: string;
   };
   children?: React.ReactNode;
};

function ReviewCard({ reviewInfo, children }: ReviewCardProps) {
   return (
      <Card className="relative">
         <CardHeader>
            <div className="flex items-center">
               <img
                  src={reviewInfo.image}
                  alt="profile"
                  className="w-14 h-14 rounded-full object-cover"
               />
               <div className="mr-6">
                  <h3 className="text-sm font-bold mb-2">
                     {reviewInfo.company} {reviewInfo.model}
                  </h3>
                  <Rating rating={reviewInfo.rating} />
               </div>
            </div>
         </CardHeader>
         <CardContent>
            <Comment comment={reviewInfo.comment} />
         </CardContent>
         <div className="absolute top-3 left-3">{children}</div>
      </Card>
   );
}
export default ReviewCard;
