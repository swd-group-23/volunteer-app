import NavBar from './components/NavBar';
import './App.css'
import { useUser } from './hooks/useUser';
import {Modal, ModalContent, ModalHeader, ModalBody, Link, Button, useDisclosure} from "@nextui-org/react";
import 'react-datepicker/dist/react-datepicker.css';
import VolunteerMatchingForm from './components/VolunteerMatchingForm';
import VolunteerHistory from './components/VolunteerHistory';
import EventManagementForm from './components/EventManagementForm';
import EventHistory from './components/EventHistory';
import { PDFDownloadLink } from '@react-pdf/renderer';
import VolunteerHistoryDocument from './components/VolunteerHistoryDocument';

function App() {
  const user = useUser();
  const {onClose} = useDisclosure();

  return (
        <>
          <NavBar/>
          <h1 className='text-3xl text-center font-bold mt-2'>Volunteer App</h1>  
          {
            (user.userId)? 

            <div className='m-4'>
               <h1 className='text-xl font-bold mt-2'>Welcome, {user.userRole}</h1>

               {
                (user.userRole === 'admin') ?
                  <>
                    <div className='flex flex-row justify-around gap-3 mb-6'>
                      <EventManagementForm/>
                      <VolunteerMatchingForm/>
                    </div>
                    <EventHistory/>
                    <div className="mt-5 mr-5 flex flex-row-reverse">
                      <PDFDownloadLink document={<VolunteerHistoryDocument />} fileName="Volunteer_History_Report">
                          <Button color="default">
                            Download Volunteer History Report
                          </Button>
                        </PDFDownloadLink>
                    </div>
                    <VolunteerHistory/>
                  </> :
                  <>
                  <VolunteerHistory/>
                  </>
               }
               

            </div>
            
            : 
            <Modal backdrop={'blur'} isOpen={true} onClose={onClose}>
            <ModalContent>
                <>
                  <ModalHeader className="flex flex-col gap-1">Login or Create Account to Proceed</ModalHeader>
                  <ModalBody>
                    <div className='flex flex-col gap-3 p-6'>
                      <Button as={Link} href="/pages/login/" variant="flat" className='bg-[#21ec8a] text-foreground'>
                          Login
                      </Button>
                      <Button as={Link} href="/pages/signup/" variant="flat" className='bg-[#10A97E] text-foreground'>
                          Sign Up
                      </Button>
                    </div>
                  </ModalBody>
                </>
            </ModalContent>
          </Modal>
          }
        </>
  )
}

export default App