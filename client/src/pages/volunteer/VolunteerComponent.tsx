//Add table here
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import { history } from "../../../data";


const VolunteerComponent = () => {
  return (
    <>
    <div style = {{textAlign: 'center', marginBottom: '20px'}}>Volunteer History</div>

    <Table aria-label="Example static collection table"
             style={{ 
              width: '30%',            // Set the width to 60% of the parent container
              height: '300px',         // Set the height to 300px
              margin: '0 auto',        // Center the table horizontally
              tableLayout: 'fixed',    // Force table layout to respect width and column sizes
              overflow: 'hidden',      // Hide any overflow content
              border: '1px solid #ddd' // Optional: Add a border for clarity
            }}
    >
      <TableHeader>
        <TableColumn>EVENT NAME</TableColumn>
        <TableColumn>EVENT DESCRIPTION</TableColumn>
        <TableColumn>LOCATION</TableColumn>
        <TableColumn>REQUIRED SKILLS</TableColumn>
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
            <TableCell>{event.skills}</TableCell>
            <TableCell>{event.urgency}</TableCell>
            <TableCell>{event.eventDate.toLocaleDateString()}</TableCell>
            <TableCell>{event.status}</TableCell>
        </TableRow>
        ))

      }






        
       {/*<TableRow key="1">
          <TableCell>Houston Food Bank</TableCell>
          <TableCell>To provide food assistance to those in need and alleviate hunger in the community.</TableCell>
          <TableCell>535 Portwall St, Houston, TX 77029</TableCell>
          <TableCell>Capability to stand, lift, and move boxes</TableCell>
          <TableCell>Medium</TableCell>
          <TableCell>March 12, 2024</TableCell>
          <TableCell>Participated</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Homeless Shelter</TableCell>
          <TableCell>Providing meals, shelter, and support services for individuals experiencing homelessness.</TableCell>
          <TableCell>101 Homeless Way, Houston, TX 77001</TableCell>
          <TableCell>Empathy, teamwork, basic problem-solving</TableCell>
          <TableCell>High</TableCell>
          <TableCell>April 5, 2024</TableCell>
          <TableCell>Participated</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>Public Library</TableCell>
          <TableCell>Hosting a reading event for children in the community to promote literacy and education.</TableCell>
          <TableCell>4500 Library Ln, Houston, TX 77002</TableCell>
          <TableCell>Communication, patience, working with children</TableCell>
          <TableCell>Low</TableCell>
          <TableCell>April 20, 2024</TableCell>
          <TableCell>Canceled</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>Blood Drive</TableCell>
          <TableCell>Organizing a blood donation drive to support local hospitals and medical facilities.</TableCell>
          <TableCell>500 Donation Dr, Houston, TX 77003</TableCell>
          <TableCell>Organizational skills, attention to detail</TableCell>
          <TableCell>High</TableCell>
          <TableCell>May 1, 2024</TableCell>
          <TableCell>No show</TableCell>
          </TableRow>*/}
      </TableBody>
    </Table>
    </>
  );
}


export default VolunteerComponent