import { useEffect, useState } from 'react';
import { Volunteer } from '../../../types';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import axios from 'axios';
import ProfileManagementForm from './ProfileManagementForm';

const AdminManagementForm = () => {
    const env = import.meta.env.VITE_REACT_APP_NODE_ENV;
    const base_url = (env == 'production') ?  import.meta.env.VITE_REACT_APP_SERVER_BASE_URL : (env == 'staging') ? import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_STAGE : import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_DEV;  
    const [volunteers, setVolunteers] = useState<Volunteer[]>();
    const [volunteer, setVolunteer] = useState<Volunteer>();
    useEffect(() => {
        axios.get<Volunteer[]>(`${base_url}/api/volunteers/mongo`)
            .then(response => {
  
                if (response.data) {
                    setVolunteers(response.data);
                }
  
            })
            .catch(error => {
              console.log(error);
            })
    } , [volunteer]);
    return (
        <div className="flex flex-col gap-2 items-center justify-center h-max mt-4 mb-8">
            <h2 className='text-3xl'>Volunteer Profiles</h2>
            <Dropdown className="max-w-xl">
                <DropdownTrigger>
                  <Button variant="bordered">
                    Select a Volunteer
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions" items={volunteers}>
                  {(volunteer) => (
                    <DropdownItem
                      key={volunteer._id}
                      color="default"
                      className=""
                      description={`User ID: ${volunteer.userId}`}
                      onClick={() => {setVolunteer(volunteer)}}
                    >
                      {volunteer.name}
                    </DropdownItem>
                  )}
                </DropdownMenu>
            </Dropdown>
            {volunteer ? <ProfileManagementForm volunteer={volunteer}/> : <></>}
    </div>
  )
}

export default AdminManagementForm