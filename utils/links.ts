type NavLink = {
   href: string;
   label: string;
};

export const links: NavLink[] = [
   { href: "/", label: "خانه" },
   { href: "/favorites", label: "مورد علاقه ها" },
   { href: "/rentals/create", label: "ایجاد اجاره" },
   { href: "/rentals", label: "اجاره های من" },
   { href: "/reservations", label: "اجاره های رزرو" },
   { href: "/bookings", label: "کرایه های من" },
   { href: "/reviews", label: "بازخورد های من" },
   { href: "/admin", label: "صفحه ادمین" },
   { href: "/profile", label: "نمایه" },
];
