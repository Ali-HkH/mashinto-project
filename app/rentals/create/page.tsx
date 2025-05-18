import FormInput from "@/components/form/FormInput";
import FormContainer from "@/components/form/FormContainer";
import { SubmitButton } from "@/components/form/Buttons";
import CategoriesInput from "@/components/form/CategoriesInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import TransmissionInput from "@/components/form/TransmissionInput";
import FuelTypeInput from "@/components/form/FuelTypeInput";
import NumberInput from "@/components/form/NumberInput";
import CitiesInput from "@/components/form/CitiesInput";
import CounterInput from "@/components/form/CounterInput";
import ImageInput from "@/components/form/ImageInput";
import { createRentalCarAction } from "@/utils/actions";
import AmenitiesInput from "@/components/form/AmenitiesInput";

function CreateCarRental() {
   return (
      <section>
         <h1 className="text-2xl font-semibold mb-8">ساخت خودرو اجاره ای</h1>
         <div className="border p-8 rounded-md">
            <h3 className="text-lg mb-4 font-medium">اطلاعات کلی</h3>
            <FormContainer action={createRentalCarAction}>
               <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <FormInput
                     name="company"
                     type="text"
                     label="شرکت (20حرف)"
                     defaultValue="آیکو"
                  />
                  <FormInput
                     name="model"
                     type="text"
                     label="مدل (20حرف)"
                     defaultValue="دنا"
                  />
                  <NumberInput
                     name="year"
                     label="سال ساخت"
                     defaultValue={1390}
                  />
                  <NumberInput
                     name="kilometer"
                     label="کارکرد(کیلومتر)"
                     defaultValue={30000}
                  />
                  <FormInput
                     name="color"
                     type="text "
                     label="رنگ (15 حرف)"
                     defaultValue="مشکی متالیک"
                  />
                  <NumberInput
                     name="price"
                     label="مبلغ(تومان)"
                     defaultValue={500000}
                  />
                  <FormInput
                     name="tagline"
                     type="text "
                     label="شعار (30حرف)"
                     defaultValue="راه تو را می خواند!"
                  />
                  <ImageInput />
               </div>
               <TextAreaInput
                  name="description"
                  labelText="توضیحات (10 تا 1000 کلمه)"
               />
               <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <CategoriesInput />
                  <TransmissionInput />
                  <FuelTypeInput />
                  <CitiesInput />
               </div>
               <h3 className="text-lg mt-10 mb-6 font-medium">ظرفیت</h3>
               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-x-8">
                  <CounterInput detail="سرنشین" name="seats" />
                  <CounterInput detail="در" name="doors" />
               </div>
               <h3 className="text-lg mt-10 mb-6 font-medium">امکانات رفاهی</h3>
               <AmenitiesInput />
               <SubmitButton text="ایجاد اجاره" className="mt-12" />
            </FormContainer>
         </div>
      </section>
   );
}
export default CreateCarRental;
