import { Button, Input, Select, SelectItem, Textarea} from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import { skills,urgencys } from '../../types';
import axios from 'axios';
import { Event } from '../../types';
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
  const env = import.meta.env.VITE_REACT_APP_NODE_ENV;
  const base_url = (env == 'production') ?  import.meta.env.VITE_REACT_APP_SERVER_BASE_URL : (env == 'staging') ? import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_STAGE : import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_DEV;
  
  const onSubmit = (data: Schema) => {
    axios.post<Event> (`${base_url}/api/events`, {
      name: data.eventname,
      description: data.desc,
      location: data.location,
      skills: data.skills,
      urgency: data.urgency,
      dateTime: data.date
    })
    .then(response => {
  
        if (response) {
          alert("Created Event!")
          reset({ eventname: "", desc: "", location: "", skills: "", urgency: "", date: null });
          window.location.href='/';
        }

    })
    .catch(() => {
        alert("error");
    })
    };

  return (
    <div className="flex flex-col gap-2 items-center overflow-auto mt-10">
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
              {...field}
              value={field.value || []}
              errorMessage={errors.skills?.message}
              isInvalid={errors.skills ? true : false}
              label="Required Skills" 
              selectionMode='multiple'
              className="max-w-xs">
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
              {...field}
              value={field.value || []}
              errorMessage={errors.urgency?.message}
              isInvalid={errors.urgency? true : false}
              label="Urgency" 
              className="max-w-xs">
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
                <div className='border-2 w-min mb-2'>  
                  <DatePicker
                  selected={value} 
                  showIcon
                  onChange={onChange} 
                /></div>
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