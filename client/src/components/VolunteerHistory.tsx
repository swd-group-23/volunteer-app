//Add table here
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import { history } from "../../data";


const VolunteerHistory = () => {
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
            <TableCell>{event.eventName}</TableCell>
            <TableCell>{event.eventDescription}</TableCell>
            <TableCell>{event.location}</TableCell>
            <TableCell>{event.skills.toString()}</TableCell>
            <TableCell>{event.urgency}</TableCell>
            <TableCell>{event.eventDate.toLocaleDateString()}</TableCell>
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