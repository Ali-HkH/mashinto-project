import EmptyList from "@/components/home/EmptyList";
import { deleteReviewAction, fetchCarReviewsByUser } from "@/utils/actions";
import ReviewCard from "@/components/reviews/ReviewCard";
import Title from "@/components/cars/Title";
import FormContainer from "@/components/form/FormContainer";
import { IconButton } from "@/components/form/Buttons";

async function ReviewsPage() {
   const reviews = await fetchCarReviewsByUser();
   if (reviews.length === 0) return <EmptyList />;

   return (
      <>
         <Title text="بازخورد های شما" />
         <section className="grid md:grid-cols-2 gap-8 mt-4 ">
            {reviews.map((review) => {
               const { comment, rating } = review;
               const { company, model, image } = review.car;
               const name = `${company} ${model}`;
               const reviewInfo = {
                  comment,
                  rating,
                  name,
                  image,
               };
               return (
                  <ReviewCard key={review.id} reviewInfo={reviewInfo}>
                     <DeleteReview reviewId={review.id} />
                  </ReviewCard>
               );
            })}
         </section>
      </>
   );
}

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
   const deleteReview = deleteReviewAction.bind(null, { reviewId });
   return (
      <FormContainer action={deleteReview}>
         <IconButton actionType="delete" />
      </FormContainer>
   );
};

export default ReviewsPage;
