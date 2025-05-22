import {
   fetchRentalDetails,
   updateCarImageAction,
   updateCarInfoAction,
} from "@/utils/actions";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import CategoriesInput from "@/components/form/CategoriesInput";
import NumberInput from "@/components/form/NumberInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import CitiesInput from "@/components/form/CitiesInput";
import CounterInput from "@/components/form/CounterInput";
import AmenitiesInput from "@/components/form/AmenitiesInput";
import { SubmitButton } from "@/components/form/Buttons";
import { redirect } from "next/navigation";
import { type Amenity } from "@/utils/amenities";
import ImageInputContainer from "@/components/form/ImageInputContainer";
import TransmissionInput from "@/components/form/TransmissionInput";
import FuelTypeInput from "@/components/form/FuelTypeInput";

interface PageProps {
   params: Promise<{ id: string }>;
}

async function EditRentalPage({ params }: PageProps) {
   const { id } = await params;
   const car = await fetchRentalDetails(id);

   if (!car) redirect("/");

   const defaultAmenities: Amenity[] = JSON.parse(car.amenities);

   return (
      <section>
         <h1 className="text-2xl font-semibold mb-8">
            ویرایش اطلاعات خودرو
         </h1>
         <div className="border p-8 rounded-md space-y-6">
            <ImageInputContainer
               name={`${car.company} ${car.model}`}
               text="ویرایش عکس"
               action={updateCarImageAction}
               image={car.image}
            >
               <input type="hidden" name="id" value={car.id} />
            </ImageInputContainer>

            <FormContainer action={updateCarInfoAction}>
               <input type="hidden" name="id" value={car.id} />
               <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <FormInput
                     name="company"
                     type="text"
                     label="شرکت (20حرف)"
                     defaultValue={car.company}
                  />
                  <FormInput
                     name="model"
                     type="text"
                     label="مدل (20حرف)"
                     defaultValue={car.model}
                  />
                  <NumberInput
                     name="year"
                     label="سال ساخت"
                     defaultValue={car.year}
                  />
                  <NumberInput
                     name="kilometer"
                     label="کارکرد(کیلومتر)"
                     defaultValue={car.kilometer}
                  />
                  <FormInput
                     name="color"
                     type="text "
                     label="رنگ (15 حرف)"
                     defaultValue={car.color}
                  />
                  <NumberInput
                     name="price"
                     label="مبلغ(تومان)"
                     defaultValue={car.price}
                  />
                  <FormInput
                     name="tagline"
                     type="text "
                     label="شعار (30حرف)"
                     defaultValue={car.tagline}
                  />
               </div>
               <TextAreaInput
                  name="description"
                  labelText="توضیحات (10 تا 1000 کلمه)"
                  defaultValue={car.description}
               />
               <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <CategoriesInput defaultValue={car.category} />
                  <TransmissionInput defaultValue={car.transmission} />
                  <FuelTypeInput defaultValue={car.fuelType} />
                  <CitiesInput defaultValue={car.city} />
               </div>
               <h3 className="text-lg mt-10 mb-6 font-medium">ظرفیت</h3>
               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-x-8">
                  <CounterInput
                     detail="سرنشین"
                     name="seats"
                     defaultValue={car.seats}
                  />
                  <CounterInput
                     detail="در"
                     name="doors"
                     defaultValue={car.doors}
                  />
               </div>
               <h3 className="text-lg mt-10 mb-6 font-medium">امکانات رفاهی</h3>
               <AmenitiesInput defaultValue={defaultAmenities} />
               <SubmitButton text="بروزرسانی اجاره" className="mt-12" />
            </FormContainer>
         </div>
      </section>
   );
}
export default EditRentalPage;
