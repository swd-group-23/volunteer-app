import { Button, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {EyeFilledIcon} from "../../assets/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../../assets/EyeSlashFilledIcon";
import { useUser } from '../../hooks/useUser';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { User } from '../../../types';

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
  const [users, setUsers] = useState<User[]>();


    useEffect(() => {
    axios.get<User[]>(`${base_url}/api/users/mongo`)
        .then(response => {

            if (response.data) {
                setUsers(response.data);
            }

        })
        .catch(error => {
          console.log(error);
        })
}
    , []);

  const onSubmit = (data: Schema) => {
      axios.post<LoginUserResponse> (`${base_url}/api/users/login/mongo`, {
        email: data.email,
        password: data.password
      })
          .then(response => {
  
              if (response) {
                user.setUserId(response.data.id);
                user.setUserRole(response.data.role);
                user.setUserEmail(data.email)
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
    <div className="flex flex-col gap-2 items-center justify-center">
      <h2 className='text-xl'>Login</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-4 mb-4"
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
        {
          (users) ? 
          <Table aria-label="Example static collection table" className='w-50'>
          <TableHeader>
            <TableColumn>EMAIL</TableColumn>
            <TableColumn>PASSWORD</TableColumn>
            <TableColumn>ROLE</TableColumn>
          </TableHeader>
          <TableBody>
            {
              users.map((user) => (
                <TableRow key={user._id}>
                <TableCell>{user.email}</TableCell>
              <TableCell>{user.password}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
              ))
            }
         
          </TableBody>
        </Table>
          :
          <></>

        }
     
    </div>
  );
};

export default LoginComponent;
