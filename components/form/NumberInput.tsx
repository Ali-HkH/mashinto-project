import { Label } from '../ui/label';
import { Input } from '../ui/input';

type FormInputNumberProps = {
  defaultValue?: number;
  name: string
  label?: string
};

function NumberInput({ defaultValue, name, label }: FormInputNumberProps) {
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='mb-1'>
        {label}
      </Label>
      <Input
        id={name}
        type='number'
        name={name}
        min={0}
        defaultValue={defaultValue}
        required
      />
    </div>
  );
}
export default NumberInput;