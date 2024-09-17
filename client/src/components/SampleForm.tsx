import { Button, Input, Textarea, Select, SelectItem} from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email('Invalid email address').min(1),
  message: z.string().min(1, "Message is requried" ),
  animal: z.string().min(1, "Must select an animal")
});
type Schema = z.infer<typeof schema>;
const animals = [
  {
    label: 'Cat',
    value: 'id1',
    description: 'The second most popular pet in the world',
  },
  {
    label: 'Dog',
    value: 'id2',
    description: 'The most popular pet in the world',
  },
  {
    label: 'Elephant',
    value: 'id3',
    description: 'The largest land animal',
  }
];

const SampleForm = () => {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Schema) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen overflow-auto">
      <h2 className='text-xl'>Sample Form</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-4"
      >
        <div className="flex flex-col mt-4 w-full max-w-xs gap-4">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                label="Email"
                placeholder="Enter your email"
                variant="bordered"
                description="We'll never share your email with anyone else."
                onClear={() => setValue('email', '')}
                errorMessage={errors.email?.message}
                isInvalid={errors.email ? true : false}
                {...field}
              />
            )}
          />

          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <Textarea
                label="Message"
                variant="bordered"
                placeholder="Enter your message"
                description="Write your message here, we will reply as soon as possible."
                errorMessage={errors.message?.message}
                isInvalid={errors.message ? true : false}
                {...field}
              />
            )}
          />

          <Controller
            name="animal"
            control={control}
            render={({ field }) => (
              <Select 
              errorMessage={errors.animal?.message}
              isInvalid={errors.animal ? true : false}
              label="Select an animal" 
              className="max-w-xs" {
              ...field}>
              {animals.map((animal) => (
                <SelectItem
                  key={animal.value}
                  value={animal.value}
                  className='text-black'
                >
                  {animal.label}
                </SelectItem>
              ))}
        
            </Select>
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

export default SampleForm;