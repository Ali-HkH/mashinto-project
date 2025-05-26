import { fetchStats } from "@/utils/actions";
import StatsCard from "./StatsCard";
import Link from "next/link";

async function StatsContainer() {
   const data = await fetchStats();

   return (
      <div className="mt-8 grid md:grid-cols-2 gap-4 lg:grid-cols-4">
         <Link href="admin/users" className="group">
            <StatsCard title="کاربران" value={data?.usersCount || 0} />
         </Link>
         <Link href="admin/rentals" className="group">
            <StatsCard title="اجاره ها" value={data?.carsCount || 0} />
         </Link>
         <Link href="admin" className="group">
            <StatsCard title="کرایه ها" value={data?.bookingsCount || 0} />
         </Link>
         <Link href="admin/reviews" className="group">
            <StatsCard title="بازخورد ها" value={data?.reviewsCount || 0} />
         </Link>
      </div>
   );
}
export default StatsContainer;
