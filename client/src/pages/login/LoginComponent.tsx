import { Button, Input} from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {EyeFilledIcon} from "../../assets/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../../assets/EyeSlashFilledIcon";
import { useUser } from '../../hooks/useUser';
import React from "react";





const schema = z.object({
  email: z.string().email('Invalid email address').min(1),
  password: z.string().min(8, "Password must be at least 8 characters long")
});

type Schema = z.infer<typeof schema>;


const LoginComponent = () => {
  const user = useUser();
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Schema) => {
    if(data.email.includes("admin")){
      user.setUserId('1234');
      user.setUserRole('admin');
      window.location.href = "/"
    }
    else if (data.email.includes("volunteer")){
      user.setUserId('1234');
      user.setUserRole('volunteer');
      window.location.href = "/"
    }
    else{
      alert("Invalid login!")
    }
  };


    
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-96">
      <h2 className='text-xl'>Login</h2>
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
                description="admin@gmail.com or volunteer@gmail.com"
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

export default LoginComponent;
