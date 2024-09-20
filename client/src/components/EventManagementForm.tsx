import { Button, Input, Select, SelectItem, Textarea} from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import { skills,urgencys } from '../../types';
const schema = z.object({
  eventname: z.string().min(1, 'Invalid name').max(100, 'Event Name is too long'),
  desc: z.string().min(1, 'Invalid address'),
  location: z.string().min(1, 'Invalid address'),
  skills: z.string().min(1, 'Invalid skills'),
  urgency: z.string().min(1, 'Invalid preference').optional(),
  date: z.date().nullable()
});
type Schema = z.infer<typeof schema>;


const EventManagementForm = () => {
  const {
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Schema) => {
    console.log("Form Data:", data);
    console.log("Form Errors:", errors);
    alert(JSON.stringify(data));
    reset({
      eventname: '',
      desc: '',
      location: '',
      skills: '',
      urgency: '',
      date: null
    });
  };

  return (
    <div className="flex flex-col gap-2 items-center h-screen overflow-auto mt-10">
      <h2 className='text-xl'>Event Management Form</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start"
      >
        <div className="grid grid-cols-1 mt-4 w-96 gap-2">
          <Controller
            name="eventname"
            control={control}
            render={({ field }) => (
              <Input
                label="Event Name"
                placeholder="enter event name"
                variant="bordered"
                onClear={() => setValue('eventname', '')}
                errorMessage={errors.eventname?.message}
                isInvalid={errors.eventname ? true : false}
                {...field}
              />
            )}
          />


          <Controller
            name="desc"
            control={control}
            render={({ field }) => (
              <Textarea
                label="Event Description"
                placeholder="enter description"
                variant="bordered"
                onClear={() => setValue('desc', '')}
                errorMessage={errors.desc?.message}
                isInvalid={errors.desc? true : false}
                {...field}
              />
            )}
          />

          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Textarea
                label="Location"
                placeholder="enter location"
                variant="bordered"
                onClear={() => setValue('location', '')}
                errorMessage={errors.location?.message}
                isInvalid={errors.location ? true : false}
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
              label="Required Skills" 
              selectionMode='multiple'
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
            name="urgency"
            control={control}
            render={({ field }) => (
              <Select 
              errorMessage={errors.urgency?.message}
              isInvalid={errors.urgency? true : false}
              label="Urgency" 
              className="max-w-xs" {
              ...field}>
              {urgencys.map((urgency) => (
                <SelectItem
                  key={urgency.value}
                  value={urgency.value}
                  className='text-black'
                >
                  {urgency.value}
                </SelectItem>
              ))}
        
            </Select>
            )}
          /> 

          <Controller
            name="date"
            control={control}
            render={({ field: {onChange, value} }) => (
              <div className='z-40'>
                <h3 className='text-sm'>Date</h3>
                <DatePicker
                  selected={value} 
                  showIcon
                  onChange={onChange} 
                />
              </div>
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

export default EventManagementForm