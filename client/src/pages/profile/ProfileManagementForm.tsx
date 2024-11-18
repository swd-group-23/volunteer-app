import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea, useDisclosure} from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import { states,skills, User } from '../../../types';
import axios from 'axios';
import { Volunteer } from '../../../types';
import { useUser } from '../../hooks/useUser';
import { useEffect } from 'react';

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

interface volunteerRequest {
  volunteer: Volunteer | undefined
}

const ProfileManagementForm: React.FC<volunteerRequest> = ({
  volunteer
}) => {
  const user = useUser();
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if(volunteer){
      setValue('name', volunteer.name)
      setValue('address1', volunteer.address1)
      setValue('address2', volunteer.address2)
      setValue('city', volunteer.city)
      setValue('zip', volunteer.zip.toString())
      setValue('preferences', volunteer.preferences)

    }
  }, [volunteer, setValue])

  
  const env = import.meta.env.VITE_REACT_APP_NODE_ENV;
  const base_url = (env == 'production') ?  import.meta.env.VITE_REACT_APP_SERVER_BASE_URL : (env == 'staging') ? import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_STAGE : import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_DEV;
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const onSubmit = (data: Schema) => {
      if(volunteer){
        axios.patch<Volunteer> (`${base_url}/api/volunteers/mongo`, {
          _id: volunteer._id,
          userId: volunteer.userId,
          name: data.name,
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          state: data.state,
          zip: data.zip,
          skills: data.skills.split(","),
          preferences: data.preferences,
          availability: data.availability,
          email: volunteer.email
        })
        .then(response => {
          if (response) {
            alert("Updated Volunteer")
          }
        })
        .catch(error => {
            console.log(error);
        })
      }
      else{
        axios.post<Volunteer> (`${base_url}/api/volunteers/mongo`, {
          userId: user.userId,
          name: data.name,
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          state: data.state,
          zip: data.zip,
          skills: data.skills.split(","),
          preferences: data.preferences,
          availability: data.availability,
          email: user.userEmail
        })
        .then(response => {
          if (response) {
            alert("Created Volunteer!")
          }
        })
        .catch(error => {
            console.log(error);
        })
      }        
  };

  const onDelete = () => {
      axios.delete<User>(`${base_url}/api/users/mongo/${volunteer?.userId}`)
      .then(response => {
          if (response.data) {
              alert("Deleted user " + volunteer?.name);
              window.location.href = "/pages/profile/";
          }
      })
      .catch(error => {
        console.log(error);
      })
  } 

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
                {...field}  // Spread the field object from useController to use value and onChange
                value={field.value}
                variant="bordered"
                onClear={() => setValue('name', '')}  // Clear the field when needed
                errorMessage={errors.name?.message}
                isInvalid={!!errors.name}  // Indicate if there is an error
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
                {...field}  // Spread the field object from useController to use value and onChange
                value={field.value}  // Use field's value or volunteer name
                variant="bordered"
                onClear={() => setValue('address1', '')}  // Clear the field when needed
                errorMessage={errors.address1?.message}
                isInvalid={!!errors.address1}  // Indicate if there is an error
              />


            )}
          />

          <Controller
            name="address2"
            control={control}
            render={({ field }) => (
              <Input
                label="Address 2"
                {...field}  // Spread the field object from useController to use value and onChange
                value={field.value}  // Use field's value or volunteer address2
                variant="bordered"
                onClear={() => setValue('address2', '')}  // Clear the field when needed
                errorMessage={errors.address2?.message}
                isInvalid={!!errors.address2}  // Indicate if there is an error
              />

            )}
          />

          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input
                label="City"
                {...field}  // Spread the field object from useController to use value and onChange
                value={field.value}  // Use field's value or volunteer city
                variant="bordered"
                onClear={() => setValue('city', '')}  // Clear the field when needed
                errorMessage={errors.city?.message}
                isInvalid={!!errors.city}  // Indicate if there is an error
              />

            )}
          />

          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Select 
              {...field}
              errorMessage={errors.state?.message}
              isInvalid={errors.state ? true : false}
              placeholder={
                volunteer
                  ? states.find((state) => state.id == volunteer.state.toString())
                      ?.value || "Select a state"
                  : "Select a state"
              }
              label="Select a state"
              className="max-w-xs" 
              >
              {states.map((state) => (
                <SelectItem
                  key={state.id}
                  value={state.id}
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
                {...field}  // Spread the field object from useController to use value and onChange
                value={String(field.value)}  // Ensure the value is a string
                variant="bordered"
                onClear={() => setValue('zip', '')}  // Clear the field when needed
                errorMessage={errors.zip?.message}
                isInvalid={!!errors.zip}  // Indicate if there is an error
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
              ...field}
              placeholder={volunteer?.skills.toString()}
              >
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
                {...field}  // Spread the field object from useController to use value and onChange
                value={field.value}  
                variant="bordered"
                onClear={() => setValue('preferences', '')}  // Clear the field when needed
                errorMessage={errors.preferences?.message}
                isInvalid={!!errors.preferences}  // Indicate if there is an error
              />

            )}
          />
          <Controller
            name="availability"
            control={control}
            render={({ field: {onChange, value} }) => (
              <div className='z-40'>
                  <h3 className='text-sm'>Availability</h3>
                  <div className='border-2'>
                    <DatePicker
                    selectedDates={value} 
                    placeholderText='Click to select dates'
                    showIcon
                    onChange={onChange} 
                    selectsMultiple
                    shouldCloseOnSelect={false}
                    disabledKeyboardNavigation
                    />
                  </div>
              </div>
           
            )}
          />
        </div>
          <div className='flex flex-row gap-3 '>
            <Button type="submit" color="primary">
              Submit
            </Button>
            {
              (user.userRole == 'admin') ?
              <Button color="danger" variant="bordered" onPress={onOpen}>
                Delete user
              </Button> : <></>
            }
          </div>
     
      </form>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete {volunteer?.name}?</ModalHeader>
              <ModalBody>
              <p>This will delete the volunteer's history aswell</p>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={onDelete}
                  >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfileManagementForm