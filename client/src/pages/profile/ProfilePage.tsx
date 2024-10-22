import axios from 'axios';
import { useEffect, useState } from 'react';
import { Volunteer } from '../../../types';
import { useUser } from '../../hooks/useUser';
import AdminManagementForm from './AdminManagementForm';
import ProfileManagementForm from './ProfileManagementForm';

const ProfilePage = () => {
    const user = useUser();
    const env = import.meta.env.VITE_REACT_APP_NODE_ENV;
    const base_url = (env == 'production') ?  import.meta.env.VITE_REACT_APP_SERVER_BASE_URL : (env == 'staging') ? import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_STAGE : import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_DEV;
    const [volunteer, setVolunteer] = useState<Volunteer>();
    useEffect(() => {
        if(user.userRole == 'volunteer'){
            axios.get<Volunteer>(`${base_url}/api/volunteers/${user.userId}`)
            .then(response => {
  
                if (response.data) {
                    setVolunteer(response.data);
                }
  
            })
            .catch(() => {
              setVolunteer(undefined)
            })
        }
        } , []);
  return (
    <div>
    {
        (user.userRole == 'admin') ?
        <AdminManagementForm/> :
        <ProfileManagementForm volunteer={volunteer}/>
    }

</div>
  )
}

export default ProfilePage