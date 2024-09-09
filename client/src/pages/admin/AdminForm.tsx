import { Button, Textarea, Select, SelectItem} from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  volunteers: z.string().min(1, "Must select a volunteer"),
  events: z.string().min(1, "Must select an event"),
  notes: z.string().min(5, 'Please enter a reason for this pairing')

});
type Schema = z.infer<typeof schema>;
const volunteers = [
  {
    label: 'Alan',
    value: 'id1'
    },
  {
    label: 'Alina',
    value: 'id2'
    },
  {
    label: 'Josh',
    value: 'id3'
    },
  {
    label: 'Jusvin',
    value: 'id4'
    }
];

const events = [
  {
    label: 'Houston Food Bank',
    value: 'id1'
    },
  {
    label: 'Homeless Shelter',
    value: 'id2'
    },
  {
    label: 'Public Library',
    value: 'id3'
    },
  {
    label: 'Blood Drive',
    value: 'id4'
    }
];

const AdminForm = () => {
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
    <div className="flex flex-col gap-2 items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 w-[100%]"
      >
        <div className="flex flex-col mt-4 gap-4 w-96">
        
          <div className='flex flex-row gap-5'>
              <Controller
                name="volunteers"
                control={control}
                render={({ field }) => (
                  <Select 
                  errorMessage={errors.volunteers?.message}
                  isInvalid={errors.volunteers ? true : false}
                  label="Volunteer" 
                  className="max-w-xl" {
                  ...field}>
                  {volunteers.map((volunteer) => (
                    <SelectItem
                      key={volunteer.value}
                      value={volunteer.value}
                      className='text-black'
                    >
                      {volunteer.label}
                    </SelectItem>
                  ))}
            
                </Select>
                )}
              />

              <Controller
                name="events"
                control={control}
                render={({ field }) => (
                  <Select 
                  errorMessage={errors.events?.message}
                  isInvalid={errors.events ? true : false}
                  label="Events" 
                  className="max-w-xl" {
                  ...field}>
                  {events.map((event) => (
                    <SelectItem
                      key={event.value}
                      value={event.value}
                      className='text-black'
                    >
                      {event.label}
                    </SelectItem>
                  ))}
            
                </Select>
                )}
              />

          </div>
       
          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <Textarea
                label="Notes"
                variant="bordered"
                placeholder="Enter your message"
                description="Please enter a reason for this pairing"
                errorMessage={errors.notes?.message}
                isInvalid={errors.notes ? true : false}
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

export default AdminForm;
