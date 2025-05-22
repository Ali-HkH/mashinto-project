type NavLink = {
   href: string;
   label: string;
};

export const links: NavLink[] = [
   { href: "/", label: "خانه" },
   { href: "/favorites ", label: "مورد علاقه" },
   { href: "/bookings ", label: "کرایه ها" },
   { href: "/reviews ", label: "بازخورد ها" },
   { href: "/rentals/create ", label: "ایجاد اجاره" },
   { href: "/rentals", label: "اجاره های من" },
   { href: "/profile ", label: "نمایه" },
];
