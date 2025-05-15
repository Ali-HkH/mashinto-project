import EmptyList from "@/components/home/EmptyList";
import CarsList from "@/components/home/CarsList";
import { fetchFavorites } from "@/utils/actions";

async function FavoritesPage() {
   const favorites = await fetchFavorites();

   if (favorites.length === 0) {
      return <EmptyList />;
   }

   return <CarsList cars={favorites} />;
}
export default FavoritesPage;
