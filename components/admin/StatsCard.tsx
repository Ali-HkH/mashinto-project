import { Card, CardHeader } from "@/components/ui/card";

type StatsCardsProps = {
   title: string;
   value: number;
};

function StatsCards({ title, value }: StatsCardsProps) {
   return (
      <Card className="bg-muted group-hover:bg-muted-foreground">
         <CardHeader className="flex flex-row justify-between items-center">
            <h3 className="text-3xl font-bold group-hover:text-muted">{title}</h3>
            <span className="text-primary text-5xl font-extrabold">
               {value}
            </span>
         </CardHeader>
      </Card>
   );
}

export default StatsCards;
