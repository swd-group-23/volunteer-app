import { Button, Input, Select, SelectItem, Textarea} from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import { states,skills } from '../../../types';
import axios from 'axios';
import { Volunteer } from '../../../types';
import { useEffect, useState } from 'react';
import { useUser } from '../../hooks/useUser';
const schema = z.object({
  name: z.string().min(1, 'Invalid name').max(50, 'Name is too long'),
  address1: z.string().min(1, 'Invalid address').max(100, 'Address is too long'),
  address2: z.string().min(1, 'Invalid address').max(100, 'Address is too long').optional(),
  city: z.string().min(1, 'Invalid city').max(100, 'City is too long'),
  state: z.string().min(1, 'Invalid state'),
  zip: z.string().min(5, 'Invalid zip code').max(8, 'zip is too long'),
  skills: z.string().min(1, 'Invalid skills'),
  preferences: z.string().min(1, 'Invalid preference').optional(),
  availability: z.array(z.date()).nonempty()
});
type Schema = z.infer<typeof schema>;


const ProfileManagementForm = () => {
  const user = useUser();
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const env = import.meta.env.VITE_REACT_APP_NODE_ENV;
  const base_url = (env == 'production') ?  import.meta.env.VITE_REACT_APP_SERVER_BASE_URL : (env == 'staging') ? import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_STAGE : import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_DEV;
  
  const [volunteers, setVolunteers] = useState<Volunteer[]>();
  const [volunteer, setVolunteer] = useState<Volunteer>();
  useEffect(() => {
    if(user.userRole == "admin"){
      axios.get<Volunteer[]>(`${base_url}/api/volunteers`)
          .then(response => {

              if (response.data) {
                  setVolunteers(response.data);
              }

          })
          .catch(error => {
            console.log(error);
          })
}else if(user.userRole=="volunteer"){
  axios.get<Volunteer>(`${base_url}/api/volunteers/${user.userId}`)
          .then(response => {

              if (response.data) {
                  setVolunteer(response.data);
              }

          })
          .catch(error => {
            console.log(error);
          })
  }
} , [volunteers,volunteer]);
  const onSubmit = (data: Schema) => {
    axios.post<Volunteer> (`${base_url}/api/volunteers`, {
      name: data.name,
      address1: data.address1,
      address2: data.address2,
      city: data.city,
      state: data.state,
      zip: data.zip,
      skills: data.skills,
      preferences: data.preferences,
      availability: data.availability,
      email: user.userEmail
    })
    .then(response => {
  
      if (response) {
        alert("Created Volunteer")
      }

  })
  .catch(() => {
      alert("error");
  })
    
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-max mt-4">
      <h2 className='text-xl'>Profile Management Form</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-4 mt-4"
      >
           <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                label="Full Name"
                placeholder="enter name"
                variant="bordered"
                onClear={() => setValue('name', '')}
                errorMessage={errors.name?.message}
                isInvalid={errors.name ? true : false}
                {...field}
              />
            )}
          />
        <div className="grid grid-cols-2 w-96 gap-4">


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
            name="preferences"
            control={control}
            render={({ field }) => (
              <Textarea
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
            render={({ field: {onChange, value} }) => (
              <div className='z-40'>
                  <h3 className='text-sm'>Availability</h3>
                  <DatePicker
                  selectedDates={value} 
                  showIcon
                  onChange={onChange} 
                  selectsMultiple
                  shouldCloseOnSelect={false}
                  disabledKeyboardNavigation
                />

              </div>
           
            )}
          />
        </div>

        <Button type="submit" color="primary">
          Submit
        </Button>
      </form>
      <div>
        {
            (volunteers && user.userRole=="admin") ? 
            <ul className="list-disc">
              {
              volunteers.map((volunteer) => <li key={volunteer.id}>{volunteer.name}:{volunteer.email}</li>)
              }
          
            </ul>
           :
            <></>
          }
      </div>
    </div>
  );
};

export default ProfileManagementForm