//Add table here
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
//import { history } from "../../data";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { History } from '../../types';
import { useUser } from "../hooks/useUser";


const VolunteerHistory = () => {
  const user = useUser();
  const [history, setHistory] = useState<History[]>([]);
  const [allhistory, setallHistory] = useState<History[]>([]);

  const env = import.meta.env.VITE_REACT_APP_NODE_ENV;
  const base_url = (env == 'production') 
  ?  import.meta.env.VITE_REACT_APP_SERVER_BASE_URL 
  : (env == 'staging') ? import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_STAGE 
  : import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_DEV;

  useEffect(() => {
    if(user.userRole == 'volunteer'){
      axios.get<History[]>(`${base_url}/api/history/${user.userId}`) 
      .then(response => {
        if(response.data){
          setHistory(response.data);
        }
      })
      .catch(error => {
        console.log(base_url);
        alert(error);
      });
    }
    else if(user.userRole == 'admin'){
      axios.get<History[]>(`${base_url}/api/history`) 
      .then(response => {
        if(response.data){
          setallHistory(response.data);
        }
      })
      .catch(error => {
        console.log(base_url);
        alert(error);
      });
    }
      
  }, [base_url]);

  return (
    <>
      <h2 className='text-xl text-center m-2'>Volunteer History</h2>

    <Table aria-label="Example static collection table"
             style={{ 
              width: '30%',            // Set the width to 60% of the parent container
              height: '300px',         // Set the height to 300px
              margin: '0 auto',        // Center the table horizontally
              tableLayout: 'fixed',    // Force table layout to respect width and column sizes
              overflow: 'hidden',      // Hide any overflow content
              border: '1px solid #ddd', // Optional: Add a border for clarity
            }}
    >
      <TableHeader>
        <TableColumn>VOLUNTEER ID</TableColumn>
        <TableColumn>VOLUNTEER NAME</TableColumn>
        <TableColumn>EVENT NAME</TableColumn>
        <TableColumn>EVENT DESCRIPTION</TableColumn>
        <TableColumn>LOCATION</TableColumn>
        <TableColumn width={250}>REQUIRED SKILLS</TableColumn>
        <TableColumn>URGENCY</TableColumn>
        <TableColumn>EVENT DATE</TableColumn>
        <TableColumn>STATUS</TableColumn>
      </TableHeader>
      <TableBody>

      {
        (user.userRole == 'volunteer')? 
        history.map((event) => (
          <TableRow key={event.id}>
            <TableCell>{event.volunteerId}</TableCell>
            <TableCell>{event.volunteerName}</TableCell>
            <TableCell>{event.eventName}</TableCell>
            <TableCell>{event.eventDescription}</TableCell>
            <TableCell>{event.location}</TableCell>
            <TableCell>{event.skills.toString()}</TableCell>
            <TableCell>{event.urgency}</TableCell>
            <TableCell>{event.eventDate.toString()}</TableCell>
            <TableCell>{event.status}</TableCell>
        </TableRow>
        ))
        : 
        allhistory.map((event) => (
          <TableRow key={event.id}>
            <TableCell>{event.volunteerId}</TableCell>
            <TableCell>{event.volunteerName}</TableCell>
            <TableCell>{event.eventName}</TableCell>
            <TableCell>{event.eventDescription}</TableCell>
            <TableCell>{event.location}</TableCell>
            <TableCell>{event.skills.toString()}</TableCell>
            <TableCell>{event.urgency}</TableCell>
            <TableCell>{event.eventDate.toString()}</TableCell>
            <TableCell>{event.status}</TableCell>
        </TableRow>
        ))

      }
      </TableBody>
    </Table>
    </>
  );
}


export default VolunteerHistory