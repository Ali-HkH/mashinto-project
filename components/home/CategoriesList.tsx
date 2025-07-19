import { categories } from "@/utils/categories";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Link from "next/link";
import { BsFillCarFrontFill } from "react-icons/bs";

function CategoriesList({
   category,
   search,
}: {
   category?: string;
   search?: string;
}) {
   const searchTerm = search ? `&search=${search}` : "";
   return (
      <section>
         <ScrollArea className="py-6">
            <div className="flex justify-center items-center flex-row-reverse gap-x-2 md:gap-x-5 lg:gap-x-10">
               <Link href="/">
                  <article className="p-3 flex flex-col items-center w-[100px] cursor-pointer duration-300  hover:text-primary">
                     <BsFillCarFrontFill style={{ width: "35px", height: "35px" }}/>
                     <p className="text-[16px] mt-1.5">همه نوع</p>
                  </article>
               </Link>
               {categories.map((item) => {
                  const isActive = item.label === category;
                  return (
                     <Link
                        key={item.label}
                        href={`/?category=${item.label}${searchTerm}`}
                     >
                        <article
                           className={`p-3 flex flex-col items-center w-[100px] cursor-pointer duration-300  hover:text-primary  ${
                              isActive ? "text-primary" : ""
                           }`}
                        >
                           <item.icon
                              style={{ width: "45px", height: "45px" }}
                           />
                           <p className="text-[16px]">{item.label}</p>
                        </article>
                     </Link>
                  );
               })}
            </div>
            <ScrollBar orientation="horizontal" />
         </ScrollArea>
      </section>
   );
}
export default CategoriesList;
