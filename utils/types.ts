export type ActionFunction = (
   prevState: any,
   formData: FormData
) => Promise<{ message: string }>;

export type CarCardProps = {
   id: string;
   company: string;
   model: string;
   tagline: string;
   image: string;
   city: string;
   price: number;
};
