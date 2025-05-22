import { DynamicBookingWrapper } from "@/components/booking/DynamicBookingWrapper";
import CarRating from "@/components/card/CarRating";
import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import Amenities from "@/components/cars/Amenities";
import BreadCrumbs from "@/components/cars/BreadCrumbs";
import CarDetails from "@/components/cars/CarDetails";
import Description from "@/components/cars/Description";
import DynamicCarMap from "@/components/cars/DynamicCarMap";
import ImageContainer from "@/components/cars/ImageContainer";
import ShareButton from "@/components/cars/ShareButton";
import UserInfo from "@/components/cars/UserInfo";
import CarReviews from "@/components/reviews/CarReviews";
import SubmitReview from "@/components/reviews/SubmitReview";
import { fetchCarDetails, findExistingReview } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { redirect } from "next/navigation";

interface PageProps {
   params: Promise<{ id: string }>;
}

async function PropertyDetailsPage({ params }: PageProps) {
   const { id } = await params;
   const car = await fetchCarDetails(id);
   if (!car) redirect("/");

   // allow review :
   const { userId } = await auth();
   const isNotOwner = car.profile.clerkId !== userId;
   const reviewDoesNotExist =
      userId && isNotOwner && !(await findExistingReview(userId, car.id));

   const { doors, seats, transmission, fuelType } = car;
   const details = { doors, seats, transmission, fuelType };

   const firstName = car.profile.firstName;
   const profileImage = car.profile.profileImage;

   return (
      <section>
         <BreadCrumbs name={`${car.company} ${car.model}`} />
         <header className="flex justify-between items-center mt-4">
            <h1 className="text-4xl font-bold ">{car.tagline}</h1>
            <div className="flex items-center gap-x-4">
               <ShareButton
                  name={`${car.company} ${car.model}`}
                  carId={car.id}
               />
               <FavoriteToggleButton carId={car.id} />
            </div>
         </header>
         <ImageContainer
            mainImage={car.image}
            name={`${car.company} ${car.model}`}
         />
         <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
            <div className="lg:col-span-8">
               <div className="flex gap-x-4 items-center mb-3">
                  <h1 className="text-xl font-bold">{`${car.company} ${car.model}`}</h1>
                  <CarRating inPage carId={car.id} />
               </div>
               <CarDetails details={details} />
               <UserInfo profile={{ firstName, profileImage }} />
               <Separator className="mt-4" />
               <Description description={car.description} />
               <Amenities amenities={car.amenities} />
               <DynamicCarMap cityName={car.city} />
            </div>
            <div className="lg:col-span-4 flex flex-col items-center">
               <DynamicBookingWrapper
                  carId={car.id}
                  price={car.price}
                  bookings={car.bookings}
               />
            </div>
         </section>
         {reviewDoesNotExist && <SubmitReview carId={car.id} />}
         <CarReviews carId={car.id} />
      </section>
   );
}
export default PropertyDetailsPage;
