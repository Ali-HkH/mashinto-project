import { calculateTotals } from "@/utils/calculateTotals";
import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRentalCar } from "@/utils/store";
import { formatCurrency } from "@/utils/formats";

function BookingForm() {
   const { range, price } = useRentalCar((state) => state);
   const checkIn = range?.from as Date;
   const checkOut = range?.to as Date;

   const { totalDays, subTotal, carwash, service, tax, orderTotal } =
      calculateTotals({
         checkIn,
         checkOut,
         price,
      });

   return (
      <Card className="p-8 mb-4">
         <CardTitle className="mb-8">صورت حساب</CardTitle>
         <FormRow
            label={
               [
                  price.toLocaleString("fa-IR"),
                  "تومان",
                  "×",
                  totalDays,
                  "روز",
               ].join("\u00A0") // Non-breaking space
            }
            amount={subTotal}
         />
         <FormRow label="هزینه کارواش" amount={carwash} />
         <FormRow label="هزینه سرویس" amount={service} />
         <FormRow label="مالیات" amount={tax} />
         <Separator className="mt-4" />
         <CardTitle className="mt-4">
            <FormRow label="هزینه کل اجاره" amount={orderTotal} />
         </CardTitle>
      </Card>
   );
}

function FormRow({ label, amount }: { label: string; amount: number }) {
   return (
      <p className="flex justify-between text-sm">
         <span>{label}</span>
         <span>{formatCurrency(amount)}</span>
      </p>
   );
}

export default BookingForm;
