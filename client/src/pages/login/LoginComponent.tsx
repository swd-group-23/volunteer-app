import { Button, Input} from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {EyeFilledIcon} from "../../assets/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../../assets/EyeSlashFilledIcon";
import { useUser } from '../../hooks/useUser';
import React from "react";
import axios from 'axios';

interface LoginUserResponse {
  id: string;
  role: 'volunteer' | 'admin';
}


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
  const env = import.meta.env.VITE_REACT_APP_NODE_ENV;
  const base_url = (env == 'production') ?  import.meta.env.VITE_REACT_APP_SERVER_BASE_URL : (env == 'staging') ? import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_STAGE : import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_DEV;

  const onSubmit = (data: Schema) => {
      axios.post<LoginUserResponse> (`${base_url}/api/users/login`, {
        email: data.email,
        password: data.password
      })
          .then(response => {
  
              if (response) {
                console.log(response.data);
                user.setUserId(response.data.id);
                user.setUserRole(response.data.role);
                window.location.href = "/";

              }
  
          })
          .catch(() => {
              alert("User not found!");
          })
  
  
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
                description="Enter: 12345678"
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
