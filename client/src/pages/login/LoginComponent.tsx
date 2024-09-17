import { Button, Input} from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {EyeFilledIcon} from "../../assets/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../../assets/EyeSlashFilledIcon";
import React from "react";





const schema = z.object({
  email: z.string().email('Invalid email address').min(1),
  password: z.string().min(8, "Must have a valid password")
});

type Schema = z.infer<typeof schema>;


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


    
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
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
            name="password"
            control={control}
            render={({ field }) => (
                <Input
                label="Password"
                variant="bordered"
                placeholder="Enter your password"
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="max-w-xs"

                onClear={() => setValue('password', '')}
                errorMessage={errors.password?.message}
                isInvalid={errors.password? true : false}
                {...field}

              />
            )}
          />

        </div>

        

        <Button type="submit" color="primary">
          Login
        </Button>
      </form>
    </div>
  );
};

export default SampleForm;
