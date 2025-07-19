function FooterList() {
   return (
      <ul className="flex flex-wrap items-center justify-start gap-2 md:gap-4 py-2">
         <li>
            <h1 className="text-2xl font-bold text-primary ml-8">ماشینتو</h1>
         </li>
         <li className="hover:cursor-pointer hover:text-primary duration-300">
            نرخ قیمت ها
         </li>
         <li>|</li>
         <li className="hover:cursor-pointer hover:text-primary duration-300">
            خبرنامه
         </li>
         <li>|</li>
         <li className="hover:cursor-pointer hover:text-primary duration-300">
            پشتیبانی
         </li>
         <li>|</li>
         <li className="hover:cursor-pointer hover:text-primary duration-300">
            درباره ما
         </li>
      </ul>
   );
}

export default FooterList;
