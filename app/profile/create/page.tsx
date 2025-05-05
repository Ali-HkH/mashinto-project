import FormInput from '@/components/form/FormInput';
import { SubmitButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import { createProfileAction } from '@/utils/actions';

function CreateProfile() {
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>کاربر جدید</h1>
      <div className='border p-8 rounded-md max-w-lg'>
        <FormContainer action={createProfileAction}>
          <div className='grid gap-4 mt-4 '>
            <FormInput type='text' name='firstName' label='نام' />
            <FormInput type='text' name='lastName' label='نام خانوادگی' />
            <FormInput type='text' name='username' label='نام کاربری' />
          </div>
          <SubmitButton text='ایجاد نمایه' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateProfile;