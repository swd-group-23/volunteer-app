import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { History, Volunteer } from '../../types';


interface volunteerRequest {
    volunteer: Volunteer | null
  }
  
const IndividualVolunteerHistory: React.FC<volunteerRequest> = ({
    volunteer
}) => {
    const env = import.meta.env.VITE_REACT_APP_NODE_ENV;
    const base_url = (env == 'production') 
    ?  import.meta.env.VITE_REACT_APP_SERVER_BASE_URL 
    : (env == 'staging') ? import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_STAGE 
    : import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_DEV;  
    const [history, setHistory] = useState<History[]>([]);

    useEffect(() => {
        console.log("test2")
        if(volunteer){
          axios.get<History[]>(`${base_url}/api/history/mongo/${volunteer._id}`) 
          .then(response => {
            if(response.data){
              setHistory(response.data);
            }
          })
          .catch(error => {
            if(error.response && error.response.status === 404){
              setHistory([]);
          }
          });
        }
    
      }, [volunteer])

  return (
    <div>
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
        <TableColumn width={200}>VOLUNTEER ID</TableColumn>
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
        
      }
      </TableBody>
    </Table>
    </div>
  );
}


export default IndividualVolunteerHistory