export const formatCurrency = (amount: number | null) => {
   const value = amount || 0;
   return new Intl.NumberFormat("fa-IR", {
      style: "currency",
      currency: "IRR",
      currencyDisplay: "name",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
   })
      .format(value)
      .replace(/ریال ایران/g, "تومان");
};

export const formatDate = (date: Date, onlyMonth?: boolean) => {
   const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
   };
   if (!onlyMonth) {
      options.day = "numeric";
   }

   return new Intl.DateTimeFormat("en-US", options).format(date);
};
