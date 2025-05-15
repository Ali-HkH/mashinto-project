import { auth } from "@clerk/nextjs/server";
import { CardSignInButton } from "../form/Buttons";
import { fetchFavoriteId } from "@/utils/actions";
import FavoriteToggleForm from "./FavoriteToggleForm";

async function FavoriteToggleButton({ carId }: { carId: string }) {
   const { userId } = await auth();
   
   if (!userId) return <CardSignInButton />;

    const favoriteId = await fetchFavoriteId({ carId });

  return <FavoriteToggleForm favoriteId={favoriteId} carId={carId} />;
}
export default FavoriteToggleButton;
