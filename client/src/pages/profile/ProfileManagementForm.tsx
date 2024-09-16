import { Button, Input, Select, SelectItem} from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  fullname: z.string().min(1, 'Invalid name').max(50, 'Name is too long'),
  address1: z.string().min(1, 'Invalid address').max(100, 'Address is too long'),
  address2: z.string().min(1, 'Invalid address').max(100, 'Address is too long').optional(),
  city: z.string().min(1, 'Invalid city').max(100, 'City is too long'),
  state: z.string().min(1, 'Invalid state'),
  zip: z.string().min(5, 'Invalid zip code').max(8, 'zip is too long'),
  skills: z.string().min(1, 'Invalid skills'),
  preferences: z.string().min(1, 'Invalid preference').optional(),
  availability: z.string().min(1, 'Invalid name'),
});
type Schema = z.infer<typeof schema>;


const states = [
    { value: 'TX'},
    { value: 'CA'},
    { value: 'NY'},
    // Add more states as needed
];

// Skills options for multi-select dropdown
const skills = [
    { value: 'idk'},
    { value: 'idk2'}
    // Add more skills as needed
];

const ProfileManagementForm = () => {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Schema) => {
    console.log("Form Data:", data);
  console.log("Form Errors:", errors);
    alert(JSON.stringify(data));
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen overflow-auto">
      <h2 className='text-xl'>Profile Management Form</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-4"
      >
        <div className="flex flex-col mt-4 w-full max-w-xs gap-4">
          <Controller
            name="fullname"
            control={control}
            render={({ field }) => (
              <Input
                label="Full Name"
                placeholder="enter name"
                variant="bordered"
                description="We'll never share your information with anyone else."
                onClear={() => setValue('fullname', '')}
                errorMessage={errors.fullname?.message}
                isInvalid={errors.fullname ? true : false}
                {...field}
              />
            )}
          />


          <Controller
            name="address1"
            control={control}
            render={({ field }) => (
              <Input
                label="Address 1"
                placeholder="enter address"
                variant="bordered"
                onClear={() => setValue('address1', '')}
                errorMessage={errors.address1?.message}
                isInvalid={errors.address1? true : false}
                {...field}
              />
            )}
          />

          <Controller
            name="address2"
            control={control}
            render={({ field }) => (
              <Input
                label="Address 2"
                placeholder="enter address"
                variant="bordered"
                onClear={() => setValue('address2', '')}
                errorMessage={errors.address2?.message}
                isInvalid={errors.address2 ? true : false}
                {...field}
              />
            )}
          />

          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input
                label="City"
                placeholder="enter city"
                variant="bordered"
                onClear={() => setValue('city', '')}
                errorMessage={errors.city?.message}
                isInvalid={errors.city ? true : false}
                {...field}
              />
            )}
          />

          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Select 
              errorMessage={errors.state?.message}
              isInvalid={errors.state ? true : false}
              label="Select a state" 
              className="max-w-xs" {
              ...field}>
              {states.map((state) => (
                <SelectItem
                  key={state.value}
                  value={state.value}
                  className='text-black'
                >
                  {state.value}
                </SelectItem>
              ))}
        
            </Select>
            )}
          />

          <Controller
            name="zip"
            control={control}
            render={({ field }) => (
              <Input
                label="Zip-Code"
                placeholder="enter zip code"
                variant="bordered"
                onClear={() => setValue('zip', '')}
                errorMessage={errors.zip?.message}
                isInvalid={errors.zip ? true : false}
                {...field}
              />
            )}
          />

      

          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <Select 
              errorMessage={errors.skills?.message}
              isInvalid={errors.skills ? true : false}
              label="Select skills" 
              className="max-w-xs" {
              ...field}>
              {skills.map((skill) => (
                <SelectItem
                  key={skill.value}
                  value={skill.value}
                  className='text-black'
                >
                  {skill.value}
                </SelectItem>
              ))}
        
            </Select>
            )}
          /> 

          <Controller
            name="preferences"
            control={control}
            render={({ field }) => (
              <Input
                label="Preferences"
                placeholder="enter preferance"
                variant="bordered"
                onClear={() => setValue('preferences', '')}
                errorMessage={errors.preferences?.message}
                isInvalid={errors.preferences ? true : false}
                {...field}
              />
            )}
          />

          <Controller
            name="availability"
            control={control}
            render={({ field }) => (
              <Input
                label="Availability"
                placeholder="enter availability"
                variant="bordered"
                onClear={() => setValue('availability', '')}
                errorMessage={errors.availability?.message}
                isInvalid={errors.availability? true : false}
                {...field}
              />
            )}
          />
        </div>

        <Button type="submit" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ProfileManagementForm