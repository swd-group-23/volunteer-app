import { Button, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {EyeFilledIcon} from "../../assets/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../../assets/EyeSlashFilledIcon";
import React, { useEffect, useState } from "react";
import { useUser } from '../../hooks/useUser';
import axios from 'axios';
import { User } from '../../../types';





const schema = z.object({
  email: z.string().email('Invalid email address').min(1),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword:  z.string().min(8, "Passwords do not match")
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Schema = z.infer<typeof schema>;


const SignUpComponent = () => {
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
    axios.post<string> (`${base_url}/api/users/mongo`, {
      email: data.email,
      password: data.password,
      role: 'volunteer'
    })
        .then(response => {

            if (response) {
              console.log(response.data);
              user.setUserId(response.data);
              user.setUserRole("volunteer");
              user.setUserEmail(data.email)
              window.location.href = "/";

            }

        })
        .catch(() => {
            alert("Email already exists!");
        })
  };


    
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div>
        <h2 className='text-xl'>Sign Up</h2>
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

              <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                  <Input
                  label="Confirm Password"
                  variant="bordered"
                  placeholder="Re-enter your password"
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
                  errorMessage={errors.confirmPassword?.message}
                  isInvalid={errors.confirmPassword? true : false}
                  {...field}

                />
              )}
            />

          </div>

          

          <Button type="submit" color="primary">
            Sign Up
          </Button>
        </form>
      </div>
      <div>
        <div>
        {
          (users) ? 
          <Table aria-label="Example static collection table" className='w-50'>
          <TableHeader>
            <TableColumn>EMAIL</TableColumn>
            <TableColumn>ENCRYPTED PASSWORD</TableColumn>
            <TableColumn>PASSWORD</TableColumn>
            <TableColumn>ROLE</TableColumn>
          </TableHeader>
          <TableBody>
            {
              users.map((user) => (
                <TableRow key={user._id}>
                <TableCell>{user.email}</TableCell>
              <TableCell>{user.password}</TableCell>
              {
                (user.email == 'admin@gmail.com' || user.email == 'volunteer@gmail.com') ?  <TableCell>12345678</TableCell> : 
                (user.email == 'alan@gmail.com') ? <TableCell>87654321</TableCell> :
                (user.email == 'josh@gmail.com') ? <TableCell>98765432</TableCell> :
                (user.email == 'alina@gmail.com') ? <TableCell>23456789</TableCell> :
                (user.email == 'jusvin@gmail.com') ? <TableCell>34567891</TableCell> : 
                <TableCell>Encrypted</TableCell>
              }
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
      </div>
    
    </div>
  );
};

export default SignUpComponent;