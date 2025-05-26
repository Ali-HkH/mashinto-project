import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Rating from "./Rating";
import Comment from "./Comment";
import Image from "next/image";

type ReviewCardProps = {
   reviewInfo: {
      comment: string;
      rating: number;
      name: string;
      image: string;
   };
   children?: React.ReactNode;
};

function ReviewCard({ reviewInfo, children }: ReviewCardProps) {
   return (
      <Card className="relative">
         <CardHeader>
            <div className="flex items-center">
               <Image
                  src={reviewInfo.image}
                  alt="profile"
                  loading="lazy"
                  className="w-16 h-16 rounded-full object-cover"
                  width={64}
                  height={64}
               />
               <div className="mr-6">
                  <h3 className="text-sm font-bold mb-2">{reviewInfo.name}</h3>
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
