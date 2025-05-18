import CategoriesList from "@/components/home/CategoriesList";
import CarsContainer from "@/components/home/CarsContainer";
import LoadingCards from "@/components/card/LoadingCards";
import { Suspense } from "react";

interface PageProps {
   searchParams: Promise<{ category?: string; search?: string }>;
}

async function HomePage({ searchParams }: PageProps) {
   const { category, search } = await searchParams;

   return (
      <section>
         <CategoriesList category={category} search={search} />
         <Suspense fallback={<LoadingCards />}>
            <CarsContainer category={category} search={search} />
         </Suspense>
      </section>
   );
}

export default HomePage;
