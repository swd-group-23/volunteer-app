import axios from 'axios';
import { useEffect, useState } from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, useDisclosure, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import { Event } from '../../types';

const EventHistory = () => {
    const env = import.meta.env.VITE_REACT_APP_NODE_ENV;
    const base_url = (env == 'production') ?  import.meta.env.VITE_REACT_APP_SERVER_BASE_URL : (env == 'staging') ? import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_STAGE : import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_DEV;  
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [event, setEvent] = useState<Event>();
    const [events, setEvents] = useState<Event[]>();
    useEffect(() => {
      axios.get<Event[]>(`${base_url}/api/events`)
      .then(response => {
  
          if (response.data) {
              setEvents(response.data);
          }
  
      })
      .catch(error => {
      console.log(error);
      })
  } , []);
    
    const onDelete = (id: string | undefined) => {
        axios.delete<Event>(`${base_url}/api/events/${id}`)
        .then(response => {
            if (response.data) {
                alert("Deleted Event with ID " + id);
                window.location.href = '/'
            }
        })
        .catch(error => {
          console.log(error);
        })
    }
  return (
    <div>
    {
        (events) ? 
        <div>
        <h2 className='text-xl text-center m-2'>Events</h2>
        <Table aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>DESCRIPTION</TableColumn>
                <TableColumn>LOCATION</TableColumn>
                <TableColumn>EVENT DATE</TableColumn>
                <TableColumn>SKILLS</TableColumn>
                <TableColumn>URGENCY</TableColumn>
                <TableColumn>DELETE EVENT</TableColumn>
            </TableHeader>
            <TableBody>
                {
                 events.map((event) => (
                    <TableRow key={event.id}>
                        <TableCell>{event.name}</TableCell>
                        <TableCell>{event.description}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>{event.dateTime.toString().split('T')[0]}</TableCell>
                        <TableCell>{event.skills.toString()}</TableCell>
                        <TableCell>{event.urgency}</TableCell>
                        <TableCell><Button color="danger" variant='bordered' onClick={() => {setEvent(event)}} onPress={onOpen}>Delete</Button></TableCell>

                    </TableRow>
                 ))
                }
                
            </TableBody>
        </Table>
        </div>
     
      :
        <></>
      }
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete {event?.name}?</ModalHeader>
              <ModalBody>
              <p>This will delete all volunteer history associated with this event aswell.</p>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onClick={() => onDelete(event?.id)} onPress={onClose}
                  >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  </div>
  )
}

export default EventHistory