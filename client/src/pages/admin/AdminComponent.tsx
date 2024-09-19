import { Button, Textarea, Select, SelectItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '../../../types';
import { volunteers, events } from '../../../data';
import { useState } from 'react';

const schema = z.object({
  volunteers: z.string().min(1, "Must select a volunteer"),
  events: z.string().min(1, "Must select an event"),
  notes: z.string().min(5, 'Please enter a reason for this pairing')
});
type Schema = z.infer<typeof schema>;

const AdminComponent = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset, // Import reset function from useForm
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const [volunteer, setVolunteer] = useState<User>();

  const onSubmit = (data: Schema) => {
    alert(JSON.stringify(data));
    reset(); 
    setVolunteer(undefined);
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 w-[100%]"
      >
        <div className="flex flex-col mt-4 gap-4 w-96">
          <h1 className="text-xl">Volunteer Matching Form</h1>

          <Controller
            name="volunteers"
            control={control}
            render={({ field }) => (
              <Dropdown className="max-w-xl">
                <DropdownTrigger>
                  <Button variant="bordered">
                    Select a Volunteer
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions" items={volunteers} onAction={(key) => field.onChange(key)}>
                  {(volunteer) => (
                    <DropdownItem
                      key={volunteer.id}
                      color="default"
                      className=""
                      onClick={() => setVolunteer(volunteer)}
                    >
                      {volunteer.name}
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            )}
          />
          
          {volunteer ? (
            <div>
              <h1 className="text-3xl font-bold">{volunteer.name}</h1>
              <p className="text-md">Skills: {volunteer.skills.toString()}</p>
              {volunteer.preferences ? <p className="text-md">Preferences: {volunteer.preferences}</p> : <></>}

              <Controller
                name="events"
                control={control}
                render={({ field }) => (
                  <Select
                    errorMessage={errors.events?.message}
                    isInvalid={errors.events ? true : false}
                    label="Events"
                    className="max-w-xl"
                    {...field}
                  >
                    {events
                      .filter(event => volunteer.availability.some(availableDate =>
                        new Date(availableDate).toDateString() === new Date(event.dateTime).toDateString()
                      ))
                      .map((event) => (
                        <SelectItem
                          key={event.id}
                          value={event.id}
                          className="text-black"
                          textValue={event.name}
                        >
                          <div className="flex flex-col">
                            <span className="text-md">{event.name}</span>
                            <span className="text-small text-default-400">{event.description}</span>
                            <span className="text-small text-default-500">Skills: {event.skills.toString()}</span>
                          </div>
                        </SelectItem>
                      ))}
                  </Select>
                )}
              />

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

              <Button type="submit" color="primary">
                Submit
              </Button>
            </div>
          ) : <></>}
        </div>
      </form>
    </div>
  );
};

export default AdminComponent;
